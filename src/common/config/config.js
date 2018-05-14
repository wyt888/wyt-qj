'use strict';
/**
 * config
 */
export default {
  //key: value
    default_module: 'back', // 默认模块
    resource_on: true, //是否开启静态资源解析功能
    //resource_reg: /^(static\/|[^\/]+\.(?!js|html)\w+$)/, //判断为静态资源请求的正则
    port: 7000,
    timeout: 30 //将超时时间修改为 30s

};