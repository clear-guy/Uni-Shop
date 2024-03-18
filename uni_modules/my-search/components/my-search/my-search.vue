<template>
	<view class="my-search" @click="gotoSearch">
		<view class="my-search-content">
			<uni-icons type="search" size="20"></uni-icons>
			<text>搜索</text>
		</view>
	</view>
</template>
<script>
	export default{
		methods:{
			gotoSearch(){
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>
<style lang="scss">
	.my-search{
		background-color:#007AFF ;
		display: flex;
		justify-content: center;
		height:100rpx;
		.my-search-content{
			width:90%;
			height:80%;
			background-color: white;
			border-radius: 18px;
			display: flex;
			align-items: center;
			justify-content: center;
			text{
				margin-left:10rpx;
				font-size: 35rpx;
			}
		}
	}
</style>
