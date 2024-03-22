import {
	mapGetters
} from 'vuex'
export default {
	data() {
		return {

		};
	},
	methods: {
		setBadge() {
			// 当页面显示时，显示购物车的数字徽标
			uni.setTabBarBadge({
				index: 2, // 索引
				text: this.total + ''
			})
		}
	},
	computed: {
		...mapGetters('cart', ['total'])
	},
	watch: {
		total() {
			this.setBadge()
		}
	},
	onShow() {
		this.setBadge()
	}
}