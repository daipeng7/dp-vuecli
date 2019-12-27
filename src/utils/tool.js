/*
 * @Author:
 * @Date: 2019-12-20 17:53:50
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-24 15:42:40
 * @Description:
 */
const is = require('is-type-of');
const path = require('path');
const ejs = require('ejs');
const { execSync } = require('child_process');
let _hasGit;
/**
 * promise批量串行处理
 *
 * @param {array} [arr=[]]
 * @param {boolean} [isFinishWhenError=false] 为false不会因为单项错误中断串行执行，单项的rejected不抛出，直接放入fulfilled中捕获
 * @returns {promise}
 */
exports.promiseQueue = (arr = [], isFinishWhenError = false) => {
	if (!is.array(arr)) throw new TypeError('arr must is a array');
	return arr.reduce((nextPromise, currentPromise) => {
		return nextPromise.then(result => {
			if (is.promise(currentPromise)) {
				return currentPromise.then((res) => {
					result.push(res);
					return Promise.resolve(result);
				}).catch(err => {
					result.push(err);
					return isFinishWhenError ? Promise.reject(err) : Promise.resolve(result);
				});
			} else if (is.function(currentPromise)) {
				try {
					const r = currentPromise();
					result.push(r);
					return Promise.resolve(result);
				} catch (error) {
					result.push(error);
					return isFinishWhenError ? Promise.reject(error) : Promise.resolve(result);
				}
			} else throw new TypeError('item must is a function or a promiseFunction');
		});
	}, Promise.resolve([]));
};

exports.hasGit = () => {
	if (process.env.VUE_CLI_TEST) {
	  return true;
	}
	if (_hasGit != null) {
	  return _hasGit;
	}
	try {
	  execSync('git --version', { stdio: 'ignore' });
	  return (_hasGit = true);
	} catch (e) {
	  return (_hasGit = false);
	}
};

exports.resolve = dir => {
	return path.resolve(__dirname, '../', dir);
};

exports.updateFileSystemContent = (content, data, replacePath, fileSystem) => {
	fileSystem.outputFileSync(replacePath, ejs.render(content, data), { encoding: 'utf8' });
};
