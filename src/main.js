import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ViewUI from 'view-design'

import http from './request'
import '@/common/viewerConfig'

import 'view-design/dist/styles/iview.css'
import '@/assets/css/reset.css'
import '@/assets/css/resetIview.css'
import '@/assets/css/common.css'

Vue.use(ViewUI)
Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app')
