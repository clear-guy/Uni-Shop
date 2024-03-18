<template>
	<view class="search">
		<uni-search-bar :radius="100" :focus="true" :cancelButton="none" @input="input"></uni-search-bar>
		<!-- 搜索建议列表 -->
		<view class="search-list" v-if="searchList.length !== 0">
			<view class="search-item" v-for="(item,index) in searchList" :key="index"
				@click="gotoDetail(item.goods_id)">
				<view class="search-text">
					{{item.goods_name}}
				</view>
				<uni-icons type="right" size="20"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="search-history" v-else>
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="25" @click="clearHistory"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				<uni-tag :text="item" @click="gotoList(item)" v-for="(item,index) in historyList" :key="index"
					custom-style="background-color: #cfcfcf5c;color:#000;font-size:17px;border:none"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 延时器id
				time: 0,
				// 搜索内容
				searchValue: '',
				// 搜索建议列表
				searchList: [],
				// 搜索历史列表
				historyList: []
			};
		},
		methods: {
			input(e) {
				// 做节流处理
				clearTimeout(this.time)
				this.time = setTimeout(() => {
					this.searchValue = e
					this.getSearchList()
				}, 1000)
			},
			// 获取搜索建议列表
			async getSearchList() {
				if (this.searchValue.length === 0) {
					this.searchList = []
					return
				}
				const res = await uni.$http.get('/api/public/v1/goods/qsearch', {
					query: this.searchValue
				})
				if (res.data.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.searchList = res.data.message
				// 将数据添加到historyList中的首节点
				this.historyList.unshift(this.searchValue)
				// 去重，防止数据重复
				this.historyList = [...new Set(this.historyList)]
				// 将搜索历史存储到本地
				uni.setStorageSync("history", JSON.stringify(this.historyList))
			},
			// 跳转商品详情页
			gotoDetail(id) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?id=' + id
				})
			},
			// 跳转商品列表页
			gotoList(item){
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list'
				})
			},
			// 清空历史记录
			clearHistory() {
				this.historyList = []
				uni.removeStorageSync("history")
			}
		},
		onLoad() {
			// 进入页面获取本地存储里的历史记录
			this.historyList = JSON.parse(uni.getStorageSync('history') || "[]")
		}
	}
</script>

<style lang="scss">
	.search {
		background-color: #007AFF;
		position: sticky;
		top: 0;
		z-index: 999;

		.search-list {
			background-color: white;

			.search-item {
				line-height: 100rpx;
				border-bottom: 2rpx solid #cfcfcf;
				display: flex;
				justify-content: space-between;

				.search-text {
					padding-left: 20rpx;
					// 文字不允许换行
					white-space: nowrap;
					overflow: hidden;
					// 溢出的文字用...代替
					text-overflow: ellipsis;
				}
			}
		}

		.search-history {
			background-color: white;

			.history-title {
				display: flex;
				justify-content: space-between;
				border-bottom: 2rpx solid #cfcfcf;
				line-height: 100rpx;
				padding: 0 15rpx;
			}

			.history-list {
				display: flex;
				margin-top: 25rpx;
				padding: 5rpx 15rpx;

				.uni-tag {
					margin-left: 30rpx;
					padding: 0 30rpx;
				}
			}
		}
	}
</style>