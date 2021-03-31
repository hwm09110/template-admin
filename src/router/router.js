import Vue from 'vue'
import Router from 'vue-router'
import sotre from '../store'

import Base from '../components/layout/Base'
import Base2 from '../components/layout2/Base'
import passport from './passport'
import Index from '../pages/home/Index'
import Error from '../pages/Error'

Vue.use(Router)

// webpack导入各个模块的路由
let requireRouteFilePaths = require.context('./', true, /^.\/.*\/.*\.js$/)
console.log('requireRouteFilePaths.keys()', requireRouteFilePaths.keys())
let modulesRoutes = requireRouteFilePaths
	.keys()
	.filter((pathItem) => !pathItem.includes('passport'))
	.map((routeFilePath) => requireRouteFilePaths(routeFilePath)['default'])
	.reduce((prev, next) => prev.concat(next), [])

console.log('modulesRoutes', modulesRoutes)

const router = new Router({
	// mode: 'history',
	routes: [
		{
			path: '/',
			name: 'root',
			redirect: { name: 'index' }
		},
		{
			path: '/index',
			name: 'index',
			component: Index,
			meta: { title: '管理系统-首页' }
		},
		...passport,
		{
			path: '/base',
			name: 'base',
			component: sotre.state.layoutMode == '1' ? Base : Base2,
			children: [...modulesRoutes]
		},
		{
			path: '*',
			name: '404',
			component: Error,
			meta: { title: '404' }
		}
	],
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	}
})

export default router
