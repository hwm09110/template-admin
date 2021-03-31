/**
 * 单一状态树
 * vuex 操作顺序：state.js -> mutations-type.js -> mutations.js -> getters.js
 */
const state = {
	layoutMode: '2', // 1:大屏模式 2:小屏模式
	systemName: '系统名称', //系统名称
	leftNavList: [], //左侧导航菜单
	topNavActive: '', //顶部 active 项
	leftNavOpen: [], //左侧导航菜单,展开项
	leftNavActive: null //左侧导航菜单 active 项
}

export default state
