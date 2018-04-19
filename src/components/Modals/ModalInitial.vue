<template>
  <div class="onboard__body">
    <div class="onboard__body--btns onboard__register">
        <button class="ms__button ms__button--lg" @click="modalRegister">Register</button>
      </div>
      <div class="onboard__body--btns onboard__login">
        <button class="ms__button ms__button--lg" @click="login">Login</button>
      </div>
  </div>
</template>
<script>
import { modalCounter } from '../../utils/mixins/mixins'
export default {
  name: 'ModalInitial',
   props: {
    step: Number
  },
  mixins: [ modalCounter ],
  data () {
    return{
      newStep: ''
    }
  },
  methods: {
    login () {
      this.$modal.hide('login-onboard');
    }
  }

}
</script>