<template>
  <div>
    <input 
      type="text"
      v-model="selectedOption" 
      :style="{background: missingInfo}"
      @input="event => { $emit('input', event.target.value) }"
      :name="inputName"
      v-mask="vMasking"
      @focus="showHelper = !showHelper"
			@blur="showHelper = !showHelper"
    required>
    <span id="highlight" class="highlight"></span>
    <span class="bar"></span>
    <label>{{labelTitle}}</label>
    <small v-if="showHelper">{{showHelperTxt}}</small>
  </div>
</template>
<script>
import { editClassName, isNil } from '../utils/helpers.js'
export default {
  name: 'ProfileInputs',
  props: {
    value: null,
    inputName:{ type: String}
  },
   data () {
    return {
      selectedOption: null,
      showHelper : false
    }
  },
  mounted () {
    this.selectedOption = this.value
  },
  computed:{
    labelTitle () {
     return {
      'firstname' : 'First Name',
      'lastname' : 'Last Name',
      'email' : 'Email',
      'phone' : 'Phone',
      'dob' : 'Date of Birth'
      }[this.inputName]
    },
    vMasking () {
      return {
      'firstname' : '',
      'lastname' : '',
      'email' : '',
      'phone' : '(###) ###-####',
      'dob' : '##/##/####'
      }[this.inputName]
    },
    showHelperTxt () {
      return {
      'firstname' : '',
      'lastname' : '',
      'email' : '',
      'phone' : 'ex: (555) 555-5555',
      'dob' : 'ex: MM/DD/YYYY'
      }[this.inputName]
    },
    missingInfo () {
      // console.log('this.selectedOption in dropdown:',this.selectedOption)
      return isNil(this.selectedOption) ? 'rgba(62, 206, 255, 0.15)' : 'none'
    }
  },
  watch: {
    value: function (newValue) {
      console.log('newValue:',newValue)
      this.selectedOption = newValue
    }
  },
  methods: {
  }
}

</script>