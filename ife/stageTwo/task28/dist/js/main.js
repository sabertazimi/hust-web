/*
    logger - 向右侧信息台输出信息
    pattern - singleton
 */
var logger = (function(global, doc, undef) {
    function _log(msg) {
        if (msg) {
            setTimeout(function(){
                $('.logger-list').last().append('<li "class="logger-list-item"> - ' + new Date() + ': ' + msg + ' - </li>');
            }, 500);
        }
    }
    return {
        log: _log
    };
}(window, document));

/**
 * mediator - 中介者，负责传送指令
 */
var mediator = (function ( global, doc, undef ) {
    var orbits = {},
        subUid = -1,

        subscribe = function (orbit, obj ) {
            var token;

            if (!orbits[orbit]) {
                orbits[orbit] = [];
            }

    		// add observer to observerlist(orbits)
            token = (++subUid).toString();
            orbits[orbit].push({
                context: obj,
                orbit: orbit,
                token: token,
                callback: obj.transferSys.messageReceiver
            });

            return token;
        },
        publish = function (orbit) {
            var args,
                len;

            // undefined check
            if (!orbits[orbit]) {
                return false;
            }

            args = Array.prototype.slice.call(arguments);
            len = orbits[orbit].length;

            for (var i = 0;i < len;i++) {
                var subscription = orbits[orbit][i];
                subscription.callback.apply(subscription.context, args);
            }

            // chain pattern
            return this;
        },
        unsubscribe = function (token) {
            for (var m in orbits) {
                if (orbits[m]) {
                    for (var i = 0, j = orbits[m].length; i < j; i++) {
                        if (orbits[m][i].token === token) {
                            orbits[m].splice(i, 1);
                            return token;
                        }
                    }
                }
            }
            return false;
        };

        return {
            subscribe: subscribe,
            publish: publish,
            unsubscribe: unsubscribe,
        };
}(window, document));

/**
 *  spaceship  factory
 */
var shipFactory = (function (global, doc, undef) {

    // spaceship prototype
    function spaceship(options) {
        var obj = {
            orbit: options.orbit || 0,
            isFly: false,
            isGone: false,
            leftEnergy: 100,
            flySpeed: options.flySpeed || 1,
            restoreSpeed: options.restoreSpeed || 5,
            consumeSpeed: options.consumeSpeed || 3,
            angle: 0,
            // interval animation id
            launchId: 0,
            stopId: 0,

            driveSys: {
                launch: function () {
                    if (obj.leftEnergy > 0) {
                        obj.isFly = true;
                        clearInterval(obj.launchId);
                        clearInterval(obj.stopId);
                        obj.launchId = setInterval(function(){
                            obj.driveSys.fly();
                            obj.energySys.consume();
                        }, 200);
                    }
                },
                stop: function () {
                    obj.isFly = false;
                    clearInterval(obj.launchId);
                    clearInterval(obj.stopId);
                    obj.stopId = setInterval(function(){
                        obj.energySys.restore();
                    }, 200);
                },
                fly: function () {
                    if (obj.isFly) {
                        obj.angle += obj.flySpeed;
                    }
                    obj.angle %= 360;
                    $('#ship' + obj.orbit).css('transform', 'rotate(' + obj.angle + 'deg)');
                }
            },

            energySys: {
                restore: function () {
                    if (!obj.isFly) {
                        obj.leftEnergy += obj.restoreSpeed;
                    }
                    if (obj.leftEnergy > 100) {
                        obj.leftEnergy = 100;
                    }
                    $('#ship' + obj.orbit).text(obj.leftEnergy + '%');
                },
                consume: function () {
                    if (obj.isFly) {
                        obj.leftEnergy -= obj.consumeSpeed;
                    }
                    if (obj.leftEnergy <= 0) {
                        obj.isFly = false;
                        obj.leftEnergy = 0;
                        clearInterval(obj.launchId);
                        clearInterval(obj.stopId);
                        obj.stopId = setInterval(function(){
                            obj.energySys.restore();
                        }, 200);
                    }
                    $('#ship' + obj.orbit).text(obj.leftEnergy + '%');
                }
            },

            destroySys: {
                destroy: function () {
                    obj.isGone = true;
                    setTimeout(function () {
                        $('#ship' + obj.orbit).remove();
                    }, 200);
                }
            },

            transferSys: {
                messageReceiver: function (orbit, msg) {
                    switch (msg.command) {
                        case 'launch':
                            obj.driveSys.launch();
                            break;
                        case 'stop':
                            obj.driveSys.stop();
                            break;
                        case 'rate':
                            obj.flySpeed = msg.flySpeed;
                            break;
                        case 'destroy':
                            obj.destroySys.destroy();
                            break;
                    }
                }
            }
        };

        return obj;
    }

    function _create(options) {
        if (typeof options === 'object') {
            var obj = new spaceship(options);
            //  开始监测指挥官发来的信号
            mediator.subscribe(obj.orbit, obj);
            setTimeout(function () {
                $('.space').append('<button class="spaceship" type="button" id="ship' + obj.orbit + '">100%</button>');
            }, 200);
            return obj;
        }
    }

    return {
        create: _create
    };

}(window, document));

