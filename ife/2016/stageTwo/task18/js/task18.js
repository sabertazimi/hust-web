(function () {
    var data = [1, 2 , 3],
        dom = {
            input: document.getElementById('elem'),
            demo: document.getElementById('demo'),
            shift: document.getElementById('shift'),
            unshift: document.getElementById('unshift'),
            pop: document.getElementById('pop'),
            push: document.getElementById('push')
        },
        utils = {
            toNum: function (num) {
                return parseInt(Array.prototype.filter.call(num.toString(10), function (item) {
                    return item >= '0' && item <= '9';
                }).join(''));
            }
        },
        template = function template() {
            var helper = [],
            len = data.length;

            for (var i = 0;i < len;i++) {
                helper.push('<a id="block-' + i + '" class="btn-custom" href="#">');
                helper.push('' + data[i] + '');
                helper.push('</a>');
            }

            dom.demo.innerHTML = helper.join('');
        },
        bindBtnHandle = function bindBtnHandle() {
            dom.shift.addEventListener('click', function () {
                if (data.length > 0) {
                    data.shift();
                }
                template(data);
            }, false);

            dom.unshift.addEventListener('click', function () {
                var value = utils.toNum(dom.input.value);
                if (isNaN(value)) return;
                data.unshift(value);
                template(data);
            }, false);

            dom.pop.addEventListener('click', function () {
                if (data.length > 0) {
                    data.pop();
                }
                template(data);
            }, false);

            dom.push.addEventListener('click', function () {
                var value = utils.toNum(dom.input.value);
                if (isNaN(value)) return;
                data.push(value);
                template(data);
            }, false);
        };

    (function () {
        template();
        bindBtnHandle();
    }());
}());
