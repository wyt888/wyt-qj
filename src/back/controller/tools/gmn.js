/**
 * @description
 * 图片处理相关方法
 *
 *
 * @export
 *  {function} compress 图片压缩方法
 *  {function} crop     图片裁剪方法
 *
 */
'use strict';
import gm from 'gm';
import path from 'path';

// 默认压缩后的图片大小
const DEFAULT_SIZE = 400;

// TODO -- 接口还未测试 GM 插件已经跑通了.
async function crop(cfg){
    let target = '';
    return new Promise(function(resolve, reject){
        gm(cfg.src)
            .crop(cfg.size, cfg.size, cfg.x, cfg.y)
            .resize(DEFAULT_SIZE)
            .write(target, function (err) {
                if(err){
                    console.log(err);
                }

                resolve('');
            });
    });

}

/**
 * @description
 * 生成缩略图
 * thumb方法会导致图片裁剪.暂时先用resize生成缩略图
 *
 *
 *
 */
async function thumbnail(cfg){
    const DEFAULT_W = 100;
    let outName = path.resolve('./www/static/upload/small/', path.basename(cfg.src));
    return new Promise(function(resolve, reject){
        gm(cfg.src).resize(DEFAULT_W).write(outName, function (err) {
            if(err){
                console.log(err);
            }

            resolve(path.join('/static/upload/small/', path.basename(cfg.src)));
        });


        //gm(cfg.src).thumb(
        //    defaultWidth,
        //    defaultHeight,
        //    outName,
        //    defaultQuality,
        //    function (err, stdout, stderr, command) {
        //        if(err){
        //            console.log(err);
        //        }
        //        resolve(path.join('/static/upload/small/', path.basename(cfg.src)));
        //    }
        //);
    });
}

async function compress(imgArr){
    let all = [];
    imgArr.forEach(function (val) {
        all.push(thumbnail({
            src: path.resolve('./www'+val)
        }))
    });
    return Promise.all(all)
}


/**
 * @description
 * 用户上传图片的时候使用的方法
 *
 * @function formatJPG
 *
 *
 */

async function moveImg(src){
    let ext = '.jpg';
    let name = think.uuid(16) + '_' + (new Date()).getTime() + ext;
    let target = path.resolve('www/static/upload/images', name);
    return new Promise(function(resolve, reject){
        gm(src).resize(320, 320, '^').write(target, function(){
            resolve(path.join('/static/upload/images', name));
        });
    })
}
async function formatJPG(imgArr){
    let all = [];
    imgArr.forEach(function (val) {
        all.push(moveImg(val))
    });
    return Promise.all(all)
}

export default {
    compress: compress,
    formatJPG: formatJPG

}

/**
 * @description
 * 原图无损压缩 - 直接通过视频转jpg.
 * 暂时先不用这个
 *
 */
//function imgCompress(_src, type){
//    var compressType = type || 'JPEG';
//    var endExt = 'jpg';
//    gm(_src).compress(compressType).write(replaceExt(_src, endExt), function () {
//        console.log(arguments);
//        console.log(_src);
//    });
//}
//function replaceExt(_src, ext){
//    let arr = _src.split('.');
//    let l = arr.length;
//    if(l > 1){
//        arr[l-1] = ext;
//        return arr.join('.')
//    }else{
//        console.log('unresolved src:', _src);
//        return _src
//    }
//}
//
//function srcToM(_src){
//    let arr = _src.split('.');
//    let l = arr.length;
//    if(l > 1){
//        arr[l-2] = arr[l-2] + '_m';
//        return arr.join('.')
//    }else{
//        console.log('unresolved src:', _src);
//        return _src
//    }
//}