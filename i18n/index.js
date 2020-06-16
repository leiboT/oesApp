import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zhCN from './locale/zh-CN.js'
import en from './locale/en.js'

Vue.use(VueI18n)

const i18n = new VueI18n({
	locale: "zh-CN",
	fallbackLocale: 'zh-CN',
	messages: {
		"zh-CN": zhCN,
		en,
	}
})

export default i18n
