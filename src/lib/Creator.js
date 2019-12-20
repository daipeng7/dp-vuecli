/*
 * @Author: daipeng
 * @Date: 2019-12-20 11:12:12
 * @LastEditors: VSCode
 * @LastEditTime: 2019-12-20 11:21:10
 * @Description:
 */
const EventEmitter = require('events');

module.exports = class Creator extends EventEmitter {
	constructor() {
		super();
	}
};
