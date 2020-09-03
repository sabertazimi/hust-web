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
