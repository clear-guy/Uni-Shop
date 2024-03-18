<template>
	<view>
		<my-search></my-search>
		<view class="cate-all">
			<!-- 左侧 -->
			<scroll-view scroll-y="true" class="scroll-left" style="height: 100vh;">
				<view v-for="(item,index) in cateList" :key="index" :class="[index===active ? 'active'
					:'']" @click=changeActive(index)>
					{{item.cat_name}}
				</view>
			</scroll-view>
			<!-- 右侧 -->
			<scroll-view scroll-y="true" class="scroll-right" style="height: 100vh;" :scroll-top="scrollTop">
				<view v-for="(item,index) in cateLevel2" :key="index">
					<view class="cate-right-title">
						/{{item.cat_name}}/
					</view>
					<view class="cate-right-list">
						<view class="cate-right-item" v-for="(item1,index1) in item.children" @click="gotoGoodsList(index1)">
							<image :src="item1.cat_icon" mode="widthFix"></image>
							<text>{{item1.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 商品分类列表
				cateList: [],
				// 商品二级分类列表
				cateLevel2: [],
				// 判断点到了左侧滑动的哪个view
				active: 0,
				// 滚动条距离顶部的位置
				scrollTop: 0
			};
		},
		onLoad() {
			this.getCateList()
		},
		methods: {
			async getCateList() {
				const res = await uni.$http.get('/api/public/v1/categories')
				if (res.data.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.cateList = res.data.message
				// 为商品二级分类列表赋初值
				this.cateLevel2 = res.data.message[0].children
			},
			// 通过点击改变active的值
			changeActive(index) {
				this.active = index
				// 当active改变时给二级分类列表也重新赋值
				this.cateLevel2 = this.cateList[index].children
				
				// 给scrollTop赋值，让其每次改变active后重新回到顶部
				this.scrollTop = this.scrollTop === 0?1:0 //scrollTop初值为0，当再次给他赋值为0时不会生效，所以加一个判断
			},
			// 跳转到商品列表页
			gotoGoodsList(index1) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cateId=' + index1
				})
			}
		}
	}
</script>

<style lang="scss">
	.cate-all {
		display: flex;

		.scroll-left {
			width: 320rpx;

			view {
				line-height: 120rpx;
				background-color: #F7F7F7;
				text-align: center;
			}

			.active {
				background-color: #FFFFFF;
				position: relative;

				&::before {
					content: ' ';
					display: block;
					width: 8rpx;
					height: 80rpx;
					background-color: #2ad5ff;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}

		.scroll-right {
			background: white;

			.cate-right-title{
				color:#2ad5ff;
				text-align: center;
				font-weight: bold;
				padding: 15rpx 0;
			}
			.cate-right-list {
				display: flex;
				flex-wrap: wrap;

				.cate-right-item {
					width: 33.3%;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;
					margin-bottom:20rpx;

					image {
						width: 120rpx;
					}

					text {
						font-size: 20rpx;
					}
				}
			}
		}
	}
</style>