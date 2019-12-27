/*
 * @Author:
 * @Date: 2019-12-23 15:11:20
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-25 12:02:58
 * @Description: 处理输出模版中的dll打包选项
 */
const fs = require('fs-extra');
const path = require('path');
const { updateFileSystemContent } = require('../../utils');

module.exports = (options, creator) => {
	const { context, answers, uiPath } = creator;
	answers.useDll = options.value;
	if (!answers.cssPreprocessors) return;

	fs.copySync(path.resolve(uiPath, 'build/dll.js'), path.resolve(context, 'build/dll.js'));
	fs.copySync(path.resolve(uiPath, 'config/webpack.dll.config.js'), path.resolve(context, 'config/webpack.dll.config.js'));

	const devContent = fs.readFileSync(path.resolve(uiPath, 'build/dev.js'), { encoding: 'utf8' });
	const buildContent = fs.readFileSync(path.resolve(uiPath, 'build/build.js'), { encoding: 'utf8' });
	const utilsContent = fs.readFileSync(path.resolve(uiPath, 'build/utils.js'), { encoding: 'utf8' });

	updateFileSystemContent(devContent, answers, path.resolve(context, 'build/dev.js'), fs);
	updateFileSystemContent(buildContent, answers, path.resolve(context, 'build/build.js'), fs);
	updateFileSystemContent(utilsContent, answers, path.resolve(context, 'build/utils.js'), fs);
};
