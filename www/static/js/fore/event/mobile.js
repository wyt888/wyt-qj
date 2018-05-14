(function (window, $, WD) {

    /**
     * @description
     * 用来检测设备转动的角度, 该事件的兼容性仍有问题.需要后面再维护.
     * 通过DeviceOrientationEvent来监听设备的角度并切换图片.
     *
     */

    var event = {};
    var RANGE;
    var preGamma = null;        // 初始Gamma坐标
    var pages;                  // 用来显示的dom
    var curIndex;               // 当前显示的节点
    var START_NUM = 0;          // 起始位置
    var END_NUM;                // 终止位置

    function init(perDeg){

        // 初始化数据
        pages = $(".ori-page");
        END_NUM = pages.length - 1;
        curIndex = 0;
        RANGE = perDeg;
        window.addEventListener('deviceorientation', firstRecode);
    }

    function firstRecode(event){
        preGamma = Math.round(event.gamma);
        window.removeEventListener('deviceorientation', firstRecode);
        window.addEventListener('deviceorientation', getChange);
    }

    function getChange(event){
        var curGamma = Math.round(event.gamma);
        var distance = Number(curGamma - preGamma);

        // 当从+89 过度到 -89 的时候,需要重新计算位置
        if(((curGamma>0 && preGamma<0)||(curGamma<0 && preGamma>0)&& Math.abs(curGamma) > 45)){
            distance = Number(curGamma + preGamma);
        }

        // 判断滚动的角度
        if(distance === 0 || Math.abs(distance) < RANGE){
            // 移动的范围未触发图片改变
            return false
        }else{
            preGamma = curGamma;                        // 重置坐标,用来进行下次计算
            var direction = distance > 0 ? 1 : -1;      // 获取图片翻转的方向
            change(direction);                          // 调用图片翻转方法
        }
    }


    function change(direction){
        var nextIndex = curIndex + direction;
        if(nextIndex < START_NUM || nextIndex > END_NUM){
            return false
        }
        curIndex = nextIndex;
        pages.hide().eq(nextIndex).show();
    }

    // 设备兼容性处理
    function deviceCompatibility(){}

    event.init = init;

    WD.event = event;

})(window, window.jQuery, window.WD);