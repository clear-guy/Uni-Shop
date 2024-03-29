
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'
// 按需导入 $http 对象
import { $http } from '@escook/request-miniprogram'

// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http

// 基地址
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

// 封装数据请求失败的弹窗
uni.$showMsg = function(title='数据请求失败'){
	uni.showToast({
		title,
		duration:1500,
		icon:'none'
	})
}

// 请求拦截器
$http.beforeRequest = function (options) {
  uni.showLoading({
  	title:"数据加载中....."
  })
}
// 响应拦截器
$http.afterRequest = function () {
  uni.hideLoading()
}

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$store = store
const app = new Vue({
	store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
	store
  }
}
// #endif