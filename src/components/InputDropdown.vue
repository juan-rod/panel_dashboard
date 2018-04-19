<template>
  <div>
    <input 
      type="text"
      v-model="selectedOption" 
      :style="{background: missingInfo}"
      @input="event => { $emit('input', event.target.value) }"
      :name="ddName"
      @click.stop="initDropDown($event)"
      @keyup.tab="initDropDown($event)" 
    required>
    <div class="dropDown" v-if="showDropDown" v-click-outside="clickOutside">
      <ul><li :class="ddName" v-for="option in options" :value="option.id" :key="option.id" @click="itemClicked($event)">{{ option.name }}</li></ul>
    </div>
    <span id="highlight" class="highlight"></span>
    <span class="bar"></span>
    <label>{{labelTitle}}</label>
		<!-- <span class="down-icon"><i class="fa fa-lg fa-caret-down" aria-hidden="true"></i></span> -->
  </div>
</template>

<script>
import { editClassName, isNil } from '../utils/helpers.js'
export default {
  name: 'Dropdown',
  props: {
    value: null,
    ddName:{ type: String},
    options: {
      type: Array,
      required: true      
    }
  },
  data () {
    return {
      selectedOption: null,
      showDropDown : false
    }
  },
  mounted () {
    this.selectedOption = this.value
  },
  computed:{
    labelTitle () {
      let name = editClassName(this.ddName)[0]
      return name === 'metadata' ? 'How did you hear about us?' : editClassName(this.ddName)[0].charAt(0).toUpperCase() + editClassName(this.ddName)[0].slice(1)
    },
    missingInfo () {
      return isNil(this.selectedOption) ? 'rgba(62, 206, 255, 0.15)' : 'none'
    }
  },
  watch: {
    value: function (newValue) {
      this.selectedOption = newValue
    }
  },
  methods: {
    initDropDown (e) {
      this.showDropDown = !this.showDropDown
    },
    clickOutside(){
      this.showDropDown = !this.showDropDown
    },
    itemClicked (e) {
      this.selectedOption = e.target.innerText
      const keyName = e.target.className
      this.currentUser.profile[keyName] = this.selectedOption
      const info = {
        'keyName': keyName,
        'selectedOption': this.selectedOption,
        'value': e.target.value
      }
      this.thisCheckIfKeyNameNeedsID(info)
      this.initDropDown()
    },
    thisCheckIfKeyNameNeedsID(info){
      if(info.keyName == 'handedness'){
        this.sendToParticipantStateNoID(info.keyName, info.selectedOption) 
      } else if (info.keyName == 'metadata_tracking'){
        info.keyName = "metadata"
        this.sendToParticipantStateNoID(info.keyName, info.selectedOption) 
      } else {
        this.addIDToKey(info.keyName, info.value)
      }
    },
    addIDToKey(keyName, value){
      const participantKey = editClassName(keyName)[0] + '_id',
            participantKeyValue = value
      this.sendToParticipantState(participantKey,participantKeyValue)
    },
    sendToParticipantStateNoID(key,value){
      key === 'metadata' ? this.currentUser.participant[key] = {'How you heard about us?':value} : this.currentUser.participant[key] = value
    },
    sendToParticipantState (key, value){
      this.currentUser.participant[key] = value
    }
  }
}

</script>