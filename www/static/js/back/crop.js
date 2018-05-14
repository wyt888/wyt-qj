/**
 * @description
 * 图片裁剪的JS代码
 *
 * 逻辑描述:
 *      1.
 */
(function ($, WD) {
    var crop = {};

    var index = 0;
    var body = $('body');
    var box = $('#cropBox');
    var cw = box.find('#w-window');

    var c_b = $('#w_crop_bg');
    var c_i = $('#w_crop_img');

    var winW = '';
    var defaultH;
    var winH = '';
    var h_t = '';

    /**
     * @description 用来储存各个图片的具体数据
     * @$d.big 大图路径
     * @$d.small 小图路径
     * @$d.height 图片高度
     * @$d.width 图片宽度
     * @$d.x   裁剪的起始X坐标
     * @$d.y   裁剪的起始Y坐标
     * @$d.size  裁剪的尺寸
     */
    var data = (function () {
        var $d = [];


        function getBySrc(arr, src){
            var res = false;
            for (var i = 0 ; i < arr.length ; i++){
                if(arr[i].big == src){
                    res = arr[i];
                    break;
                }
            }
            return res
        }
        return {

            // 重置图片裁剪的数据 - 用于初始化
            reset: function (_arr) {
                var d_bak = $d;
                $d = [];
                $.each(_arr, function (index, src) {
                    var _res = getBySrc(d_bak, src);
                    if(_res){
                        $d.push($.extend({}, _res))
                    }else {
                        $d.push({
                            big: src,
                            small: '',
                            height: '',
                            width: '',
                            x: '',
                            y: '',
                            size: ''
                        })
                    }
                });
            },
            get: function () {
                return $d
            },
            getByIndex: function (index) {
                var l = $d.length;
                if( index < l && index >= 0 ){
                    return $d[index]
                }else {
                    return false
                }
            }
        }
    })();



    /**
     * @description
     * 处理窗口中的拖动, 缩放等功能
     *
     */
    function setWindowEvent(){
        var ins = new Hammer(cw.get(0),{});
        ins.add( new Hammer.Pan({
            direction: Hammer.DIRECTION_ALL,
            threshold: 3
        }) );
        ins.add( new Hammer.Pinch({
            pointers: 2,
            threshold: 0
        }) );
        bindPan(ins);
        bindPinch(ins);

        bindTap(ins);
    }

    // *********************************** //
    // todo 测试日志
    function log(str){
        $.ajax({
            method: "POST",
            dataType: 'JSON',
            url: "/back/base/log",
            data: {
                val: JSON.stringify(str)
            }
        }).then(function (res) {
        }, function () {
        });
    }


    function bindTap(ins){

        ins.on('tap', function (event) {
        });
    }
    // 测试结束
    // ********************************** //

    function bindPinch(ins){

        var w; // 缩放前图片的宽
        var h; // 缩放前图片的高

        var cx; // 初始中心点x坐标
        var cy; // 初始中心点y坐标

        var tx; // 图片的x轴位移
        var ty; // 图片的y轴位移

        var pw; // 中心点偏移百分比
        var ph; // 中心点偏移百分比

        ins.on('pinchstart', function (event) {

            // 初始化数据计算
            var trans = getTrans(c_i.css('transform'));
            var top = parseInt(c_b.css('top'));
            w = c_i.width();
            h = c_i.height();
            cx = event.center.x;
            cy = event.center.y;
            tx = trans.x;
            ty = trans.y;
            pw = (cx - tx)/w;
            ph = (cy - ty - top)/h;
        });
        ins.on('pinchmove', function (event) {
            var scale = event.scale;
            var nw = Math.ceil(w * scale);
            var nh = Math.ceil(h * scale);
            var ntx = tx + event.center.x - cx - (nw - w) * pw;
            var nty = ty + event.center.y - cy - (nh - h) * ph;
            setTrans(Math.ceil(ntx), Math.ceil(nty));
            setSize(nw, nh);
        });
        ins.on('pinchend', function (event) {
            var oh = c_b.height();
            var scale = event.scale;
            var nw = Math.ceil(w * scale);
            var nh = Math.ceil(h * scale);

            if(nw < winW){
                nw = winW;
                nh = winW / w * h;
            }

            var ntx = tx + event.center.x - cx - (nw - w) * pw;
            var nty = ty + event.center.y - cy - (nh - h) * ph;

            // TODO -- 与panend中的尺寸计算相同,待合并
            if( (nw+ntx) < winW ){ // 右侧边距判断
                ntx = winW - nw;
            }else if(ntx > 0){ // 左侧边距判断
                ntx = 0;
            }

            // TODO -- 与panend中的尺寸计算相同,待合并
            if(nh < winW){
                // 当图片高度小于 窗口高度的时候 计算居中
                nty = (oh - nh)/2;
            }else{
                // 当图片高度不小于窗口高度的时候,计算上下边距

                var disO = (oh-winW)/2;
                var disB = winW - nh + disO;
                if( nty > disO ){ // 图片上边距计算
                    nty = disO;
                }else if ( nty < disB ){
                    nty = disB;
                }
            }

            setTrans(Math.ceil(ntx), Math.ceil(nty));
            setSize(nw, nh);
        })
    }

    function bindPan(ins){
        var x = '';
        var y = '';

        var tx = '';
        var ty = '';

        ins.on('panstart',function(event){
            event.preventDefault();
            var trans = getTrans(c_i.css('transform'));
            x = event.center.x;
            y = event.center.y;
            tx = trans.x;
            ty = trans.y;
        });

        ins.on('panmove', function (event) {
            var diffX = event.center.x - x + tx;
            var diffY = event.center.y - y + ty;
            setTrans(diffX, diffY);
        });

        ins.on('panend', function (event) {
            var diffX = event.center.x - x + tx;
            var diffY = event.center.y - y + ty;
            onPanEnd(diffX, diffY);
        });
    }

    //
    function onPanEnd(x, y){

        // 先判断X坐标问题
        var oh = c_b.height();
        var w = c_i.width();
        var h = c_i.height();

        // TODO -- 与pinchend中的尺寸计算相同,待合并
        if( (w+x) < winW ){ // 右侧边距判断
            x = winW - w;
        }else if(x > 0){ // 左侧边距判断
            x = 0;
        }

        // TODO -- 与pinchend中的尺寸计算相同,待合并
        if(h < winW){
            // 当图片高度小于 窗口高度的时候 计算居中
            y = (oh - h)/2;
        }else{
            // 当图片高度不小于窗口高度的时候,计算上下边距

            var disO = (oh-winW)/2;
            var disB = winW - h + disO;
            if( y > disO ){ // 图片上边距计算
                y = disO;
            }else if ( y < disB ){
                y = disB;
            }
        }


        setTrans(x, y);
    }

    //matrix(1, 0, 0, 1, -9, -33.5)
    function getTrans(tran){
        var regexp = /matrix\(.*,\s(-?\d+.?\w*),\s(-?\d+.?\w*)\)/;
        var res = {
            x: 0,
            y: 0
        };
        var ex = regexp.exec(tran);
        if(ex && ex.length > 2 ){
            res.x = Number(ex[1]) || 0;
            res.y = Number(ex[2]) || 0;
        }
        return res
    }

    function setTrans(x, y){
        c_i.css('transform', 'translate3d(' + x + 'px, ' + y + 'px, 0)');
    }

    function setSize(w, h){
        c_i.css({
            width: w,
            height: h
        })
    }

    /**
     * @description
     * 图片裁剪过程中用到的方法
     *
     * @function paintImg 绘制图片
     * @function setDefaultPOS 绘制图片
     */

    function paintImg(_index){
        var info = data.getByIndex(_index);
        if(!info){
            console.warn('数组越界!!');
            return false
        }
        c_i.attr('src', info.big);

        // 判断什么时候info loading 结束 - 1. settimeout 2. 注册一个imgonload?
        setPos();

        function setPos(){
            if(info.width && info.height){


                // 设置背景的位置
                var curHeight = Math.floor( info.height / info.width * winW);
                var curTop = h_t + Math.ceil((winW - curHeight)/2);
                defaultH = curHeight;
                c_b.css({
                    "height": curHeight,
                    "top": curTop
                });

                // 初始化图片大小
                c_i.css({
                    width: winW,
                    height: curHeight
                    //width: 1280,
                    //height: 800
                });


            }else{
                setTimeout(function () {
                    setPos()
                }, 100)
            }
        }
    }




    /**
     * @description
     * 初始化所用到的方法
     *
     * @function initialization
     *
     * @function calculatedSize
     *
     */

    // 初始化图片数据
    function initialization(){
        //var imgArr = WD.data.get();
        var imgArr = [
            '/static/test/xj2.jpg',
            '/static/test/xj1.jpg',
            '/static/test/xj3.jpg',
            '/static/test/t1.png'
        ];
        data.reset(imgArr);
        preLoadImg(); // 预加载图片尺寸

        paintImg(0);

        function preLoadImg(){
            var arr = data.get();
            $.each(arr, function (index, obj) {
                if(!obj.height || !obj.width){
                    var _img = new Image();
                    _img.src= obj.big;
                    _img.onload = function () {
                        obj.width = _img.width;
                        obj.height = _img.height;
                        _img = null;
                    };
                }
            });
        }
    }

    // 计算界面相关尺寸
    function calculatedSize(){
        winH = box.height();
        winW = box.width();
        h_t = Math.floor((winH - winW) / 2) - 40;
        var h_b = winH - winW - h_t;
        box.find('#w-top').height(h_t);
        cw.height(winW - 2); // 设置高度的时候算上了边距 所以减掉2像素
        box.find('#w-bottom').height(h_b);
    }



    // 页面销毁
    function destroy(){
        body.css('overflow', '');
        box.hide();
    }

    crop.bind= function () {
        //$('#myCrop').on()
        var _crop = new Hammer($('#myCrop').get(0),{});

        // 弹出图片裁剪层
        _crop.on('tap', function(){
            initialization();
            body.css('overflow', 'hidden');
            box.show();
        });

        // 隐藏图片裁剪层
        var close_btn = new Hammer(box.find('#crop_cancel').get(0),{});
        var confirm_btn = new Hammer(box.find('#crop_confirm').get(0),{});
        close_btn.on('tap', function(){
            destroy();
        });
        confirm_btn.on('tap', function(){

            /**
             * TODO -- 计算裁剪的尺寸
             * 1. 图片宽高
             * 2. 图片的transform x 与 y
             * 3. 图片放大后的宽高.
             * 4. 计算窗口在图片上的起止点. 左上与右下.
             * 5.
             */
            var _data = data.getByIndex(index);

            var trans = getTrans(c_i.css('transform'));
            var top = parseInt(c_b.css('top'));
            var curW = c_i.width();
            var curH = c_i.height();

            var curtStartX;
            var curtStartY; //  裁剪的纵向距离
            var curtSize;


            if(curH < winW){
                // 当图片的高度小于裁剪窗口的高度时,截取图片中间方块
                curtStartY = 0;
                curtStartX = (_data.width - _data.height)/ 2;
                curtSize = _data.height;
            }else{

                // 其他情况需要计算裁剪开始点的位置 及裁剪的长度.
                // TODO --- 计算某点在图片中的坐标可以抽象成一个方法 - pinch start中有用.
                var thisX = 0 - trans.x;
                var cy = $('#w-top').height();
                var thisY = (cy - trans.y - top);
                var cent = _data.width/curW;

                curtStartY = thisY * cent;
                curtStartX = thisX * cent;
                curtSize = winW * cent;

            }
            _data.size = Math.floor(curtSize);
            _data.x = Math.floor(curtStartX);
            _data.y = Math.floor(curtStartY);


            console.log(_data);




            //destroy();
        });

        calculatedSize();

        setWindowEvent();


        // TODO - 临时调用 - initialization();
        initialization();
    };

    crop.data = data;

    WD.crop = crop;
})(window.jQuery, window.WD);