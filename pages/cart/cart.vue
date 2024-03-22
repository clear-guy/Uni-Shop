<template>
	<view>
		<!-- 购物车 -->
		<view v-if="cart.length > 0">
			<!-- 收货地址区域 -->
			<my-address></my-address>
			<!-- 标题区域 -->
			<view class="cart-title">
				<uni-icons type="shop" size="30"></uni-icons>
				<text>购物车</text>
			</view>
			<!-- 商品列表区域 -->
			<view class="cart-goods-list">
				<uni-swipe-action>
					<view class="cart-goods-item" v-for="(item,index) in cart" :key="index">
						<uni-swipe-action-item :right-options="options" @click="onClick(index)">
							<!-- 左侧 -->
							<view class="left">
								<radio color="#007aff" :checked="item.goods_state" @click="changeChecked(index)"></radio>
								<image :src="item.goods_small_logo" mode=""></image>
							</view>
							<!-- 右侧 -->
							<view class="right">
								<view class="text">
									{{item.goods_name}}
								</view>
								<view class="right-bottom">
									<text>￥{{item.goods_price.toFixed(2)}}</text>
									<uni-number-box min="1" :value="item.goods_count" color="#fff" background="#007aff" width:60
										@change="event => changeCount(event,index)" />
								</view>
							</view>
						</uni-swipe-action-item>
					</view>
				</uni-swipe-action>
			</view>
			<!-- 结算区域 -->
			<my-settle></my-settle>
		</view>
		<!-- 空白购物车区域 -->
		<view class="blank" v-else>
			<image src="/static/blank/cart.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import mixBadge from '@/mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				options: [{
						text: '取消',
						style: {
							backgroundColor: '#007aff'
						}
					}]
				}
			},
			computed: {
					...mapState('cart', ['cart'])
				},
				methods: {
					// 导入更新状态，导入更新数量，导入删除
					...mapMutations('cart', ['updateCartState','updateCartCount','deleteCart']),
					// radio的点击事件，通过将cart内的goods_state状态取反达到来回切换checked
					changeChecked(index) {
						this.cart[index].goods_state = !this.cart[index].goods_state
						this.updateCartState(this.cart[index])
					},
					// 改变count值
					changeCount(e, index) {
						this.cart[index].goods_count = e
						this.updateCartCount(this.cart[index])
					},
					// 删除购物车的单个数据
					onClick(index){
						this.deleteCart(index)
					}
				},
				// 导入定义的给购物车添加数字徽标的方法
				mixins: [mixBadge],
				onLoad() {

				}
		}
</script>

<style lang="scss">
	.blank{
		width:100%;
		height:100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		image{
			margin-left:40rpx;
		}
	}
	.cart-title {
		display: flex;
		line-height: 100rpx;
		border-bottom: 2rpx solid #a6a6a6;

		text {
			padding-left: 20rpx;
			align-items: center;
		}
	}

	.cart-goods-list {
		padding-bottom:100rpx;
		.cart-goods-item {
			height: 250rpx;
			width: 100%;
			margin: 20rpx 0;
			padding-bottom: 20rpx;
			border-bottom: 2rpx solid #a6a6a6;
			.uni-swipe_text--center{
				display: flex;
			}
			.left {
				width: 42%;
				height: 100%;
				display: flex;
				padding-left: 15rpx;
				justify-content: center;

				radio {
					line-height: 250rpx;
				}

				image {
					height: 100%;
					width: 90%;
				}
			}

			.right {
				width: 58%;
				height: 100%;
				padding: 0 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.text {
					font-size: 30rpx;
				}

				.right-bottom {
					display: flex;
					justify-content: space-between;

					text {
						color: orangered;
						font-size: 40rpx;
					}
				}
			}
		}
	}
</style>