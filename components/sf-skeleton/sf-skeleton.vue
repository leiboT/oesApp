<template>
	<view class="sf-skeleton" style="height: 100%;">
		<slot></slot>
		<skeleton :loading="loading" :animation="animation" :elColor="elColor" :bgColor="bgColor" :borderRadius="borderRadius"></skeleton>
	</view>
</template>

<script>
	import skeleton from './base.vue'
	export default {
		name: "sfSkeleton",
		components: {
			skeleton
		},
		props: {
			// 需要渲染的元素背景颜色，十六进制或者rgb等都可以
			elColor: {
				type: String,
				default: '#e5e5e5'
			},
			// 整个骨架屏页面的背景颜色
			bgColor: {
				type: String,
				default: '#ffffff'
			},
			// 是否显示加载动画
			animation: {
				type: Boolean,
				default: false
			},
			// 圆角值，只对类名为sf-skeleton-fillet的元素生效，为数值，不带单位
			borderRadius: {
				type: [String, Number],
				default: "10"
			},
			// 是否显示骨架，true-显示，false-隐藏
			loading: {
				type: Boolean,
				default: true
			}
		},
	}
</script>

<style>
</style>
