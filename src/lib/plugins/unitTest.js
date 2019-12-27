/*
 * @Author:
 * @Date: 2019-12-23 15:11:20
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-25 15:22:14
 * @Description: 处理输出模版中的单元测试选项
 */
const fs = require('fs-extra');
const path = require('path');

module.exports = (options, creator) => {
	const { context, answers, pkgJSON } = creator;
	answers.unitTest = options.value;
	// 单元测试
	if (answers.unitTest) {
		const jestConfig = {
			collectCoverageFrom: [
			  '<rootDir>/src/**/__tests__/**/*.{js,ts,vue}',
			  '<rootDir>/src/**/?(*.)(spec|test).{js,ts,vue}'
			],
			testMatch: [
			  '<rootDir>/src/**/__tests__/**/*.{js,ts,vue}',
			  '<rootDir>/src/**/?(*.)(spec|test).{js,ts,vue}'
			],
			transform: {
			  '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
			  '^.+\\.(js|ts)$': '<rootDir>/node_modules/babel-jest',
			  '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
			},
			snapshotSerializers: [
			  'jest-serializer-vue'
			],
			moduleNameMapper: {
			  '^@/(.*)$': '<rootDir>/src/$1',
			  '^@/(.*)\\.(css|less|scss|sss|styl|jpg|jpeg|png|svg)': 'identity-obj-proxy',
			  '\\.(css|less|scss|sss|styl|jpg|jpeg|png|svg)$': 'identity-obj-proxy'
			},
			moduleFileExtensions: [
			  'js',
			  'json',
			  'vue'
			]
		};
		pkgJSON.scripts.test = 'jest --verbose';
		pkgJSON.devDependencies = {
			...pkgJSON.devDependencies,
			'babel-jest': '24.9.0',
			jest: '24.9.0',
			'jest-serializer-vue': '2.0.2',
			'jest-transform-stub': '2.0.0',
			'identity-obj-proxy': '3.0.0'
		};
		if (answers.useConfigFiles) fs.writeFileSync(path.resolve(context, './jest.config.js'), `module.exports = ${JSON.stringify(jestConfig, undefined, '\t')}`, { encoding: 'utf8' });
		else pkgJSON.jest = jestConfig;
	}
};
