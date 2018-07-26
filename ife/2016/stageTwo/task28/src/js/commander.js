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
