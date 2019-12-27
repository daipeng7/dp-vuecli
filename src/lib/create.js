/*
 * @Author:
 * @Date: 2019-12-20 11:03:49
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-24 14:44:26
 * @Description:
 */

const path = require('path');
const fs = require('fs-extra');
const ora = require('ora');
const chalk = require('chalk');
const ejs = require('ejs');
const inquirer = require('inquirer');
const downloadGitRepo = require('download-git-repo');
const { clearConsole } = require('../utils');
const Creator = require('./Creator');
const { getPromptModules } = require('./promptModules');

const downGitRepoPromise = (url, to) => {
	return new Promise((resolve, reject) => {
		downloadGitRepo(`direct:${url}`, to, { clone: true }, function (err) {
			if (err) reject(err);
			else resolve();
		});
	});
};

const create = async (name, options) => {
	try {
		let { dir, repository, force } = options;
		const inCurrent = name === '.';
		dir = dir ? path.join(process.cwd(), dir) : process.cwd();
		dir = path.resolve(dir, name);
		let dirMode = false;
		if (fs.pathExistsSync(dir)) {
			if (force) fs.removeSync(dir);
			else {
				await clearConsole();
				if (inCurrent) {
					const { ok } = await inquirer.prompt([
						{
							name: 'ok',
							type: 'confirm',
							message: `确定在当前目录创建项目?`
						}
					]);
					if (!ok) return;
				} else {
					const { action } = await inquirer.prompt([
						{
							name: 'action',
							type: 'list',
							message: `${chalk.cyan(dir)} 已经存在, 请选择:`,
							choices: [
								{ name: '覆盖', value: 'overwrite' },
								{ name: '合并', value: 'merge' },
								{ name: '取消', value: false }
							]
						}
					]);
					if (!action) return;
					else dirMode = action;
				}
			}
		}

		if (repository) await downGitRepoPromise(repository, dir);
		else {
			const creator = new Creator(name, dir, getPromptModules(), dirMode);
			creator.create();
		}
	} catch (error) {
		throw error;
	}
};

module.exports = create;
