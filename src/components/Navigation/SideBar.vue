<template>
	<div id="nav" class="sidebar">
	<!-- <div id="nav" class="sidebar" @mouseover="onMouseEnter"> -->
		<div class="sidebar__logo">
			<h1>myCompany</h1>
			<!-- <img src="../../../../assets/images/dashboard/msp_logo.png" width="100%" height="100%" alt=""> -->
		</div>
		<div class="sidebar__content">
			<div class="sidebar__content--links" v-for="link in sidebarlinks" :key="link.id">
				<router-link :to="link.route" active-class="active">
					<div class="sidebar__links--icon"><span class="fa fa-lg" :class="link.icon"></span></div>
					<div class="sidebar__links--txt" v-if="link.name === ''"><p>{{user}}</p></div>
					<div class="sidebar__links--txt" v-else><p>{{link.name}}</p></div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import Slideout from 'vue-slideout'
import { mapGetters, mapMutations, mapActions} from 'vuex'
import {profileInitials} from '../../utils/mixins/mixins'
import {flatten, isEmpty, isNil, filterObj, findDuplicate,filterDOB, twoDigits } from '../../utils/helpers.js'

export default {
	name: 'sidebar',
	mixins: [profileInitials],
	data () {
		return {
			sidebarlinks:[
    		{
					name:'Home',
					route:'/',
					icon: 'fa-home'
				},
				{
					name:'Juan Rodriguez',
					route:'/profile',
					icon: 'fa-user'
				},
				{
					name:'Rewards',
					route:'/dashboard-rewards',
					icon: ''
				},
				{
					name:'Points',
					route:'/points',
					icon: ''
				},
				{
					name:'Cart',
					route:'/cart',
					icon: ''
				},
			],
			user: '',
			count: 0
		}
	},
	computed: {
		...mapGetters([
			'currentUser',
			'profileIncomplete'
		])
	},
	created(){
		this.user = this.currentUser.contact.firstname + " "+ this.currentUser.contact.lastname
	},
	methods:{
		onMouseEnter(e){
			let path = this.$route.path
					path = path.replace(/\//g, '')
					if(path === 'profile'){
						this.count++
						if(this.count > 1){
							let profile = this.currentUser.profile
							const emptyKeysInProfile = Object.keys(profile).filter(function(key) {
									return isNil(profile[key])
							})
							console.log('emptyKeysInProfile:',emptyKeysInProfile)
							// if count > 1 and the profile settings haven't been updated, let them know! you can't do that!

							console.log('count is greater than 1 do nothing')
						}else {

							console.log('path equals profile!')
							console.log('count:',this.count)
							console.log('this.profileIncomplete:',this.profileIncomplete)
						}
					}
		},
		toggleSlideout(){
			console.log('hello from click-outside directive')
		}
	}
	
}
</script>