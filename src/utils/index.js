/*
 * @Author: daipeng
 * @Date: 2019-12-20 11:38:42
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-20 15:06:45
 * @Description: 工具集
 */
[
	'logger',
	'spinner'
].forEach(m => {
	Object.assign(exports, require(`./${m}`));
});
