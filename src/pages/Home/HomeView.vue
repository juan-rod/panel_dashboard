<template>
	<div class="home__view">
		<!-- <transition-group name="v--cards"> -->
			<profile-complete v-if="isProfileIncomplete" :key="item"></profile-complete>
		<card 
			class="subWrapper" 
			:title="title" 
			:footer="footer" :key="item1">
			<div class="home__welcome">
				<p>We are glad to have you as a panelist and look forward to working with you.</p>
				<p>Surf your profile and update as much information as you can.</p>
				<p> We use the information on your profile to determine what studies you are eligible to participate in. The more complete your profile is, the more likely you are to be invited to participate in a study. You also earn points for filling out your profile! Points can be redeemed for movie tickets, gift cards , or you can choose to make a charitable donation!</p>
				<p>If you have any questions, please contact ...</p>
				<!-- <p>If you have any questions, please contact the designated office listed below.</p> -->
			</div>
			</card>
			<!-- </transition-group> -->

	</div>
</template>

<script>
import Card from '../../components/Card.vue'
import ProfileComplete from '../../components/CardProfileIncomplete.vue'
export default {
	name: 'home-view',
	components:{ Card, ProfileComplete },
	data () {
		return {
			title:'Welcome to the MediaScience Panel!',
			footer:"March 1st, 2018",
			ptitle:'Complete Your Profile',
			pfooter: 'Sign in Date',
			item:'',
			item1:''
		}
	},
	computed:{
		isProfileIncomplete () {
			return this.currentUser.profileIncomplete
		}
	},
	methods: {
		
	}
}
</script>
