<template>
	<div>
		<form class="login__form" >
			<!-- email -->
			<div class="login__form--email login__input input-group">
				<input type="email" id="inputEmail" class="form-control input-lg" placeholder="Your Email" v-model.trim="email" required autofocus style="pointer-events:none;">
			</div>
			<!-- memberID -->
			<div class="login__input login__form--password">
				<input type="memberID" id="inputmemberID" class="form-control input-lg" placeholder="Your Member ID" v-model.trim="memberID" required style="pointer-events:none;">
			</div>
			<!-- login button	 -->
			<button class="ms__button btn-block login__button" type="submit" @click.prevent="register" :class="{'loading': isLoading}">Submit</button>
		</form>
	</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { modalCounter } from '../../utils/mixins/mixins'
export default {
	name: 'register-form',
	props: {
		status: String
	},
	mixins: [ modalCounter ],
	data () {
		return {
			email: '',
			memberID: '',
			// isLoading: false,
			title: 'Register',
			subtitle: "Enter your email address and member ID. We'll help you create a new password.",
			fQuestion: 'Not Your First Time?',
			fDirection: 'Login',
			fLink:'/dashboard-login',
			showModal: false
		}
	},
	computed: {
		...mapGetters([
		    'participant',
		    'currentUser',
				'errors',
				'isLoading',
				'onboardingStep'
		])
	},
	created (){
		let resetHeading = {
			title: this.title,
			subtitle: this.subtitle,
			footer: {
				question: this.fQuestion,
				direction: this.fDirection,
				link: this.fLink
			}
		}
		this.$parent.$emit('headingReset', resetHeading);
	},
	methods: {
		...mapActions([
			'verifyParticipant',
			'getRequestPassword',
			'showLoading'
		]),
		register () {
			let user = {
				email: this.email,
				memberID: this.memberID
			}
			this.getRequestPassword(user)
				.then((response) => {
					let status = response.status
					if(status === 'OK'){
						this.modalSuccess(response.data)
					 }
				})
				.catch((error) => {
					let	pNotFound = 'Participant not found.'
					if(error.body.data === pNotFound){
						this.modalError(error)
					} else {
						this.modalError(error)
					}
					this.showLoading(false)
					this.email = ''
					this.memberID = ''
				})
		},
		modalError(data){
			this.$store.state.onboardingStep.count++
			let plzContact = ' Please contact nyc@mediasciencelabs.com.'
			if(data.status === 200) this.$store.state.onboardingStep.response = data.body.data + plzContact
			if(data.status === 400) this.$store.state.onboardingStep.response = data.body + '.' + plzContact
		},
		modalSuccess(data){
			console.log("data in modalSuccess for LoginFormRegister:",)
			data += ' Please look for an email from MediaScience to reset your password in the next 24 hours.'
			this.$store.state.onboardingStep = {'count': 4, 'response': data}
			this.showLoading(false)
			this.$router.push("/dashboard")
		},
		isFormValid(){
			if(this.email.length > 0 && this.memberID.length > 0) {
				return true
			}
			return false
		}
	}
}
</script>


