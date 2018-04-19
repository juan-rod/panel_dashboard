<template>
  <div class="modal__login--onboard">
    <div class="onboard__title">
      <p>{{onboardTitle}}</p>
    </div>
    <div class="onboard__progress">
      <div class="ms__progress">
        <div class="ms__progress--bar" :style="{width: calculatePercentage}"></div>
      </div>
    </div>
    <modal-initial v-if="count === 1"></modal-initial>
    <modal-register v-if="count === 2"></modal-register>
    <div v-if="count === 3"> {{onboardingStep.response}} </div>
    <div v-if="count === 4"> {{onboardingStep.response}} </div>
    <modal-password v-if="count === 5"></modal-password>
    <modal-complete v-if="count === 6"></modal-complete>
 
  </div>
</template>
<script>
import ModalInitial from './ModalInitial.vue'
import ModalRegister from './ModalRegister.vue'
import ModalPassword from './ModalPassword.vue'
import ModalComplete from './ModalComplete.vue'
export default {
  name: 'ModalLogin',
  components: {ModalInitial, ModalRegister, ModalComplete, ModalPassword},
  data () {
    return{    }
  },
  computed:{
    count () {
      return this.$store.state.onboardingStep.count
    },
    calculatePercentage(){
      return (16.6 * this.count) + "%"
    },
    pathCheck () {
      let path = this.$route.path
      let pathName = this.$route.name
      if(pathName == 'reset-modal') this.$store.state.onboardingStep.count = 5
    },
    onboardTitle () {
      console.log("this.count in onboardTitle:",this.count)
      return {
        '1': 'What can we help you do?',
        '2': 'Let\'s Get Started',
        '3': 'Oops...',
        '4': 'Email Sent!',
        '5': 'Almost there...',
        '6':  'Your password is now set!'
      }[this.count]
    },
  },
  mounted () {
    this.pathCheck
  },
  methods: {
    login () {
      this.$modal.hide('login-onboard');
    }
  }

}
</script>
