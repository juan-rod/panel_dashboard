import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routes'
import VeeValidate from 'vee-validate'
import VueMask from 'v-mask'
import firebase from 'firebase'
import { scroll, clickOutside } from '../utils/directives'
import {profileInitials, vuex_mixin } from '../utils/mixins/mixins'
import Notifications from 'vue-notification'
import vmodal from 'vue-js-modal'

Vue.use(Router)
Vue.use(VeeValidate)
Vue.use(VueMask)
Vue.use(vmodal, { dialog: true })

Vue.mixin(profileInitials, vuex_mixin)

// directives
Vue.directive('scroll', scroll)
Vue.directive('clickOutside', clickOutside)

 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyCvJw_T-MbXd4e_REEx4RX8nwXqZHoHcK0",
  authDomain: "temp-data-b7a73.firebaseapp.com",
  databaseURL: "https://temp-data-b7a73.firebaseio.com",
  projectId: "temp-data-b7a73",
  storageBucket: "",
  messagingSenderId: "214825251979"
};
firebase.initializeApp(config);
 window.firebase = firebase;
 

var router = new Router({
  base: '/',
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
})




export { router }