/*
 * @Author:
 * @Date: 2019-12-23 15:11:20
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-27 11:13:59
 * @Description: 处理输出模版中的eslint选项
 */
const fs = require('fs-extra');
const path = require('path');

module.exports = (options, creator) => {
	const { context, answers, pkgJSON, uiPath } = creator;
	answers.eslint = options;
	if (!answers.eslint.value) return;
	// eslint设置
	const eslintJSON = require(path.resolve(uiPath, './.eslintrc.js'));
	if (answers.unitTest) {
		eslintJSON.env['jest/globals'] = true;
		eslintJSON.extends.push('plugin:jest/recommended');
		eslintJSON.rules['jest/no-jest-import'] = 'off';
		pkgJSON.devDependencies = {
			...pkgJSON.devDependencies,
			'eslint-plugin-jest': '23.1.1',
			'vue-jest': '3.0.5'
		};
	}

	// 规则类型配置
	if (answers.eslint.config === 'standard') {
		eslintJSON.extends.push('standard');
		pkgJSON.devDependencies = {
			...pkgJSON.devDependencies,
			'eslint-config-standard': '14.1.0',
			'eslint-plugin-standard': '4.0.1'
		};
	} else if (answers.eslint.config === 'airbnb') {
		eslintJSON.extends.push('airbnb-base');
		pkgJSON.devDependencies = {
			...pkgJSON.devDependencies,
			'eslint-config-airbnb-base': '14.0.0'
		};
	} else if (answers.eslint.config === 'prettier') {
		eslintJSON.extends.push('plugin:prettier/recommended');
		eslintJSON.rules = {
			...eslintJSON.rules,
			'prettier/prettier': 'error'
		};
		pkgJSON.devDependencies = {
			...pkgJSON.devDependencies,
			'eslint-config-prettier': '6.8.0',
			'eslint-plugin-prettier': '3.1.2'
		};
	}

	// 回调
	if (answers.eslint.lintOn && answers.eslint.lintOn.includes('commit')) {
		pkgJSON.husky = {
			hooks: {
				'pre-commit': 'lint-staged'
			}
		};
		pkgJSON['lint-staged'] = {
			'src/**/*.{js, vue, scss}': [
				'eslint',
				'git add'
			]
		};
		pkgJSON.devDependencies = {
			...pkgJSON.devDependencies,
			husky: '3.1.0',
			'lint-staged': '9.4.3'
		};
	}

	pkgJSON.devDependencies = {
		...pkgJSON.devDependencies,
		'babel-eslint': '10.0.3',
		eslint: '6.6.0',
		'eslint-friendly-formatter': '4.0.1',
		'eslint-loader': '3.0.2',
		'eslint-plugin-import': '2.18.2',
		'eslint-plugin-node': '10.0.0',
		'eslint-plugin-promise': '4.2.1',
		'eslint-plugin-vue': '6.0.1'
	};

	// 输出配置位置
	if (answers.useConfigFiles) {
		fs.writeFileSync(path.resolve(context, './.eslintrc.js'), `module.exports = ${JSON.stringify(eslintJSON, undefined, '\t')}`, { encoding: 'utf8' });
	} else pkgJSON.eslintConfig = eslintJSON;
};
