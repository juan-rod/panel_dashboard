<template>
	<div>
			<form class="login__form">
				<div class="login__form--email login__input input-group">
					<input type="email" id="inputEmail" class="form-control input-lg" placeholder="Your Email" v-model.trim="email" required autofocus>
				</div>
				<div class="login__input login__form--password input-group">
					<input type="password" id="inputpassword" class="form-control input-lg" placeholder="Your Password" v-model.trim="password" 
					@focus="showEx = true"
					required>
					<span class="lock-icon">
						<i class="fa fa-lock"></i>
					</span>
				</div>
				<div class="login__form--reset">
					<router-link to="/reset">Forgot Password?</router-link>
				</div>
				<button class="ms__button btn-block login__button" type="submit" @click.prevent="login">Enter</button>
				<div class="ui error message" v-if="hasErrors">
					<p v-for="error in errors" :key="error.id">{{error}}</p>
				</div>
			</form>
	</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Loading from '../../components/VueSpinner.vue'
import Card from '../../components/Card.vue'

export default {
	name: 'login-form',
	components : {Loading, Card},
	data () {
		return {
			email: 'enter@email.com',
			password: 'enterpassword',
			showEx:false,
			body:'',
			footer:'',
			title: 'Login',
			subtitle: 'Enter your email address and password below.',
			fQuestion: 'First Time Logging In?',
			fDirection: 'Register Here',
			fLink:'/register',
			login_attempts: 4
			
		}
	},
	computed: {
		hasErrors(){
			return this.errors.length > 0;
		},
		...mapGetters([
		    'participant',
		    'currentUser',
				'isLoading',
				'authErrors'
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
	        'getLogin',
					'getParticipantByContactId',
					'showLoading',
					'getParticipantData'
			]),
		scrollToTop(){
			document.body.scrollTop = 0; // For Safari
    	document.documentElement.scrollTop = 0;
		},
		login() {
			this.scrollToTop()
			let user = {
				email: this.email,
				password:this.password
			}
			this.getLogin(user)
				.then((response) => {
					let status = response
					this.getParticipantData()
						.then((response)=>{
							// this.$notify({
							// 	group: 'success',
							// 	type: 'success',
							// 	title: 'Login Successful!'
							// })
						})
					this.$router.push("/")
				})
				.catch((error) => {
					console.log('error:',error)
					let firstText = 'Couldn\'t find the account associated with ',
							secondText = '. We suggest giving it another try or create a new password.',
							errorMessage = error.data	
					if(errorMessage === 'Unauthorized'){
						this.$notify({
							group: 'error',
							type: 'error',
							title: 'Sorry!',
							text: firstText + this.email + secondText,
							duration:10000
						})
					} else {
						this.$notify({
							group: 'error',
							type: 'error',
							title: 'Oops!',
							text: 'There seems to be an error. Please try again.',
							duration:10000
						})
					}
					this.showLoading(false)
					this.$router.push("/")
				})
		}
	}
}
</script>
