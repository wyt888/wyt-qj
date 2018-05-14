'use strict';

import Base from './base.js';

export default class extends Base {

  // 添加一条数据
  async createAction(){

    let _img = this.param('image_arr');
    let _model = this.model('images');
    let insertId = await _model.add({
      image_arr: _img
    });
    this.success(insertId);

  }


  // 修改一条数据

  async updateAction(){

    let _id = this.param('id');
    let _img = this.param('image_arr');
    let _model = this.model('images');
    let res = await _model.where({id: _id}).update({image_arr: _img});
    this.success(res);

  }

  // 根据ID 删除一条数据
  async deleteAction(){

    let _id = this.get('id');
    let _model = this.model('images');
    let _res = await _model.where({id: _id}).delete();
    this.success(_res);

  }

  //// 根据ID 获取一条数据
  //async getbyidAction(){
  //
  //  let _id = this.get('id');
  //  let _model = this.model('images');
  //  let data = await _model.where({id: _id}).find();
  //  this.success(data);
  //
  //}
}