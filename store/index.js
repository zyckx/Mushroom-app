import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		IsLogin: false,
		UserInfo:{
			
		}
	},
	mutations: {
		login(state, UserInfo) {
			state.IsLogin = true;
			state.UserInfo = UserInfo;
		},
		logout(state) {
			state.IsLogin = false
			state.UserInfo = ''
		},

	},
	getters: {

	},
	actions: {
		
	}
})

export default store
