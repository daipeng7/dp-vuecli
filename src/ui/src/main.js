/*
 * @Author:
 * @Date: 2018-09-03 11:29:10
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-25 13:52:58
 * @Description: 应用入口文件
 */
import Vue from 'vue';
import { initGlobal } from '@/global';
import { initDirective } from '@/directives';
import { initFilter } from '@/filters';
import { initPlugin } from '@/plugins';
<%if(router) {%>import { initRouter } from '@/router';<%}%>
<%if(vuex) {%>import { initStore } from '@/store';<%}%>

import '@/style/<%= cssPreprocessors.match('sass') ? '_index.scss' : ('index.' + cssPreprocessors) %>';

initGlobal(Vue);
initDirective(Vue);
initFilter(Vue);
initPlugin(Vue);

<%if(router) {%>// 暴露路由对象，可以在其他地方使用方便控制跳转方法，比如请求拦截器等
export const router = initRouter(Vue);<%}%>
<%if(vuex) {%>// 暴露store对象，可以在其他地方使用store方法
export const store = initStore(Vue);<%}%>

new Vue({
	<%if(router) {%>router,<%}%>
	<%if(vuex) {%>store,<%}%>
	template: '<router-view></router-view>'
}).$mount('#app');
