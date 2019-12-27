/*
 * @Author:
 * @Date: 2019-12-20 16:47:37
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-25 12:00:53
 * @Description: css预编译的提示配置
 */
module.exports = cli => {
	cli.injectFeature({
		name: 'CSS 预编译',
		value: 'cssPreprocessor',
		checked: true,
		description: '支持CSS预编译，如 Sass, Less or Stylus',
		link: 'https://cli.vuejs.org/guide/css.html'
	});

	cli.injectPrompt({
		name: 'cssPreprocessor',
		when: answers => answers.features.includes('cssPreprocessor'),
		type: 'list',
		message: `请选择css预编译类型(推荐dart-sass)`,
		description: `(默认支持 PostCSS, Autoprefixer and CSS Modules).`,
		default: 'dart-sass',
		choices: [
			{
				name: 'Sass/SCSS (with dart-sass)',
				value: 'dart-sass'
			},
			{
				name: 'Sass/SCSS (with node-sass)',
				value: 'node-sass'
			},
			{
				name: 'Less',
				value: 'less'
			},
			{
				name: 'Stylus',
				value: 'stylus'
			}
		]
	});
	const list = ['dart-sass', 'node-sass', 'less', 'stylus'];
	const types = ['sass', 'less', 'stylus'];
	cli.onPromptComplete((answers, options) => {
		options.plugins.push({
			name: 'cssPreprocessors',
			option: {
				value: answers.cssPreprocessor || false,
				list,
				types,
				selectType: types.find(item => answers.cssPreprocessor.match(new RegExp(item)))
			}
		});
	});
};
