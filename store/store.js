import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from './cart.js'
import moduleAddress from './address.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		cart:moduleCart,
		address:moduleAddress
	}
})

export default store