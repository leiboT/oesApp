// 此common模块当前仅为测试
// 其他业务模块可参考此模块的结构
const state = () => ({
	items: []
})

// getters
const getters = {
	cartProducts: (state, getters, rootState) => {
		return state.items.map(({
			id,
			quantity
		}) => {
			const product = rootState.products.all.find(product => product.id === id)
			return {
				title: product.title,
				price: product.price,
				quantity
			}
		})
	},

	cartTotalPrice: (state, getters) => {
		return getters.cartProducts.reduce((total, product) => {
			return total + product.price * product.quantity
		}, 0)
	}
}

// mutations
const mutations = {
	setCartItems(state, {
		items
	}) {
		state.items = items
	}
}

// actions
const actions = {
	checkout({
		commit,
		state
	}, payload) {
		uni.showActionSheet({
			itemList: [
				"aaaaaa",
				"bbbbb"
			]
		})
		commit('setCartItems', {
			items: []
		})
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
