'use strict';
/**
 * @description
 * 数据校验层(参照ThinkJS预发.)
 */
export default class extends think.logic.base {

  // 添加一条数据
  createAction(){

    this.allowMethods = 'get,post';
    let rules = {
      image_arr: this.config('rules_image_arr')
    };
    let flag = this.validate(rules);
    if(!flag){
      this.fail('校验未通过!');
    }

  }


  // 修改一条数据

  updateAction(){
    this.allowMethods = 'get,post';
    let rules = {
      id: this.config('rules_id'),
      image_arr: this.config('rules_image_arr')
    };
    let flag = this.validate(rules);
    if(!flag){
      this.fail('校验未通过!');
    }
  }


  deleteAction(){
    this.allowMethods = 'get';
    let rules = {
      id: this.config('rules_id')
    };
    let flag = this.validate(rules);
    if(!flag){
      this.fail('校验未通过!');
    }
  }

  //getbyidAction(){
  //  this.allowMethods = 'get';
  //  let rules = {
  //    id: this.config('rules_id')
  //  };
  //  let flag = this.validate(rules);
  //  if(!flag){
  //    this.fail('校验未通过!');
  //  }
  //}
}