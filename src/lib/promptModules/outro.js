/*
 * @Author:
 * @Date: 2019-12-23 16:08:36
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-25 14:42:56
 * @Description: 创建结尾的提示配置
 */
module.exports = cli => {
	cli.injectPrompt({
		name: 'outro',
		type: 'list',
		message: '您希望在哪里放置Babel、ESLint等的配置？',
		default: 'files',
		choices: [
			{
				name: '在专用配置文件中',
				value: 'files'
			},
			{
				name: '在package.json中',
				value: 'pkg'
			}
		]
	});

	cli.injectPrompt({
		name: 'git',
		type: 'confirm',
		message: '版本管理工具:',
		choices: [
			{
				name: 'git',
				value: 'git',
				short: 'git'
			}
		]
	});

	cli.injectPrompt({
		name: 'packageManager',
		type: 'list',
		message: '包管理工具:',
		choices: [
			{
				name: 'npm',
				value: 'npm',
				short: 'npm'
			},
			{
				name: 'yarn',
				value: 'npm',
				short: 'npm'
			}
		]
	});

	cli.onPromptComplete((answers, options) => {
		options.useConfigFiles = answers.outro === 'files';
		options.plugins.push({
			name: 'outro',
			option: {
				value: answers.outro,
				git: answers.git,
				packageManager: answers.packageManager
			}
		});
	});
};
