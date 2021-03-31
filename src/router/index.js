import router from './router'
import store from '../store'
import { setNavSate } from '@/utils/navHelper'

// 免登陆 route
const freeRouteList = ['login', 'forgetpwd', '404']

//全局前置导航守卫
router.beforeEach(async (to, from, next) => {
	// console.log('route from', from)
	// console.log('route to', to)
	let title = to.meta.title
	let routerName = to.name
	let isLogin = localStorage.getItem('isLogin')

	//进入每个页面先检查是否已登录
	if (title) {
		document.title = title
	}

	if (!freeRouteList.includes(routerName)) {
		if (isLogin) {
			await store.dispatch('getLeftNavList') // 拉取导航信息
			setNavSate(to.path)
			next()
		} else {
			//手动跳转到登录页时，title不会变化，因此手动更新title
			document.title = '登录'
			next({ name: 'login' })
		}
	} else {
		next()
	}
})

export default router
