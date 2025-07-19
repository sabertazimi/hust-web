(function () {
    var data = [30, 20 , 40, 20, 50, 100, 110, 77, 37, 95, 94, 29, 45, 63, 96, 49, 94, 23, 56, 74, 64, 43, 56, 23, 64, 74, 14, 43, 63, 13, 63, 75, 32, 87, 45, 75, 39, 50, 10, 96, 45, 35, 64, 53, 65, 12, 34, 86, 48, 35, 52, 14, 54, 63, 91, 30, 40, 10, 30, 70, 40, 80, 15, 20, 47, 88, 100],
        dom = {
            input: document.getElementById('elem'),
            demo: document.getElementById('demo'),
            // convert to event-delegate
            btn: document.getElementById('btn-group')
        },
        utils = {
            // validate number format
            toNum: function (num) {
                return parseInt(Array.prototype.filter.call(num.toString(10), function (item) {
                    return item >= '0' && item <= '9';
                }).join(''));
            },
            // delay function
            sleep: function (numberMillis) {
                var now = new Date(),
                    exitTime = now.getTime() + numberMillis;
                while (true) {
                    now = new Date();
                    if (now.getTime() > exitTime)
                    return this;
                }
            }
        },
        // render map with data
        templateRender = function template(targetIndex) {
            var helper = [],
            len = data.length;

            for (var i = 0;i < len;i++) {
                helper.push('<a id="block-' + i + '" href="#" ');
                helper.push('class="btn-custom');
                if (i === targetIndex) {
                    helper.push(' inverse" ');
                } else {
                    helper.push('" ');
                }
                helper.push('style="padding: ' + data[i]*1.8 + 'px 0">');
                helper.push('' + data[i] + '');
                helper.push('</a>');
                dom.demo.innerHTML = helper.join('');
            }

            dom.demo.innerHTML = helper.join('');
        },
        // event delegate mechanism
        bindBtnHandle = function bindBtnHandle() {
            function removeCheck() {
                if (data.length <= 0) {
                    alert('元素不足');
                    return false;
                } else {
                    return true;
                }
            }

            function insertCheck(value) {
                if (isNaN(value)) {
                    alert('请输入正整数');
                    return false;
                } else if (value < 10 || value > 100) {
                    alert('超出范围');
                    return false;
                } else if (data.length >= 60) {
                    alert('元素过多');
                    return false;
                } else {
                    return true;
                }
            }

            dom.btn.onclick = function (e) {
                var event = e || window.event,
                    target = event.target || event.srcElement,
                    len = data.length,
                    value,
                    tmp;

                switch (target.id) {
                    case 'shift':
                        if (removeCheck()) {
                            data.shift();
                            templateRender(0);
                        }
                        break;
                    case 'unshift':
                        value = utils.toNum(dom.input.value);
                        if (insertCheck(value)) {
                            data.unshift(value);
                            templateRender(0);
                        }
                        break;
                    case 'pop':
                        if (removeCheck()) {
                            data.pop();
                            templateRender(0);
                        }
                        break;
                    case 'push':
                        value = utils.toNum(dom.input.value);
                        if (insertCheck(value)) {
                            data.push(value);
                            templateRender(0);
                        }
                        break;
                    case 'sort':
                        var i = 0;
                        var outeranimation = setInterval(function () {
                            if (i >= len) {
                                clearInterval(outeranimation);
                                return;
                            }

                            for (var j = i + 1; j < len;j++) {
                                if (data[j] < data[i]) {
                                    tmp = data[i];
                                    data[i] = data[j];
                                    data[j] = tmp;
                                }
                            }
                            templateRender(i);
                            i++;
                        }, 300);
                        break;
                    default:
                        break;
                }
            };
        };

    (function () {
        templateRender(0);
        bindBtnHandle();
    }());
}());
