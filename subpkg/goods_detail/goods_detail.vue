<template>
	<view v-if="goods_info.goods_name" class="goods-detail-all">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in goods_info.pics" :key="index" @click="preview(index)">
				<image :src="item.pics_big"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="price">
				￥{{goods_info.goods_price}}
			</view>
			<!-- 信息主题区域 -->
			<view class="goods-info-main">
				<!-- 商品名称 -->
				<view class="goods-name">
					{{goods_info.goods_name}}
				</view>
				<!-- 收藏 -->
				<view class="save">
					<uni-icons type="star" size="30"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">
				快递：免运费
			</view>
		</view>
		<!-- 商品详情信息 -->
		<view class="goods-detail">
			<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		</view>
		<!-- 商品导航栏 -->
		<view class="nav">
			<uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick"/>
		</view>
		
	</view>
</template>

<script>
	import {mapMutations, mapGetters} from 'vuex'
	export default {
		data() {
			return {
				// 商品详情对象
				goods_info: {},
				// 商品导航栏参数
				options: [{
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "white"
				}, {
					icon: 'cart',
					text: '购物车',
					infoBackgroundColor: '#007aff',
					infoColor: "white"
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, rgb(30, 131, 255), rgb(0, 83, 184))',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, rgb(96, 243, 255), rgb(8, 143, 235))',
						color: '#fff'
					}
				]
			};
		},
		onLoad(options) {
			this.getGoodsInfo(options.goods_id)
		},
		methods: {
			// 把store里面的cart中的addCart方法引入
			...mapMutations('cart',['addCart']),
			
			// 获取商品详情对象信息
			async getGoodsInfo(goods_id) {
				const res = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (res.data.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.goods_info = res.data.message
			},

			// 预览图片
			preview(index) {
				// uni自带的API，作用是预览图片
				uni.previewImage({
					current: index,
					// 获取goods_info里pics对象里的pics_big数据并返回一个新数组给urls
					urls: this.goods_info.pics.map(item => item.pics_big)
				})
			},
			
			// 跳转到购物车
			onClick(e){
				if(e.content.text === "购物车"){
					uni.switchTab({
						url: "/pages/cart/cart"
					})
				}
			},
			// 加入购物车
			buttonClick(e){
				if(e.content.text = "加入购物车"){
					// 组织商品信息对象
					const goods = {
						goods_id: this.goods_info.goods_id  ,// 商品id
						goods_name: this.goods_info.goods_name ,// 商品名称
						goods_price: this.goods_info.goods_price ,// 商品价格
						goods_count: 1, // 商品数量
						goods_small_logo: this.goods_info.goods_small_logo ,// 商品图片
						goods_state: false // 商品勾选状态
					}
					this.addCart(goods)
				}
			}
		},
		computed:{
			// 把getters里面的total计算方法引入
			...mapGetters('cart',['total']),
		},
		watch:{
			// 深度监听
			total:{
				handler(newval){
					const findResult = this.options.find(item => item.text === '购物车')
					if(findResult){
						findResult.info = newval
					}
				},
				immediate: true
			}
		}
	}
</script>

<style lang="scss">
	.goods-detail-all{
		padding-bottom:100rpx;
		swiper {
			height: 750rpx;
		
			image {
				width: 100%;
				height: 100%;
			}
		}
		
		.goods-info-box {
			padding: 0 30rpx;
		
			.price {
				color: red;
				font-size: 40rpx;
				margin: 20rpx 0;
			}
		
			.goods-info-main {
				display: flex;
		
				.goods-name {
					width: 80%;
					padding-right: 25rpx;
					border-right: 2rpx solid #cfcfcf;
				}
		
				.save {
					width: 20%;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					text-align: center;
				}
			}
		
			.yf {
				color: #afafaf;
				font-size: 20rpx;
				margin-top: 30rpx;
			}
		}
		
		.goods-detail {
			margin-top: 40rpx;
		}
		.nav{
			width: 100%;
			z-index: 999;
			position: fixed;
			bottom:0;
		}
	}
</style>