'use strict';
/**
 * model
 */
import moment from "moment";
export default class extends think.model.base {
    schema = {
        title: {
            default: ''
        },
        image_arr: {
            default: ''
        },
        update_time: {
            default: () => {
                return moment().format('YYYY-MM-DD HH:mm:ss')
            }
        },
        create_time: {
            default: () => {
                return moment().format('YYYY-MM-DD HH:mm:ss')
            },
            readonly: true
        }
    };

    init(...args){
        super.init(...args);
        this.tableName = 'panorama_info';
    }

}