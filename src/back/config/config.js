'use strict';
/**
 * config
 */
export default {
    // id的校验规则
    rules_id : {
        required: true,
        int: true,
        min: 1
    },

    rules_image_arr: {
        required: true,
        string: true,
        minLength: 6
    }

    // 需要添加图片处理相关的配置参数
    // 1. 图片最小宽高尺寸.

};