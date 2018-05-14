(function ($, WD) {

    var imgArr = [];

    WD.sort = init;

    // 初始化
    function init(){
        console.log('startSort!');
        imgArr = WD.data.get();
        console.log(imgArr);

        // 页面效果初始化
        $(document.body).css('overflow', 'hidden');
        $('.sort-area').show();


    }

    // 销毁
    function destroy(){
        imgArr = [];
        $(document.body).css('overflow', '');
        $('.sort-area').hide();
    }


})(window.jQuery, window.WD);