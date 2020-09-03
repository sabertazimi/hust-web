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
