<template>
  <card 
			class="subWrapper" 
			:title="title" 
			:footer="updatedAt">
			<div class="home__completeProfile">
				<div class="ms__progress">
        	<div class="ms__progress--bar" :style="{width: calculatePercentage}"></div>
      	</div>
        <div class="ms__progress--description"> <p>{{calculatePercentage}} complete </p></div>
        <div class=" ms__button--right home__completeProfile--btn">
          <router-link to="/profile">
            <button class="ms__button">Update My Profile</button>
          </router-link>
        </div>
			</div>
			</card>
</template>
<script>
import Card from './Card.vue'
import {filterObj, findDuplicate} from '../utils/helpers.js'
export default {
  name:'ProfileCompleteCard',
  components: { Card },
  data () {
    return {
      title: 'Update Your Profile'
    }
  },
  mounted(){
    
  },
  computed: {
    calculatePercentage(){
      return Math.round(((this.currentUser.profileLengths.profileLengthTotal - this.currentUser.profileLengths.profileLengthUndefined)/this.currentUser.profileLengths.profileLengthTotal) * 100) + "%"
    },
    updatedAt () {
      const d = new Date(this.currentUser.profile.updated_at),
            dstring = d.toDateString()
      return `Updated: ${dstring}`
    }
  
  },
  methods:{
 
  }
}
</script>

