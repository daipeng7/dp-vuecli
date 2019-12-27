/*
 * @Author:
 * @Date: 2019-12-20 11:38:42
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-20 17:54:58
 * @Description: 工具集
 */
[
	'logger',
	'spinner',
	'tool'
].forEach(m => {
	Object.assign(exports, require(`./${m}`));
});
