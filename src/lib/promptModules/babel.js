/*
 * @Author:
 * @Date: 2019-12-20 16:45:10
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-25 12:00:17
 * @Description: babel的提示配置
 */
module.exports = cli => {
	cli.injectFeature({
		name: 'Babel',
		value: 'babel',
		short: 'Babel',
		description: '一个 JavaScript 编译器',
		link: 'https://babeljs.io/',
		checked: true
	});

	cli.onPromptComplete((answers, options) => {
		options.plugins.push({
			name: 'babel',
			option: {
				value: answers.features.includes('babel')
			}
		});
	});
};
