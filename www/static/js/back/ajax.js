(function ($, WD) {

    // 初始化页面数据
    WD.uploadImg = function(event) {
        event.stopPropagation();
        var input = $('#file_img');
        var files = input.get(0).files;
        var param = new FormData();
        var _len = files.length;

        if (_len == 0) {
            console.warn('请上传文件!');
            return false;
        }

        for (var i = 0; i < _len; i++) {
            param.append('img' + i, files[i]);
        }

        $.ajax({
            method: "POST",
            dataType: 'JSON',
            url: "/back/base/upload",
            contentType: false,
            processData: false,
            data: param
        }).then(function (res) {
            WD.data.add(res.data.big);
            input.val("");
        }, function () {
            console.log('error!!!!');
            input.val("");
        });
    };

    //
    WD.uploadVideo = function(event) {
        event.stopPropagation();
        var input = $('#file_video');
        var num = $('#file_num').val();
        var video = input.get(0).files[0];
        var param = new FormData();
        if (!video) {
            console.warn('请上传文件!');
            return false;
        }

        param.append('video', video);

        if(num && num > 0 && num < 60){
            param.append('val', num);
        }


        $.ajax({
            method: "POST",
            dataType: 'JSON',
            url: "/back/base/uploadv",
            contentType: false,
            processData: false,
            data: param
        }).then(function (res) {
            if(res.data){
                WD.data.add(res.data.big);
            }else if(res.errmsg){
                alert(res.errmsg);
            }

        }, function () {
            console.log('error!!!!');
        });

        // 清空INPUT
        input.val("");
    };


    // 保存页面数据
    WD.submit = function () {
        var _arr = WD.data.getStr();
        var _id = WD.id;
        if( _id > 0 ){
            return update(_arr, _id);
        }else{
            return create(_arr);
        }
    };

    function create(_arr){
        return $.ajax({
            method: "POST",
            dataType: 'JSON',
            url: "/back/images/create",
            data: {
                image_arr: _arr
            }
        }).then(function (res) {
            if(Number(res.data) > 0){
                alert("保存成功");
                window.location.href = '/back/manage/list';
            }else{
                console.log("保存失败!!");
            }
        }, function () {
            console.log("服务器错误!!");
        });
    }

    function update(_arr, _id){
        return $.ajax({
            method: "POST",
            dataType: 'JSON',
            url: "/back/images/update",
            data: {
                id: _id,
                image_arr: _arr
            }
        }).then(function (res) {
            if(Number(res.data) === 1){
                alert("修改成功");
            }else{
                console.log("修改失败!!");
            }
        }, function () {
            console.log("服务器错误!!");
        });
    }

})(window.jQuery, window.WD);