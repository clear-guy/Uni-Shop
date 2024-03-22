<template>
	<view class="my-address">
		<!-- 新建收货地址按钮 -->
		<view class="button" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" @click="chooseAddress">请选择收货地址+</button>
		</view>
		
		<!-- 渲染收货地址 -->
		<view class="my-address-info" v-else>
			<view class="top">
				<view class="user">
					<view>收货人：{{address.userName}}</view>
				</view>
				<view class="phone">
					<view>电话：{{address.telNumber}}</view>
					<uni-icons type="right" size="14"></uni-icons>
				</view>
			</view>
			<view class="bottom">
				<view class="address">
					收货地址：{{address.provinceName + address.cityName + address.countyName + address.detailInfo}}
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {mapMutations, mapState} from 'vuex'
	export default{
		data(){
			return{
				// 存储收货地址
				// address:[]
			}
		}, 
		methods:{
			...mapMutations('address',['updateAddress']),
			async chooseAddress(){
				const [err,suc] = await uni.chooseAddress().catch(err => err.errMsg)
				if(err === null && suc.errMsg === "chooseAddress:ok"){
					// 将收货地址存储
					this.updateAddress(suc)
				}
			}
		},
		computed:{
			...mapState('address',['address'])
		}
	}
</script>
<style lang="scss">
	.my-address {  
	  height: 180rpx;  
	  width: 100%;  
	  display: flex;  
	  align-items: center;  
	  justify-content: center;
	  position: relative;  
	  
	  &::after {  
	    content: '';  
	    position: absolute;
	    bottom: 0; 
	    left: 0;  
	    width: 100%; 
	    height: 10rpx;  
	    background: linear-gradient(90deg, rgb(5, 235, 255), rgb(0, 111, 239)); // 使用background属性设置渐变  
	  }  
	  .my-address-info{
		  width:100%;
		  height:100%;
		  display: flex;
		  flex-direction: column;
		  justify-content: center;
		  padding:20rpx;
		  font-size: 25rpx;
		  .top{
			  display: flex;
			  justify-content: space-between;
			  align-items: center;
			  .user{
				  height:100%;
			  }
			  .phone{
				  height:100%;
				  display: flex;
				  align-items: center;
				  view{
					  padding-right:10rpx;
				  }
			  }
		  }
		  .bottom{
			  margin:20rpx 0;
		  }
	  }
	}
</style>
