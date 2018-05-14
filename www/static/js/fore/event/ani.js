(function (window, $) {

    var ani= {};
    var pages;          // 用来显示的dom
    var curIndex;       // 当前显示的节点
    var START_NUM = 0;       // 其实位置
    var END_NUM;         // 终止位置

    function init(){
        pages = $(".p-page");

        END_NUM = pages.length - 1;
        curIndex = 0;
    }

    function change(direction){
        var nextIndex = curIndex + direction;


        if(nextIndex < START_NUM || nextIndex > END_NUM){
            return false
        }

        curIndex = nextIndex;
        pages.hide().eq(nextIndex).show();
    }

    ani.change = change;
    ani.init = init;

    WD.ani = ani;

})(window.WD, window.jQuery);