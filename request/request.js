/**
 * 通用uni-app网络请求（基于 Promise）
 */

/*
// 开放的接口
http.request({url: 'user/list', method: 'POST', data: {}}).then((res)=>{
	console.log(JSON.stringify(res))
})
http.get({url: 'user/list'}).then((res)=>{
	console.log(JSON.stringify(res))
})
http.post({url: 'user/list', data: {}}).then((res)=>{
	console.log(JSON.stringify(res))
})
http.put({url: 'user/list', data: {}}).then((res)=>{
	console.log(JSON.stringify(res))
})
http.delete({url: 'user/list', data: {}}).then((res)=>{
	console.log(JSON.stringify(res))
})
*/

import {
	reqlog,
	reslog
} from './log.js'
import baseConfig from './config.js'
import {
	getUUID
} from '../utlis/index.js'

export default {
	config: {
		baseUrl: baseConfig.baseUrl,
		timeout: baseConfig.timeout,
		header: {},
		data: {},
		method: "GET",
		dataType: "json",
		responseType: "text",
		success() {},
		fail() {},
		complete() {}
	},
	request(options) {
		if (!options) {
			options = {}
		}

		// 选项取值
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = options.baseUrl + baseConfig.prefix + options.url
		options.data = options.data || {}
		options.method = options.method || this.config.method

		const hiddenLoading = options.hiddenLoading || baseConfig.hiddenLoading

		// 开启loading
		if (!hiddenLoading) uni.showLoading();

		// 请求头写入token
		const token = getUUID();
		const tokenHeader = token ? {
			token
		} : {};

		// 请求头合并
		options.header = Object.assign({}, this.config.header, tokenHeader, options.header)

		return new Promise((resolve, reject) => {
			let _config = null

			// 接口调用结束的回调函数（调用成功、失败都会执行）
			options.complete = (response) => {

				// 隐藏loading
				if (!hiddenLoading) uni.hideLoading();

				let statusCode = response.statusCode
				response.config = _config

				// 统一的响应日志记录
				reslog(response)

				if (statusCode === 200) { // 成功
					// 后台服务状态码
					const {
						StatusCode: _statusCode
					} = response.data;
					if (_statusCode === 401) { // 认证授权失败->跳出重新登录

					} else if (_statusCode === 405) { // 无权限

					} else {
						resolve(response);
					}
				} else {
					reject(response)
				}
			}

			// 选项合并
			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()

			// 统一的请求日志记录
			reqlog(_config)

			// 调用uni.request
			uni.request(_config);
		});
	},
	get(options) {
		if (!options) {
			options = {}
		}
		options.method = 'GET'
		return this.request(options)
	},
	post(options) {
		if (!options) {
			options = {}
		}
		options.method = 'POST'
		return this.request(options)
	},
	put(options) {
		if (!options) {
			options = {}
		}
		options.method = 'PUT'
		return this.request(options)
	},
	delete(options) {
		if (!options) {
			options = {}
		}
		options.method = 'DELETE'
		return this.request(options)
	}
}
