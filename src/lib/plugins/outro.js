/*
 * @Author:
 * @Date: 2019-12-23 15:11:20
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-25 14:43:28
 * @Description: 处理输出模版中的结尾选项
 */
const fs = require('fs-extra');
const { updateFileSystemContent } = require('../../utils');
const path = require('path');
module.exports = (options, creator) => {
	const { context, answers, uiPath, pkgJSON } = creator;
	const { router, vuex } = answers;
	const baseConfigPath = path.resolve(context, './config/webpack.base.config.js');
	const pkgPath = path.resolve(context, './package.json');
	const mainPath = path.resolve(context, './src/main.js');

	const baseConfigContent = fs.readFileSync(baseConfigPath.replace(context, uiPath), 'utf8');
	const mainContent = fs.readFileSync(mainPath.replace(context, uiPath), 'utf8');
	const { git, packageManager } = options;
	answers.git = git;
	answers.packageManager = packageManager;
	// 替换webpack.base.config中的babel内容
	updateFileSystemContent(baseConfigContent, answers, baseConfigPath, fs);

	// 替换src/main.js中的内容
	updateFileSystemContent(mainContent, answers, mainPath, fs);

	// 输出package.json
	fs.writeJSONSync(pkgPath, pkgJSON, { spaces: '\t' });

	// 更具router和vuex输出对应文件
	fs.copySync(path.resolve(uiPath, './src/fetch'), path.resolve(context, './src/fetch'));
	if (vuex) fs.copySync(path.resolve(uiPath, './src/store'), path.resolve(context, './src/store'));

	if (router) {
		const storeAppContent = fs.readFileSync(path.resolve(uiPath, './src/store/app.js'), 'utf8');
		const fetchRequestContent = fs.readFileSync(path.resolve(uiPath, './src/fetch/request.js'), 'utf8');
		updateFileSystemContent(storeAppContent, answers, path.resolve(context, './src/store/app.js'), fs);
		updateFileSystemContent(fetchRequestContent, answers, path.resolve(context, './src/fetch/request.js'), fs);
	}
};
