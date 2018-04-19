<template>
	<div>
		 	<form class="login__form">
				<!-- password -->
				<div class="login__form--email login__input input-group">
					<input type="password" id="inputPassword" class="form-control input-lg" placeholder="Your Password" v-model.trim="password" required autofocus>
					<span class="lock-icon"><i class="fa fa-lock"></i></span>
				</div>
				<!-- confirm password -->
				<div class="login__form--email login__input input-group">
					<input type="password" id="inputConfirmPassword" class="form-control input-lg" placeholder="Confirm Password" v-model.trim="confirmPassword" required>
					<span class="lock-icon"><i class="fa fa-lock"></i></span>
				</div>
				<button class="ms__button btn-block login__button" type="submit" @click.prevent="submitPassword" :disabled="!isValid">Submit</button>
			</form>
	</div>
</template>

<script>
import { mapGetters,mapActions} from 'vuex'
export default {
	name:'verify-form',
	data () {
		return {
			show: false,
			password: '',
			confirmPassword: '',
			title: 'Password',
			subtitle: "",
			fQuestion: 'Not Your First Time?',
			fDirection: 'Login',
			fLink:'/dashboard-login'
		}
	},
	computed: {
      ...mapGetters([
        'participant',
        'verify'
      ]),
      hasErrors(){
			return this.errors.length > 0;
		},
		isValid () {
			return this.password != '' && this.confirmPassword != ''
		}
  },
	mounted(){
		this.animate()
		this.verify.id = this.$route.params.id
		console.log("this.verify.id:",this.verify.id)
		console.log("this.$route.params:",this.$route.params)
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
			'getResetPassword',
			'verifyParticipant',
			'showLoading'
		]),
		animate(){
			setTimeout(()=>{
				this.show = !this.show
			},500);
		},
		submitPassword(){
			let user = {
				password: this.password, 
				id: this.verify.id
			}
			console.log("user:",user)
			if(this.isFormValid()){
				this.getResetPassword(user)
						.then((response) => {
							console.log("response in LoginFormVerify:",response)
							let status = response.status
							if(status === 'OK'){
								this.modalSuccess(response)
								this.showLoading(false)
								this.$router.push("/dashboard")
							}
						})
						.catch((error) => {
							this.modalError(error)
							console.log('error:',error)
							
							this.showLoading(false)
							this.$router.push("/dashboard")
						})
			}
			},
			modalError(data){
				console.log("response in modalError:",data)
				let plzContact = ' Please contact nyc@mediasciencelabs.com.'
				this.$store.state.onboardingStep ={'count': 3, 'response': data.data + plzContact}
			},
			modalSuccess(data){
				console.log("response in modalSuccess:",data)
				let success = "Password successfully set. Please Login."
				this.$store.state.onboardingStep = {'count': 6, 'response': success}
				
			},
      isFormValid(){
					 console.log("hello from isFormValid", this.password)
					if(this.password != this.confirmPassword) {
						console.log('this.password is blank:',this.password)
						console.log('Passwords Do Not Match',{'this.password':this.password,'this.confirmPassword':this.confirmPassword })
						return false
					} else {
					 console.log("hello from else in isFormValid")
						this.verify.password = this.password
						return true
					}
			}
    }
}
</script>

<style scoped>

.lock-icon{
	position: absolute;
    z-index: 2;
    top: 14px;
    right: 15px;
}
.lock-icon i{
	font-size: 1.5em;
    color: rgba(76, 78, 77, 0.55);
}
.pText {
	padding: 0 20%;
    text-align: center;
  	clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
}

.pTransition-enter-active, .pTransition-leave-active {
  transition: all .5s ease-out;
}
.pTransition-enter, .pTransition-leave-to {
  clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
  transform: translate(0%, 100%);
}
</style>