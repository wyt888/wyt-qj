/**
 * @description
 * 编辑页面的主JS
 */
(function (window, $) {
    // 后端页面主函数,用来初始化数据及页面时间绑定

    var WD= {
        id: 0,
        dom: {},
        data: {},
        crop: {},
        uploadImg: function () {},
        uploadVideo: function () {}
        //sort: {}
    };

    // 初始化页面数据
    WD.init = function (data) {
        // 初始化INPUT按钮
        try {
            if(data){
                data = JSON.parse(data);
                if(data.id && data.image_arr){
                    WD.id = data.id;
                    WD.data.add(data.image_arr.split(','));
                }
            }
        }catch(e){
            console.warn('数据格式解析错误\n', e);
        }


        bindEvent();
        bindHammer();

        WD.crop.bind();

        // 页面事件绑定 - 图片操作 TODO -- 需要优化事件委托.
        var list = $('#list');
        //list.on('click', '.w-del-i', function (event) {
        //    if(confirm('删除图片?')){
        //        var _target = event.target;
        //        var _index = _target.getAttribute('data-index');
        //        WD.data.del(_index);
        //    }
        //});
        list.on('click', '.each-del', function (event) {
            if(confirm('删除图片?')){
                var _target = event.target;
                var _index = _target.getAttribute('data-index');
                WD.data.del(_index);
            }
        });


        // 排序时间绑定
        list.on('click', '.each-sort', function (event) {
            var _target = event.target;
            var fromNum = _target.getAttribute('data-index');
            var toNum = $(_target).prev().val();
            WD.data.sort(fromNum, toNum);
        });



    };

    // 页面按钮绑定事件
    function bindEvent(){

        // JQUERY 事件绑定 - 图片上传file的change事件
        var inputImg = $('#file_img');
        var img_desc = $('#img_desc');
        var inputVideo = $('#file_video');
        var video_desc = $('#video_desc');

        // 上传按钮事件绑定
        var img_btn = $('#upload_img');
        var video_btn = $('#upload_video');

        // 上传按钮事件绑定
        img_btn.on('click', WD.uploadImg);
        video_btn.on('click', WD.uploadVideo);


        inputImg.on('change', function () {
            var len = this.files.length;
            img_desc.text('您选择了' + len + '张图片')
            img_btn.removeClass('w-btn-disable')
        });
        inputVideo.on('change', function () {
            var len = this.files.length;
            if(len){
                video_desc.text('请上传...')
                video_btn.removeClass('w-btn-disable')
            }else{
                video_desc.text('请选择视频')
            }
        });

        var n1 = $('#file_num_show');
        var n2 = $('#file_num_deg');
        var n0 = $('#file_num');
        var old = n0.val();
        n0.on('keydown', function () {
            setTimeout(function (){
                var val = n0.val();
                var deg = '';
                if(val == old){
                    return;
                }else{
                    old = val
                }
                if(val == ''){
                    val = 30;
                    deg = 360/val;
                }else if(isNaN(val)){
                    val = 30;
                    deg = 360/val;
                }else if(val < 1){
                    val = 30;
                    deg = 360/val;
                }else{
                    val = parseInt(val);
                    deg = 360/val;
                    n0.val(val);
                }
                n1.html(val);
                n2.html(deg.toFixed(2));
            },0);
        });
    }

    function bindHammer(){
        var body = $('body');

        var tab_img =  $('#show_img');
        var tab_video = $('#show_video');
        var upload_area_img = $('#upload_area_img');
        var upload_area_video = $('#upload_area_video');
        // hammerJS 事件绑定
        var mc_tab_img = new Hammer(tab_img.get(0),{});
        var mc_tab_video = new Hammer(tab_video.get(0),{});
        // tab层事件绑定
        mc_tab_img.on('tap', function(){
            tab_img.addClass('w-cur');
            tab_video.removeClass('w-cur');
            body.removeClass('w-gradient-r').addClass('w-gradient-l');
            upload_area_video.hide();
            upload_area_img.show();
        });
        mc_tab_video.on('tap', function(){
            tab_img.removeClass('w-cur');
            tab_video.addClass('w-cur');
            body.removeClass('w-gradient-l').addClass('w-gradient-r');
            upload_area_video.show();
            upload_area_img.hide();
        });

        var save = new Hammer($('#submit').get(0),{});
        save.on('tap', WD.submit);
    }

    window.WD = WD;

})(window, window.jQuery, window.WD);