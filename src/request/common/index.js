/**
 * 公共接口
 */
import http from '../http'
import Qs from 'qs'

// 登录接口
const doLogin = (params) => http.post('/banpai/wf_qx/login', Qs.stringify(params)).then((res) => res.data)

export default {
	doLogin,
}
