import * as types from './mutations-type'

export default {
	[types.SET_LEFTNAVLIST](state, navList) {
		state.leftNavList = navList
	},
	[types.SET_STATERESET](state) {
		for (var p in state) {
			if (Array.isArray(state[p])) {
				state[p] = []
			} else if (typeof state[p] === 'string') {
				state[p] = ''
			}
		}
	}
}
