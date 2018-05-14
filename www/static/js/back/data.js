(function ($, WD) {

    var imgArr = [];

    // 获取图片模板
    function getTemp(src, index){
        return '' +
            '<div class="w-img-row">' +
                '<img src="'+src+'">' +
                '<a class="each-del" data-index="'+index+'">删除</a>' +
                '<input type="text" value="'+index+'">' +
                '<a class="each-sort" data-index="'+index+'">排序</a>' +
            '</div>'
    }

    function paint(){
        let html ="";
        $.each(imgArr, function (index, img) {
            html += getTemp(getSmallImg(img), index);
        });
        $('#list').html(html);
    }

    function getSmallImg (_src){
        let name = _src.substr(_src.lastIndexOf('/'));
        return '/static/upload/small/' + name
    }

    WD.data = {
        getStr: function () {
          return imgArr.join(",")
        },
        get: function () {
          return imgArr
        },
        add: function (_arr) {
            imgArr = imgArr.concat(_arr);
            paint();
        },
        del: function (_index){
            if(Number(_index) >=0 && Number(_index) < imgArr.length){
                imgArr.splice(_index, 1);
            }else{
                console.warn('删除的序号错误,请重试');
            }
            paint();
        },
        sort: function (fromNum, toNum) {

            if(
                fromNum == toNum ||
                fromNum >= imgArr.length ||
                toNum >= imgArr.length
            ){
                return false
            }

            let sortImg = imgArr.splice(fromNum, 1)[0];
            imgArr.splice(toNum, 0, sortImg);
            paint();
        },
        clear: function(){
            imgArr = [];
        }
    }


})(window.jQuery, window.WD);