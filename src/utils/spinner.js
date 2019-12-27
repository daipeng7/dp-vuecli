/*
 * @Author:
 * @Date: 2019-12-20 11:37:59
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-25 16:44:02
 * @Description:
 */
const ora = require('ora');
const chalk = require('chalk');

const spinner = ora({
	spinner: {
		interval: 100,
		frames: [
			'🕛',
			'🕐',
			'🕑',
			'🕒',
			'🕓',
			'🕔',
			'🕕',
			'🕖',
			'🕗',
			'🕘',
			'🕙',
			'🕚'
		]
	}
});
let lastMsg = null;
let isPaused = false;

exports.logWithSpinner = (symbol, msg, stopText) => {
	if (!msg) {
		msg = symbol;
		symbol = chalk.green('✔');
	}
	if (lastMsg) {
		spinner.stopAndPersist({
			symbol: lastMsg.symbol,
			text: lastMsg.stopText || lastMsg.text
		});
	}
	spinner.text = ' ' + msg;
	lastMsg = {
		symbol: symbol + ' ',
		text: msg,
		stopText
	};
	spinner.start();
};

exports.stopSpinner = (persist) => {
	if (lastMsg && persist !== false) {
		spinner.stopAndPersist({
			symbol: lastMsg.symbol,
			text: lastMsg.stopText || lastMsg.text
		});
	} else {
		spinner.stop();
	}
	lastMsg = null;
};

exports.pauseSpinner = () => {
	if (spinner.isSpinning) {
		spinner.stop();
		isPaused = true;
	}
};

exports.resumeSpinner = () => {
	if (isPaused) {
		spinner.start();
		isPaused = false;
	}
};

exports.failSpinner = (text) => {
	spinner.fail(text);
};
