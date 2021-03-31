/**
 * 首页轮播
 */
import http from '../http'
import Qs from 'qs'

// 首页轮播列表
const getIndexBannerList = (params) => http.get('/banpai/Wf_Banner/getBannerList', { params }).then((res) => res.data)

// 添加轮播
const addIndexBanner = (params) => http.post('/banpai/wf_banner/add', Qs.stringify(params)).then((res) => res.data)

// 编辑轮播
const editIndexBanner = (params) => http.post('/banpai/wf_banner/edit', Qs.stringify(params)).then((res) => res.data)

// 删除轮播
const delIndexBanner = (params) => http.post('/banpai/wf_banner/del', Qs.stringify(params)).then((res) => res.data)

export default {
	getIndexBannerList,
	addIndexBanner,
	editIndexBanner,
	delIndexBanner,
}
