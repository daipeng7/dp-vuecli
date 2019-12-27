/*
 * @Author:
 * @Date: 2019-12-20 11:12:12
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-27 11:14:27
 * @Description:
 */
const EventEmitter = require('events');
const inquirer = require('inquirer');
const path = require('path');
const chalk = require('chalk');
const execa = require('execa');
const PromptModuleAPI = require('./PromptModuleAPI');
const fs = require('fs-extra');
const { resolve, logWithSpinner, stopSpinner, log } = require('../utils');

module.exports = class Creator extends EventEmitter {
	constructor(name, context, promptModules, dirMode) {
		super();
		this.name = name;
		this.dirMode = dirMode;
		this.context = context;
		const { presetPrompt, featurePrompt } = this.getIntroPrompts();
		this.presetPrompt = presetPrompt; // 第一次提示
		this.featurePrompt = featurePrompt; // 功能提示列表
		this.injectedPrompts = []; // 注入的提示队列
		this.promptCompleteCbs = []; // 所有提示完后的回调队列
		this.run = this.run.bind(this);

		// 最后获取的结果
		this.answers = {
			plugins: []
		};
		this.templatePath = resolve('./template');
		this.uiPath = resolve('./ui');

		this.pkgJSON = fs.readJsonSync(resolve('./ui/package.json'));

		const promptAPI = new PromptModuleAPI(this);
		promptModules.forEach(m => m(promptAPI));
	}

	async create() {
		await this.startPrompt();
	}

	/**
	 * @description: 获取固定入口提示列表
	 * @return {object}
	 */
	getIntroPrompts() {
		const presetPrompt = {
			name: 'preset',
			type: 'list',
			message: `请选择设置模式:`,
			choices: [
				{
					name: '手动选择功能',
					value: 'features'
				}
			]
		};
		const featurePrompt = {
			name: 'features',
			type: 'checkbox',
			message: '选择你项目所需要的功能点:',
			choices: [],
			pageSize: 10
		};
		return {
			presetPrompt,
			featurePrompt
		};
	}

	/**
	 * @description: 获取需要提示的列表
	 * @return {array}
	 */
	getFinalPrompts() {
		this.injectedPrompts.forEach(prompt => {
			const originalWhen = prompt.when || (() => true);
			prompt.when = answers => {
				return originalWhen(answers);
			};
		});
		return [
			this.presetPrompt,
			this.featurePrompt,
			...this.injectedPrompts
		];
	}

	copyTemplateToTarget(target) {
		fs.copySync(this.templatePath, this.context);
	}

	/**
	 * @description: 开始搜集用户选择
	 */
	async startPrompt() {
		const promptList = this.getFinalPrompts();
		const _answers = await inquirer.prompt(promptList);
		_answers.features = _answers.features || [];
		this.promptCompleteCbs.forEach(cb => cb(_answers, this.answers));

		const { ok } = await inquirer.prompt([
			{
				name: 'ok',
				type: 'confirm',
				message: `确定使用当前配置创建项目?`
			}
		]);
		if (ok) await this.generateProject();
	}

	async generateProject() {
		log();
		log(`🚀  generating project ${chalk.yellow(this.name)} ...`);
		if (this.dirMode === 'overwrite') {
			fs.removeSync(this.context);
		}
		this.copyTemplateToTarget(this.context);
		this.executePlugins(this.answers.plugins);
		const { git, packageManager } = this.answers;
		if (git) {
			log();
			logWithSpinner(`🗃`, `Initializing git repository...`, `Initialize git repository completed`);
			await this.run('git', ['init']);
			stopSpinner();
		}
		if (packageManager) {
			log();
			logWithSpinner(`📦`, `Installing additional dependencies...`, `Install additional dependencies completed`);
			await this.run(packageManager, ['install']);
			stopSpinner();
		}
		log();
		log(`🎉  Successfully generated project ${chalk.yellow(this.name)}.`);
	}

	/**
	 * @description: 根据用户输入执行响应插件
	 * @param {array} 插件列表
	 */
	executePlugins(plugins) {
		plugins.forEach(plugin => {
			require(`./plugins/${plugin.name}`)(plugin.option, this);
		});
	}

	run(command, args) {
		if (!args) { [command, ...args] = command.split(/\s+/); }
		return execa(command, args, { cwd: this.context });
	}

	runSync(command, args) {
		if (!args) { [command, ...args] = command.split(/\s+/); }
		return execa.sync(command, args, { cwd: this.context });
	}
};
