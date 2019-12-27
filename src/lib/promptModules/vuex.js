/*
 * @Author:
 * @Date: 2019-12-20 16:47:07
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-25 11:33:23
 * @Description: vuex的提示配置
 */
module.exports = cli => {
	cli.injectFeature({
	  name: 'Vuex',
	  value: 'vuex',
	  checked: true,
	  description: '使用集中存储管理应用程序状态',
	  link: 'https://vuex.vuejs.org/'
	});

	cli.onPromptComplete((answers, options) => {
		if (answers.features.includes('vuex')) {
			options.plugins.push({
				name: 'vuex',
				option: {
					value: true
				}
			});
		}
	});
};
