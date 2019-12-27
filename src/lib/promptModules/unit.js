/*
 * @Author:
 * @Date: 2019-12-20 16:45:28
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-24 15:28:20
 * @Description: 单元测试的提示配置
 */
module.exports = cli => {
	cli.injectFeature({
		name: '单元测试',
		value: 'unit',
		short: 'Unit',
		description: '增加单元测试功能，使用jest',
		link: 'https://cli.vuejs.org/config/#unit-testing',
		plugins: ['unit-jest', 'unit-mocha']
	});

	cli.injectPrompt({
		name: 'unit',
		when: answers => answers.features.includes('unit'),
		type: 'list',
		message: '单元测试工具:',
		choices: [
			{
				name: 'Jest',
				value: 'jest',
				short: 'Jest'
			}
		]
	});

	cli.onPromptComplete((answers, options) => {
		options.plugins.push({
			name: 'unitTest',
			option: {
				value: answers.unit
			}
		});
	});
};
