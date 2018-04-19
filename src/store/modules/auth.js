import Vue from 'vue'
import { router } from '../../router/router'
const state = {
  currentUser : {
		isAuth: false,
		profileIncomplete: false,
		profile: {
			firstname:'Juan',
			lastname:'Rodriguez',
			phone: 5555555555,
			dob: '02/12/1988',
			email: 'juan.j.rodriguez2@gmail.com',
			member_id: 20003
		}
  }
}
const getters = {
  currentUser : state => state.currentUser,
	isAuth: state => state.currentUser.isAuth,
	profileLengthTotal : state => state.profileLengthTotal,
  profileLengthActual : state => state.profileLengthActual
}
const actions = {
  getLogin ({ commit, dispatch, rootState }, user){
		rootState.isLoading = true;
		return new Promise((resolve,reject) => {
			firebase.auth().signInWithEmailAndPassword(user.email, user.password)
				.then((response) => {
					commit('SET_AUTH', true)
					rootState.isLoading = false;
					let data = response
					resolve(data)
					return response
				}).catch(error => {
						// commit('SET_AUTH_ERRORS',error)
						reject(error);
				})
		})
	},
	getLogout({commit, rootState}) {
		rootState.isLoading = true;
		localStorage.removeItem("token")
		commit('SET_LOGOUT')
		setTimeout(()=> {
			rootState.isLoading = false;
		}, 2000)
	},
	getParticipantData({commit, rootState}){
		return new Promise((resolve,reject) => {
			let panelist = {}
			firebase.database().ref('panelist').on('child_added', snap => {
				panelist[snap.key] = snap.val()
				resolve(snap)
			})
			commit('SET_PARTICIPANT_BY_CONTACT_ID', panelist)
			commit('SET_LOGIN', panelist)

		})
	}
}
const mutations = {
	SET_AUTH (state, isAuth) {
		state.currentUser.isAuth = isAuth
	},
	SET_LOGOUT (state, rootState){
		state.currentUser.isAuth = false
		state.currentUser = {}
		router.push("/")
	},
	SET_LOGIN(state, user){
		state.currentUser.participant = user

	},
	SET_PARTICIPANT_BY_CONTACT_ID (state, contactData) {
		state.currentUser.contact = contactData
		router.push("/")
	}
	
}
export default {
  state,
  getters,
  actions,
  mutations
}