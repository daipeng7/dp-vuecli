/*
 * @Author:
 * @Date: 2019-12-20 16:45:00
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-24 17:27:04
 * @Description: 提示组件
 */
exports.getPromptModules = () => {
	return [
		'babel',
		'cssPreprocessors',
		'router',
		'vuex',
		'unit',
		'linter',
		'dll',
		'outro'
	].map(file => require(`../promptModules/${file}`));
};
