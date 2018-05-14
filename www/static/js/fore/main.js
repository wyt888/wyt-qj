(function (window, $) {
    var WD = {

        //
        event: {},

        // 拖动相关方法
        slider: {},

        // 模板相关方法
        template: {},

        // 配置文件
        config: {

        }

    };
    WD.initFore = function(data){

        var dom = $('#' + data.id);
        var dataArr = data.images ? data.images.split(","): [];

        // 是否加载旋转相关功能
        //var isDOE = !WD.device.desktop() && WD.device.hasDOE;
        var isDOE = true;

        // ------ 数据检查及格式化 ------
        if(dataArr.length == 0 || dom.length<1){
            console.warn("参数不合法!!");
            return false
        }

        // ------ 计算每张图片占据的角度 ------
        var perDeg = (function (){
            var _size = dataArr.length;
            var DEGREE = 45;        // 默认的旋转角度

            if(_size > DEGREE){
                return 1;               // 如果图片数量过多,则一个角度一张图片
            }else{
                return Math.floor(DEGREE/_size);
            }
        })();

        // ------ dom初始化 ------
        var show = WD.template.initBox({
            isDOE: isDOE,
            dataArr: dataArr
        });
        dom.append(show);

        // ------ 图片预加载 ------
        preLoad(dataArr);

        // ------ 数据绑定初始化 ------
        WD.slider.init();
        if(isDOE){
            WD.event.init(perDeg)
        }
    };

    /**
     * @description
     * 从第二个图片开始加载图片
     *
     * @param _arr
     * @returns {boolean}
     */
    function preLoad(_arr){
        var _index = 0;
        var length = _arr.length;
        if(length < 2){
            return false
        }

        function doCheck(){
            if(_index < length -1){
                _index++;
                loadImg(_index);
            }
        }

        function loadImg(curIndex){
            var _img = new Image();
            _img.src=_arr[curIndex];
            _img.onload = function () {
                $('.ori-page img').eq(curIndex).attr("src", _arr[curIndex]);
                $('.slider-page img').eq(curIndex).attr("src", _arr[curIndex]);
                doCheck();
            };
            _img.onerror = function () {
                console.log('errrorrrr!!!');
                doCheck();
            };
        }

        doCheck();
    }

    window.WD = window.WD ? $.extend({}, WD, window.WD) : WD;
})(window, window.jQuery);