/**
 * commander - 指挥官
 */
var commander =  (function (global, doc, undef) {
    var commandList = {
        launch: {
            id: 1,
            command: 'launch'
        },
        stop: {
            id: 2,
            command: 'stop'
        },
        rate: {
            id: 3,
            command: 'rate',
            flySpeed: 1,
        },
        destroy: {
            id: 4,
            command: 'destroy'
        }
    },
    existShip = [false, false, false ,false];

    function _getList() {
        return commandList;
    }

    function _set(index) {
        existShip[index] = true;
    }

    function _remove(index) {
        existShip[index] = false;
    }

    function _get(index) {
        return existShip[index];
    }

    function _send(orbit, msg) {
        if(Math.random() <= 0.3) {
            logger.log("向轨道" + (orbit + 1) + "发送的 " + msg.command + " 指令发生未知错误！");
            return false;
        } else {
            logger.log("向轨道" + (orbit + 1) + "成功发送 " + msg.command + " 指令！");
            mediator.publish(orbit, msg);
            return true;
        }
    }

    return {
        getCommandList: _getList,
        setState: _set,
        removeState: _remove,
        getState: _get,
        sendMessage: _send
    };
}(window, document, undefined));

(function (global, doc, undef) {
    // 利用事件委托绑定回调
    $('.panel-list').click(function (e) {
        var event = e || window.event,
            target = event.target || event.srcElement,
            $target = $(target),
            index = $target.parent().index(),
            cmdList = commander.getCommandList(),
            rateCmd = {},
            msgState = false;

        function stateCheck(index) {
            if (!commander.getState(index)) {
                logger.log("向轨道" + (index + 1) + "发送的 " + $target.attr('class') + " 指令发生未知错误！");
                return false;
            } else {
                return true;
            }
        }

        if (target.nodeName.toLowerCase() == "button") {
            switch ($target.attr('class')) {
                case 'create':
                    if (!commander.getState(index)) {
                        shipFactory.create({orbit: index});
                        commander.setState(index);
                        logger.log((index + 1) + '号飞船创建成功');
                    }
                    break;
                case 'launch':
                    if (stateCheck(index)) {
                        commander.sendMessage(index, cmdList.launch);
                    }
                    break;
                case 'stop':
                    if (stateCheck(index)) {
                        commander.sendMessage(index, cmdList.stop);
                    }
                    break;
                case 'rate':
                    if (stateCheck(index)) {
                        rateCmd = Object.create(cmdList.rate);
                        rateCmd.flySpeed = parseInt($target.parent().children('input').val());
                        commander.sendMessage(index, rateCmd);
                    }
                    break;
                case 'destroy':
                    if (stateCheck(index)) {
                        msgState = commander.sendMessage(index, cmdList.destroy);
                        if (msgState) {
                            commander.removeState(index);
                        }
                    }
                    break;
            }
        }
    });
}(window, document));
