export default{
	namespaced: true,
	state: () => ({
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	mutations:{
		// 添加到购物车
		addCart(state,goods){
			const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
			if(findResult){
				findResult.goods_count++
			}else{
				state.cart.push(goods)
			}
			
			// 本地存储
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 更新状态
		updateCartState(state,goods){
			const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
			if(findResult){
				findResult.goods_state = goods.goods_state
			}
			// 本地存储
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 更新数量
		updateCartCount(state,goods){
			const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
			if(findResult){
				findResult.goods_count = goods.goods_count
			}
			// 本地存储
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 删除数据
		deleteCart(state,index){
			if(state.cart.length >= index){
				state.cart.splice(index,1)
			}
			// 本地存储
			uni.setStorageSync('cart', JSON.stringify(state.cart))
			
		},
		
		//全选
		allSelect(state,selected){
			state.cart.forEach(item => item.goods_state = selected)
		}
	},
	getters:{
		// 计算购物车总数
		total(state){
			let sum = 0
			state.cart.forEach(item => sum += item.goods_count)
			return sum
		},
		// 计算被选中的总价
		selectSum(state){
			let sum = 0
			state.cart.forEach(item => {
				if(item.goods_state){
					sum += item.goods_count * item.goods_price
				}
			})
			return sum
		},
		// 计算被选择的数量
		selectNum(state){
			let sum = 0
			state.cart.forEach(item => {
				if(item.goods_state){
					sum += item.goods_count
				}
			})
			return sum
		}
	}
}