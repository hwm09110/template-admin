import * as types from './mutations-type'
import http from '@/request'

const leftNavList = [
	{
		text: '基本功能',
		name: 'bannermage',
		icon: 'ios-photos-outline',
		role: [],
		secondNav: [
			{
				text: '首页轮播',
				name: 'bannermage',
				icon: 'ios-photos-outline'
			}
		]
	}
]

//获取左边导航列表
const getLeftNavList = ({ commit, state }) => {
	if (state.leftNavList.length > 0) return state.leftNavList
	commit(types.SET_LEFTNAVLIST, leftNavList)
}

//清除store下面的所有state
const clearAllState = ({ commit }) => {
	commit(types['SET_STATERESET'])
}

//维持登录态
const setKeepAlive = () => {
	const time = 10 * 60 * 1000 //十分钟
	let timer = setInterval(() => {
		http.keepAlive()
	}, time)
}

export default {
	getLeftNavList,
	setKeepAlive,
	clearAllState
}
