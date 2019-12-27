/*
 * @Author:
 * @Date: 2019-12-20 16:45:10
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-24 15:00:40
 * @Description: 使用dll提示配置
 */
module.exports = cli => {
	cli.injectFeature({
		name: 'DLL',
		value: 'dll',
		short: 'dll',
		description: '使用webpack.dllPlugin',
		link: 'https://webpack.js.org/plugins/dll-plugin',
		checked: true
	});

	cli.onPromptComplete((answers, options) => {
		options.plugins.push({
			name: 'dll',
			option: {
				value: answers.features.includes('dll')
			}
		});
	});
};
