<template>
	<view>
		<view class="goodslist" v-for="(item,index) in goodsList" :key="index" @click="gotoDetail(item)">
			<!-- 商品左侧图片 -->
			<view class="goodslist-left">
				<image :src="item.goods_small_logo || defaultImg" mode="widthFix"></image>
			</view>
			<!-- 商品右侧 -->
			<view class="goodslist-right">
				<!-- 文本 -->
				<view class="text">
					{{item.goods_name}}
				</view>
				<!-- 价格 -->
				<view class="price">
					￥{{item.goods_price.toFixed(2)}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// query参数对象
				queryData:{
					// 关键字
					query:'',
					// 分类id
					cid:'',
					// 页码
					pagenum: 1,
					// 每页的数据条数
					pagesize: 10
				},
				// 商品列表总数
				total:0,
				// 起节流作用，判断现在是否在发起数据请求
				isloading: false,
				// 商品信息列表
				goodsList:[],
				// 当没有获取到图片信息时的默认图片
				defaultImg:'https://bpic.588ku.com/element_origin_min_pic/19/11/20/a5a7dbafdbfdec9f9e70823578bc5467.jpg'
			};
		},
		onLoad(options) {
			this.queryData.query = options.query || ''
			this.queryData.cid = options.cateId || ''
			// console.log(this.queryData)
			
			this.getGoodsList()
		},
		methods:{
			// 获取商品信息列表
			async getGoodsList(stop){
				// 打开节流阀
				this.isloading = true
				// 请求数据
				const res = await uni.$http.get('/api/public/v1/goods/search',this.queryData)
				if(res.data.meta.status !== 200){
					return uni.$showMsg()
				}
	
				// 关闭节流阀
				this.isloading = false
				
				// 当检测到有回调函数stop()时调用他停止刷新
				stop && stop()
				
				this.total = res.data.message.total
				this.goodsList = [...this.goodsList,...res.data.message.goods]
			},
			// 跳转商品详情页
			gotoDetail(item){
				uni.navigateTo({
					url: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id
				})
			}
		},
		// 监听用户上拉触底事件
		onReachBottom(){
			// 判断商品列表是否加载完毕
			if(this.queryData.pagenum * this.queryData.pagesize >= this.total){
				return uni.$showMsg("所有商品加载完毕！")
			}
			// 判断现在是否在请求数据，防止用户来回滑动多次请求
			if(this.isloading === true) return
			this.queryData.pagenum += 1
			this.getGoodsList()
		},
		// 监听用户下拉刷新事件
		onPullDownRefresh(){
			// 初始化数据
			this.queryData.pagenum = 1
			this.total = 0
			this.goodsList = []
			this.isloading = false
			// 重新调用数据请求，并传递关闭刷新的回调函数
			this.getGoodsList(() => uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">
	.goodslist{
		display: flex;
		height: 210rpx;
		margin: 15rpx;
		border-bottom: 2rpx solid #cfcfcf;
		.goodslist-left{
			image{
				width: 190rpx;
			}
		}
		.goodslist-right{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 15rpx;
			.text{
				font-size: 13px;
			}
			.price{
				font-size: 17px;
				color:red;
			}
		}
	}
</style>
