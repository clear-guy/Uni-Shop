export default{
	namespaced: true,
	state: () => ({
		address:JSON.parse(uni.getStorageSync('address') || '{}')
	}),
	mutations:{
		updateAddress(state,suc){
			state.address = suc
			// 本地存储
			uni.setStorageSync('address', JSON.stringify(state.address))
		}
	},
	getters:{
	}
}