'use strict';
import gm from 'gm';
import path from 'path';
import {
    exec
} from 'child_process';

// 获取需要输出的图片数量
function getNum (val){
    const max = 40;         // 最大帧数
    const min = 10;         // 最小帧数
    let res = val;

    if(res > max){
        res = max
    }else if (res < min){
        res = min
    }
    return res
}

// 获取输出的路径
function getVideoOut(){
    let _name = think.uuid(16) + '_' + (new Date()).getTime();
    return {
        dist: path.resolve('./www/static/upload/video', _name),
        src: path.resolve('/static/upload/video', _name)
    }
}

// 获取ffmpeg需要输出的帧数
function getFInput(param){

    let res,length, select;
    var ext = '.jpg';
    var fileOut = getVideoOut();
    if(param.allFrames <= param.needFrames){

        // 当视频帧数不够的时候,返回视频的所有帧
        length = param.allFrames;
        select = [fileOut.dist + '_%d' + ext];
    }else{

        // 需要转化的帧数.
        length = param.needFrames;
        select = [
            '-vf select=\''+ getFramesNum(param)+'\',scale=320:-1',
            '-vsync vfr',
            fileOut.dist + '_%d' + ext
        ]
    }

    res = (function () {
        let _res = [];
        for (let i = 1; i <= length; i++){
            _res.push( fileOut.src + "_" + i + ext );
        }
        return _res
    })();
    return {
        input :param.changeArr.concat(select).join(' '),
        res: res
    }
}



// 获取ffmpeg需要输出的帧数
function getFramesNum(param) {
    let allFrames = param.allFrames;
    let needFrames = param.needFrames;
    let range = allFrames / (needFrames);
    let index = 0;
    let arr = [];
    let res = '';
    do {
        arr.push(Math.floor(index * range + 1));
        index++;
    } while (index < needFrames);
    for (let i = 0; i < needFrames; i++) {
        res += `+eq(n\\,${arr[i]})`
    }
    return res.substr(1);
}

//
function videoToImg(){
  
}

/**
 *
 * @param _path
 * @param val
 * @returns {Promise}
 */
async function doTrans(_path, val){

    let inputStr = [
        'ffprobe',                  // 命令行执行的方法 - ffprobe
        '-v quiet',                 // 打印日志的级别 - Show nothing at all; be silent.
        '-print_format json',       // 输出格式 JSON
        '-show_streams',            // 输出流的信息
        '-select_streams v',        // 输出流中视频相关信息
        //'-count_frames',            // 计算视频的帧数, 存放在nb_read_frames 中
        '-i',                       // 输入的文件 input
        _path
    ].join(' ');

    let changeArr = [
        'ffmpeg',                   // 命令行执行的方法 -
        '-v quiet',                 // 打印日志的级别 - Show nothing at all; be silent.
        '-i',                       // 输入文件 input
        _path
    ];

    let num = getNum(val);

    return new Promise(function(resolve, reject) {
        exec(inputStr, (err, stdout, stderr) => {
            if(err){}

            let stream = JSON.parse(stdout).streams[0];
            let frames = stream.nb_frames;          // 视频帧数

            let resObj = getFInput({
                allFrames: frames,
                needFrames: num,
                changeArr: changeArr
            });

            exec(resObj.input, (err, stdout, stderr) => {
                console.log('##########SUCCESS!!!!!!!!!');
                if(err){
                    console.log(err);
                }
                resolve(resObj.res);
                //self.success(resObj.res);
            });
        });
    })
}

export default {
    doTrans: doTrans
}