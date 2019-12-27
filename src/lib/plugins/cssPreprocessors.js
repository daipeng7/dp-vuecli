/*
 * @Author:
 * @Date: 2019-12-23 15:11:20
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-25 10:40:30
 * @Description: 处理输出模版中的css预处理选项
 */
const fs = require('fs-extra');
const path = require('path');

module.exports = (options, creator) => {
	const { context, uiPath, answers, pkgJSON } = creator;
	const { value = false, selectType } = options;
	answers.cssPreprocessors = value;
	Object.assign(answers, { cssPreprocessors: value });
	if (!answers.cssPreprocessors) return;
	const deps = {
		sass: {
			sass: '1.23.7',
			'sass-loader': '8.0.0'
		  },
		'node-sass': {
			'node-sass': '4.12.0',
			'sass-loader': '8.0.0'
		},
		'dart-sass': {
			sass: '1.23.7',
			'sass-loader': '8.0.0'
		},
		less: {
			less: '3.0.4',
			'less-loader': '5.0.0'
		},
		stylus: {
			stylus: '0.54.7',
			'stylus-loader': '3.0.2'
		}
	};
	pkgJSON.devDependencies = {
		...pkgJSON.devDependencies,
		...deps[answers.cssPreprocessors]
	};
	const relativePath = `src/style`;

	fs.copySync(path.resolve(uiPath, path.join(relativePath, selectType)), path.resolve(context, relativePath));
};
