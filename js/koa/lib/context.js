const proto = {};

// getter proxy
function defineGetter(prop, name){ 
    proto.__defineGetter__(name, function() {
      return this[prop][name];
    });
}

// setter proxy
function defineSetter (prop, name) {
    proto.__defineSetter__(name, function(val) {
      this[prop][name] = val;
    })
}

defineGetter('request', 'url');
defineGetter('request', 'path');

defineGetter('response', 'body');
defineSetter('response', 'body');

module.exports = proto;
