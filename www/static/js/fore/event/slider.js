/**
 * @description
 * 通过拖动展示页面的功能
 */
(function (window, $, WD) {

    var slider ={};
    var container = null;
    var pages = [];             // 用来显示的dom

    function bindSlider(){
        var SLIDER_WIDTH = 280;
        var length = pages.length;
        var each = SLIDER_WIDTH / length;
        var slider = $('#slider');
        var bar = $('#bar');
        var mc = new Hammer(slider.get(0),{
            //touchAction: 'pan-y'
        });

        mc.add( new Hammer.Pan({ threshold: 0 }) );
        mc.get('pan').set({ threshold: 1 });
        var defaultL = slider.offset().left;

        mc.on('panstart',function(event){
            event.preventDefault();
            var left = event.center.x - defaultL;
            bar.css('left', left).show();
        });

        mc.on('panmove', function (event) {
            event.preventDefault();
            var left = event.center.x - defaultL - 10;
            if(left < 0){
                left = 0;
            }
            if(left >= SLIDER_WIDTH){
                left = SLIDER_WIDTH;
            }
            var curNum = getPage(left);
            bar.css('left', left);
            pages.hide().eq(curNum).show();
        });

        mc.on('panend', function (event) {
            bar.hide();
        });

        function getPage(left){
            var num = 0;
            while(Math.floor(left - (num + 1) * each) > 0){
                num += 1;
            }
            return num
        }
    }

    slider.init= function () {

        // 初始化轮播数据
        container = $('#w_slider');
        pages = container.find('.slider-page');

        // 页面事件绑定
        bindSlider();
    };

    WD.slider = slider;

})(window, window.jQuery, window.WD);