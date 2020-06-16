import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import i18n from './i18n/index.js'
import request from './request/request.js'
import * as utlis from './utlis/index.js'

Vue.config.productionTip = false

Vue.prototype.$store = store

Vue.prototype.$sf = {
	t(path) {
		return i18n.t(path)
	},
	request: (options) => request.request(options),
	request_get: (options) => request.get(options),
	request_post: (options) => request.post(options),
	request_put: (options) => request.put(options),
	request_delete: (options) => request.delete(options),
	...utlis
}

App.mpType = 'app'

const app = new Vue({
	store,
	i18n,
	...App
})
app.$mount()
