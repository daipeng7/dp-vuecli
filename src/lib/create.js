/*
 * @Author: daipeng
 * @Date: 2019-12-20 11:03:49
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-20 15:12:45
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
		debugger;
		if (fs.pathExistsSync(dir)) {
			if (force) fs.removeSync(dir);
			else {
				await clearConsole();
				if (inCurrent) {
					const { ok } = await inquirer.prompt([
						{
							name: 'ok',
							type: 'confirm',
							message: `Generate project in current directory?`
						}
					]);
					if (!ok) return;
				} else {
					const { action } = await inquirer.prompt([
						{
							name: 'action',
							type: 'list',
							message: `Target directory ${chalk.cyan(dir)} already exists. Pick an action:`,
							choices: [
								{ name: 'Overwrite', value: 'overwrite' },
								{ name: 'Merge', value: 'merge' },
								{ name: 'Cancel', value: false }
							]
						}
					]);
					if (!action) return;
					else if (action === 'overwrite') {
						console.log(`\nRemoving ${chalk.cyan(dir)}...`);
						fs.removeSync(dir);
					}
				}
			}
		}

		if (repository) await downGitRepoPromise(repository, dir);
		else {
			const creator = new Creator(name, options);
		}
	} catch (error) {
		throw error;
	}
};

module.exports = create;
