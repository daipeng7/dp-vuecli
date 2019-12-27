/*
 * @Author:
 * @Date: 2019-12-20 16:47:48
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-25 13:49:00
 * @Description: vue-router的提示配置
 */
const chalk = require('chalk');

module.exports = cli => {
	cli.injectFeature({
		name: 'Router',
		value: 'router',
		checked: true,
		description: '用动态页面构造应用程序',
		link: 'https://router.vuejs.org/'
	});

	cli.injectPrompt({
		name: 'mode',
		when: answers => answers.features.includes('router'),
		type: 'list',
		default: 'history',
		choices: [
			{
				name: 'history',
				value: 'history'
			},
			{
				name: 'hash',
				value: 'hash'
			}
		],
		message: `使用vue路由模式?如果为 history模式 ${chalk.yellow(`(因为时SPA项目，需要在服务器路由设置index指向)`)}`,
		description: `history模式使用HTML5 History API`,
		link: 'https://router.vuejs.org/guide/essentials/history-mode.html'
	});

	cli.onPromptComplete((answers, options) => {
		options.plugins.push({
			name: 'router',
			option: {
				value: answers.features.includes('router'),
				mode: answers.mode
			}
		});
	});
};
