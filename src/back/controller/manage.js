'use strict';

import Base from './base.js';

function imgToArr(arr){
  arr.forEach(function (item) {
    item.image_arr = item.image_arr.split(',');
  });
}



export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async listAction(){
    let model = this.model('images');
    let page = this.get('page') || 1;
    let data = await model.order('id DESC').page(page, 10).countSelect();

    imgToArr(data.data);
    this.list = data || [];
    return this.display('list');
  }

  async editAction(){
    let model = this.model('images');
    let id = this.get('id') || 0;
    let data = {};
    if(id > 0){
      data = await model.where({id: id}).find();
    }

    this.back = getReferer(this.header().referer);
    this.data = JSON.stringify(data);
    return this.display('edit');

    function getReferer(url){
      return url ? url : '/back/manage/list'
    }
  }

  async cropAction(){


    return this.display('crop');
  }
}