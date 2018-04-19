<template>
  <div class="onboard__body">
    <card
      class="login__card"
      :title="resetHeading.title"
      :subtitle="resetHeading.subtitle"
      :footer="resetHeading.footer"
      @headingReset="resetHeading = $event"
      >
      <login-register></login-register>
    </card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Card from '../Card.vue'
import LoginRegister from '../../pages/Login/LoginFormRegister.vue'
import { modalCounter } from '../../utils/mixins/mixins'
export default {
  name: 'ModalRegister',
  components :{ Card, LoginRegister },
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