<template>
	<!-- 结算组件 -->
	<view class="my-settle">
		<!-- 全选 -->
		<view class="choose">
			<radio color="#007aff" :checked="selected" @click="onClick"></radio>
			<text>全选</text>
		</view>
		<!-- 合计 -->
		<view class="sum">
			合计：
			<text>￥{{selectSum}}</text>
		</view>
		<!-- 结算 -->
		<view class="all">
			<button size="mini" @click="btnClick">结算({{selectNum}})</button>
		</view>
	</view>
</template>
<script>
	import {mapGetters, mapMutations} from 'vuex'
	export default{
		data(){
			return{
				// 判断全选按钮是否被选中
				selected:false
			}
		},
		methods:{
			...mapMutations('cart',['allSelect']),
			onClick(){
				this.selected = !this.selected
				this.allSelect(this.selected)
			},
			btnClick(){
				uni.$showMsg('穷鬼，你买不起')
			}
		},
		computed:{
			...mapGetters('cart',['selectSum']),
			...mapGetters('cart',['selectNum'])
		}
	}
</script>
<style lang="scss">
	.my-settle {
		width: 100%;
		z-index: 999;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;

		.sum{
			line-height: 100rpx;
			font-size: 30rpx;
			text{
				color:red;
			}
		}
		
		.all{
			button{
				background-color:#007aff;
				color:#fff;
			}
		}
		
		.choose{
			font-size: 30rpx;
		}
	}
</style>