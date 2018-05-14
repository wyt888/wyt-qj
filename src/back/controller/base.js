'use strict';

import ffm from './tools/ffm';
import gmn from './tools/gmn';

export default class extends think.controller.base {

  /**
   * @description 图片上传接口
   */
  async uploadAction(){
    let files = this.file();
    let srcArr = [];
    for (let key in files) {
      srcArr.push(files[key].path);
    }

    let originalRes = await gmn.formatJPG(srcArr);
    let smallRes = await gmn.compress(originalRes);

    this.success({
      small: smallRes,
      big: originalRes
    });
  }

  /**
   * @description
   *
   * @param self: controller
   * @req_param {file} video: 上传的视频
   * @req_param {number} type:
   *   筛选视频图片的类型 1: 按张数筛选
   *                    2: 按角度筛选
   *
   * @req_param {number} val:
   *   筛选条件的值(具体张数 or 角度数)
   *
   */
  async uploadvAction(self){
    let filePath = this.file('video').path;
    let val = this.param('val') || 30;

    let bigResult = await ffm.doTrans(filePath, val);

    let smallRes = await gmn.compress(bigResult);

    self.success({
      small: smallRes,
      big: bigResult
    });
  }

  async logAction(self){
    let val = this.param('val');
    console.log(val);
    self.success();
  }
}