/*
 * @Author:
 * @Date: 2019-12-23 15:11:20
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-25 12:01:58
 * @Description: 处理输出模版中的babel选项
 */
const fs = require('fs-extra');
const path = require('path');

module.exports = (options, creator) => {
	const { context, answers, pkgJSON } = creator;
	const babelConfigFilePath = path.resolve(context, './.babelrc');
	answers.useBabel = options.value;
	if (!answers.useBabel) return;
	// 处理babel配置
	const babelConfig = {
		presets: [
			[
				'@babel/preset-env',
				{
					modules: false,
					targets: {
						browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
					}
				}
			]
		],
		env: {
			test: {
				presets: [['@babel/preset-env', { targets: { node: 'current' } }]]
			}
		},
		plugins: [
			'@babel/plugin-syntax-dynamic-import',
			'@babel/external-helpers',
			'@babel/plugin-transform-runtime'
		]
	};
	pkgJSON.devDependencies = {
		...pkgJSON.devDependencies,
		'@babel/core': '7.7.2',
		'@babel/plugin-external-helpers': '7.2.0',
		'@babel/plugin-syntax-dynamic-import': '7.2.0',
		'@babel/plugin-transform-runtime': '7.6.2',
		'@babel/preset-env': '7.7.1',
		'@babel/runtime': '7.7.2',
		'babel-loader': '8.0.6',
		'babel-plugin-component': '1.1.1'
	};
	if (answers.useConfigFiles) fs.writeJsonSync(babelConfigFilePath, babelConfig, { spaces: '\t' });
	else pkgJSON.babel = babelConfig;
};
