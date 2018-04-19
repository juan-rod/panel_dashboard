<template>
	<div id="profile" class="profile profileTest">
		<card :title="title" :body="body" :footer="isComplete">
			<profile-form></profile-form>
		</card>
	</div>
</template>

<script>
import ProfileForm from './ProfileForm.vue'
import Card from '../../components/Card.vue'

import { mapGetters, mapMutations, mapActions} from 'vuex'
export default {
	name:'profile',
	components : { ProfileForm, Card },
	data () {
		return {
			showModal:false,
			title:'Profile Settings',
			body: '',
			footer: 'Incomplete'
		}
	},
	computed: {
		...mapGetters([
			'isWelcome',
			'participant',
			'inConstruction'
		]),
		isComplete () {
			return this.currentUser.profileIncomplete ? 'Incomplete' : 'Complete'
		}
  },
	mounted(){
		this.init()
	},
	methods: {
		...mapActions([
			'showConstruction'
		]),
		init(){
		}
  }
}
</script>