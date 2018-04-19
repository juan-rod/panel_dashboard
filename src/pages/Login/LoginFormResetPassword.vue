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
			<button class=" ms__button btn-block login__button" type="submit" @click.prevent="register">Submit</button>
		</form>

	</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	name: 'forgot-password-form',
	data () {
		return {
			email: '',
			memberID: '',
			body: '',
			footer: '',
			title: 'New Password',
			subtitle: "Enter your email address and member ID.	We'll help you create a new password.",
			fQuestion: 'Not Your First Time?',
			fDirection: 'Login',
			fLink:'/dashboard-login'
		}
	},
	computed: {
		hasErrors(){
			return this.errors.length > 0;
		}
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
						console.log("response in LoginFormRegister:",response)
						let status = response.status
						if(status === 'OK'){
							this.$notify({
								group: 'foo',
								type: 'success',
								title: response.data + ' Follow the next steps sent to: ' + user.email
							})
							this.showLoading(false)
							this.$router.push("/dashboard")
						}
					})
					.catch((error) => {
						console.log('error:',error)
						let	pNotFound = 'Participant not found.'
						if(error.body.data === pNotFound){
							this.$notify({
								group: 'foo',
								type: 'error',
								title: error.body.data + 'Refer to your Welcome Letter email to find your correct Member ID.'
							})
						} else {
							this.$notify({
								group: 'foo',
								type: 'error',
								title: error.body.data
							})
						}
						this.showLoading(false)
						this.email = ''
						this.memberID = ''
						this.$router.push("/dashboard")
					})


		}
	}
}
</script>
