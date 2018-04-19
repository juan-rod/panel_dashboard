<template>
  <div class="onboard__body">
    <card
      class="login__card"
      :title="resetHeading.title"
      :subtitle="resetHeading.subtitle"
      :footer="resetHeading.footer"
      @headingReset="resetHeading = $event"
      >
      <login-reset-password></login-reset-password>
    </card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Card from '../Card.vue'
import LoginResetPassword from '../../pages/Login/LoginFormVerify.vue'
import { modalCounter } from '../../utils/mixins/mixins'
export default {
  name: 'ModalPassword',
  components :{ Card, LoginResetPassword },
   props: {
    step: Number
  },
  mixins: [ modalCounter ],
  data () {
    return{
      newStep: '',
      resetHeading: {
        footer:{
          link: ''
        }
      }
    }
  },
  computed:{
    ...mapGetters([
		    'isInitOnboard'
		])
  },
  methods: {
    login () {
      this.$modal.hide('login-onboard');
    }
  }

}
</script>