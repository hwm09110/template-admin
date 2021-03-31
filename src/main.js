import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'

import http from './request'
import '@/common/viewerConfig'
import VueCropper from 'vue-cropper'

import 'iview/dist/styles/iview.css'
import '@/assets/css/reset.css'
import '@/assets/css/resetIview.css'
import '@/assets/css/common.css'

Vue.use(iView).use(VueCropper)
Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')