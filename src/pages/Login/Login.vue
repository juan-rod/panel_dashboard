<template>
	<div>
		<div class="login">
			<div class="login__aside">
				<div class="login__aside--body">
					<div class="MsLogo">
						<a class="MsLogo__link" href="/dashboard-login">
						<!-- <img src="../../../../assets/images/dashboard/msp_logo.png" width="100%" height="100%" alt=""> -->
						</a>
					</div>
					<div class="login__aside--top">
						<h1>Profile</h1>
						<h1>Surveys</h1>
						<h1>Points</h1>
						<h1 class="rewards">Rewards</h1>
					</div>
					<div class="login__aside--bottom">
						<p>All members of The Panel can now choose where to spend the points they've earned.</p>
					</div>
				</div>
			</div>
			<div class="login__body">
				<card
					class="login__card"
					:title="resetHeading.title"
					:subtitle="resetHeading.subtitle"
					:footer="resetHeading.footer"
					@headingReset="resetHeading = $event">
						<router-view class=""></router-view>
				</card>
			</div>
			<modal 
				name="login-onboard"
				height="auto"
				width="700px"
				:adaptive="true"
				>
				<modal-login></modal-login>
			</modal>
	  </div>
	</div>
</template>

<script>
import Card from '../../components/Card.vue'
import ModalLogin from '../../components/Modals/ModalLogin.vue'
export default {
	name: 'login',
	components : { Card, ModalLogin },
	data () {
		return {
			resetHeading: {
				title: 'Login',
				subtitle: '',
				footer: {}
			},
			auto: 'auto',
			body:'',
			footer:'',
			modalContent: {
				title: '',
				subtitle: '',
				body:'',
				footer: {}
			}
		}
	},
	computed :{
    count () {
      return this.$store.state.onboardingStep.count
    }
	},
	mounted(){
		this.showModal()
	},
	methods: {
		showModal () {
			this.$modal.show('login-onboard')
		}
	}
}
</script>
