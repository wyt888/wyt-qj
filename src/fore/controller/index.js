'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    let _id = this.param('id');
    let _model = this.model('images');
    let _data = await _model.where({id: _id}).find();
    this.arr = _data && _data.image_arr? _data.image_arr : '';
    return this.display();
  }

}