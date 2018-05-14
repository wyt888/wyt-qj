(function (window, $, WD) {

    var template = {};
    // 初始化页面结构
    template.initBox = function (data) {
        var html = $("<div></div>");

        // 初始化窗口的尺寸
        html.css({
            width: '300px',
            height: '300px'
        });

        // 初始化滑动相关内容
        html.append(getSliderDom(data.dataArr));

        if(data.isDOE){         // 初始化移动端内容
            html.prepend(getOrientationDom(data.dataArr));
        }
        //html.children().eq(0).show();
        return html
    };

    function getOrientationDom(_arr){
        var wrapper = $('<div class="w-window-ori" id="w_orientation"></div>');
        wrapper.append(getHtml(_arr));
        return wrapper
    }

    function getSliderDom (_arr){
        var wrapper = $('<div class="w-window-slider" id="w_slider">' +
            '<div class="w-pics" id="w_pics"></div>' +
            '<div class="w-slider" id="slider"><div class="w-bar" id="bar"></div></div>' +
            '</div>');
        wrapper.find('#w_pics').append(getHtml(_arr, 'slider-page'));

        return wrapper
    }

    function getHtml(_arr, className){
        className || (className = 'ori-page');
        var html = '';
        $.each(_arr, function (index, src) {
            html += getTemp(index, src);
        });

        html = $(html);
        html.eq(0).show().find('img').attr("src", _arr[0]);
        return html;

        function getTemp(index, _src){
            // data-src 暂时没啥用
            return '' +
                '<div class="each-page '+ className +'" style="display: none;" data-index="' + index + '">' +
                '<img data-index="' + index + '"' +
                ' data-src="' + _src + '"' +
                '>' +
                '</div>';
        }
    }



    WD.template = template;

})(window, window.jQuery, window.WD);