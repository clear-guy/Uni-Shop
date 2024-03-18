<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-top">
			<my-search></my-search>
		</view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail'">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		
		<!-- 导航栏 -->
		<view class="nav">
			<view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClick(item)">
				<image :src="item.image_src"></image>
				<!-- <text>{{item.name}}</text> -->
			</view>
		</view>
		
		<!-- 楼层区域 -->
		<view class="floor">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 楼层图片 -->
				<view class="floor-img">
					<!-- 楼层左侧大图片 -->
					<navigator class="floor-img-left" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<!-- 楼层右侧小图片 -->
					<view class="floor-img-right">
						<navigator  v-for="(item1,index) in item.product_list" v-if="index !== 0" :url="item1.url">
							<image :src="item1.image_src" :style="{width:item1.image_width + 'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图数据列表
				swiperList: [],
				
				// 分类导航列表
				navList: [],
				
				// 楼层区域列表
				floorList: []
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods:{
			// 获取轮播图列表
			async getSwiperList(){
				const res = await uni.$http.get("/api/public/v1/home/swiperdata")
				if(res.data.meta.status!==200){
					return uni.$showMsg()
				}
				this.swiperList = res.data.message
			},
			// 获取导航栏列表
			async getNavList(){
				const res = await uni.$http.get('/api/public/v1/home/catitems')
				if(res.data.meta.status!==200){
					return uni.$showMsg()
				}
				this.navList = res.data.message
			},
			// 点击导航栏里的分类图片跳转
			navClick(item){
				if(item.name === '分类'){
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
			},
			// 获取楼层区域列表
			async getFloorList(){
				const res = await uni.$http.get('/api/public/v1/home/floordata')
				if(res.data.meta.status!==200){
					return uni.$showMsg()
				}
				// 对数据进行处理
				res.data.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
					})
				})
				
				this.floorList = res.data.message
			}
		}
	}
</script>

<style lang="scss">
	.search-top{
		position:sticky;
		top:0;
		z-index: 999; // 防止被轮播图覆盖
	}
	swiper{
		height:300rpx;
		width:100%;
		.swiper-item,image{
			width: 100%;
			height:100%;
		}
	}
	.nav{
		margin:20rpx 0;
		display: flex;
		justify-content: space-around;
		.nav-item{
			width: 25%;
			height:100%;
			text-align: center;
			image{
				width: 128rpx;
				height:140rpx;
			}
		}
	}
	.floor{
		.floor-img-left{
			padding-left: 10rpx;
		}
		.floor-title{
			width: 100%;
			height: 60rpx;
		}
		.floor-img{
			display: flex;
		}
		.floor-img-right{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	}
</style>
