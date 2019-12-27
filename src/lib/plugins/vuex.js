/*
 * @Author:
 * @Date: 2019-12-23 15:11:20
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-25 11:44:37
 * @Description: 处理输出模版中的vuex选项
 */
const fs = require('fs-extra');
const path = require('path');

module.exports = (options, creator) => {
	const { context, answers, pkgJSON, uiPath } = creator;
	answers.vuex = options.value;
	pkgJSON.dependencies = {
		...pkgJSON.dependencies,
		vuex: '3.1.2'
	};
};
