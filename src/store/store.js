import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth'
import products from './modules/products'

Vue.use(Vuex);

const state = {
	onboardingStep: {
		count:1,
		response: ''
	}
}
const getters = {
	onboardingStep: state => state.onboardingStep
}
const actions = {}
const mutations = {}


export default new Vuex.Store({
	state,
	getters,
	actions,
  mutations,
  modules: {
		auth,
		products
	}
})