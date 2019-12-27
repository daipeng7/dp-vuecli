/*
 * @Author:
 * @Date: 2019-12-23 15:11:20
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-25 13:46:28
 * @Description: 处理输出模版中的router选项
 */
const fs = require('fs-extra');
const path = require('path');
const { updateFileSystemContent } = require('../../utils');

module.exports = (options, creator) => {
	const { context, answers, pkgJSON, uiPath } = creator;
	answers.router = options.value;
	if (!answers.router) return;
	answers.routerMode = options.mode;
	const routerRelativePath = './src/router';
	const routerIndexContent = fs.readFileSync(path.resolve(uiPath, routerRelativePath, 'index.js'), 'utf8');
	fs.copySync(path.resolve(uiPath, routerRelativePath), path.resolve(context, routerRelativePath));
	updateFileSystemContent(routerIndexContent, answers, path.resolve(context, routerRelativePath, 'index.js'), fs);

	pkgJSON.dependencies = {
		...pkgJSON.dependencies,
		'vue-router': '3.1.3'
	};
};
