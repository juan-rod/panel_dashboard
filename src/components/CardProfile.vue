<template>
	<div>
		<div class="profile__dropdown">
			<div class="profile__dropdown--arrow"></div>
			<div class="cardTemp">
				<div class="cardTemp__header">
					<p>{{currentUser.contact.firstname}} {{currentUser.contact.lastname}}</p>
					<p><span>Member ID: {{currentUser.contact.member_id}}</span></p>
				</div>
				<div class="cardTemp__body">
					<router-link to="/profile">
						<p>Profile</p>
					</router-link>
					<div @click="logout">
						<p>Logout</p>
					</div>
				</div>
				<div class="cardTemp__footer hidden-xs-up">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapMutations, mapActions} from 'vuex'
export default {
	name:'profile-dropdown',
	computed: {
		...mapGetters([
			'currentUser'
		])
  },
	methods: {
		...mapActions([
			'getLogout'
		]),
		logout () {
			console.log('click logout button:')
			this.getLogout()
		}
  }
}
</script>