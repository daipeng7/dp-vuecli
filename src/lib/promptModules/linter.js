/*
 * @Author:
 * @Date: 2019-12-20 16:45:50
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-25 17:02:51
 * @Description: eslint的提示配置
 */
module.exports = cli => {
	const chalk = require('chalk');
	const { hasGit } = require('../../utils');

	cli.injectFeature({
		name: 'Linter / Formatter',
		value: 'linter',
		short: 'Linter',
		description: '使用ESLint或Prettier检查并提升代码质量',
		link: 'https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint',
		plugins: ['eslint'],
		checked: true
	});

	cli.injectPrompt({
		name: 'eslintConfig',
		when: answers => answers.features.includes('linter'),
		type: 'list',
		message: '请选择 linter / formatter 配置:',
		description: '建议检查代码错误并强制使用相同的代码样式.',
		choices: answers => [
			{
				name: 'ESLint + Standard',
				value: 'standard',
				short: 'Standard'
			},
			{
				name: 'ESLint + Airbnb',
				value: 'airbnb',
				short: 'Airbnb'
			},
			{
				name: 'ESLint + Prettier',
				value: 'prettier',
				short: 'Prettier'
			}
		]
	});

	cli.injectPrompt({
		name: 'lintOn',
		message: '选择其他Linter功能:',
		when: answers => answers.features.includes('linter'),
		type: 'checkbox',
		choices: [
			{
				name: '保存时自动格式化',
				value: 'save'
			},
			{
				name: '在Git提交时格式化' + (hasGit() ? '' : chalk.red(' (需要初始化 Git)')),
				value: 'commit'
			}
		]
	});

	cli.onPromptComplete((answers, options) => {
		options.plugins.push({
			name: 'linter',
			option: {
				value: answers.features.includes('linter'),
				config: answers.eslintConfig,
				lintOn: answers.lintOn || []
			}
		});
	});
};
