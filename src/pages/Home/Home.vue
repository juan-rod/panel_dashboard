<template>
	<div class="">
		<Slideout menu="#menu" panel="#panel" :toggleSelectors="['.toggle-button']" @on-open="open">
			<side-bar id="menu"></side-bar>
				<div id="panel" class="home">
					<button-hamburger v-click-outside="toggleSlideout"></button-hamburger>
						<top-bar 
							class="header"
							:title="pageName()" 
							:home='home'>
						</top-bar>
						<transition name="v--fade">
							<router-view class="home__routerview content"></router-view>
						</transition>
				</div>
				<v-dialog height="auto"/>
		</Slideout> 
	</div>
</template>

<script>
	import SideBar from "../../components/Navigation/Sidebar.vue"
	import TopBar from "../../components/Navigation/TopBar.vue"
	import ButtonHamburger from "../../components/ButtonHamburger.vue"
	import Slideout from 'vue-slideout'
	import { mapGetters, mapActions } from 'vuex'
	import {vuex_mixin} from '../../utils/mixins/mixins'
	import {flatten, isEmpty, isNil, filterObj, findDuplicate,filterDOB, twoDigits } from '../../utils/helpers.js'

export default {
	name: 'Home',
	components: { SideBar, Slideout, ButtonHamburger, TopBar },
	data () {
		return {
			isActive:false,
			title:'',
			home: false
		}
	},
	mixins: [vuex_mixin],
	computed: {
    ...mapGetters([
			'inConstruction',
			'isLoading'
		])
	},
	created(){
		// this.createProfileSettingsObj()
		// this.pointsAndRewards()
  },
	methods: {
		...mapActions([
      'showConstruction'
    ]),
		pageName(){
			let path = this.$route.path
					path = path.replace(/\//g, '')
					// this.homePage(path)
					if(path.length <= 7){
						if (path === '') {
							this.home = true
							path = "Dashboard"
							return path
						}
						return path
					} else if(path === 'dashboard-rewards'){
						let rewards = 'Rewards'
						return rewards
					} else {
						return path.slice(0, 6)
					}
	  },
		homePage(path){
			if(path === ''){
				this.home = true
			}
			return
		},
		toggleSlideout() {
			let isOpen = this.$children[0].slideout.isOpen()
			let isClosed = this.$children[0].slideout.close()
			if(isOpen){
				return isClosed
			} 
		},
		open(){
		},
		createProfileSettingsObj () {
			const contact = this.getContactKeysObj()
			const participant = this.getParticipantKeysObj()
			const merge = {...contact, ...participant}
			this.$store.dispatch('createCurrentUserProfile', merge).then(response => {
				this.checkEmptyValuesInProfile()
			}, error => {
				console.error('error:',error)
			})

		},
		pointsAndRewards () {
			this.getPoints(this.currentUser.participant.points_available)
		},
		getContactKeysObj () {
			const contactKeys = ['dob','email','firstname','gender','id','lastname','phone','updated_at','can_email','can_sms']
			return filterObj(contactKeys, this.currentUser.contact)
		},
		getParticipantKeysObj () {
			const flattenParticipants = flatten(this.currentUser.participant)
			flattenParticipants['metadata_tracking'] = flattenParticipants['metadata_How you heard about us?']
			const participantKeys = ['education_name', 'ethnicity_name', 'income_name', 'occupation_name', 'handedness', 'metadata_tracking' ]
			return filterObj(participantKeys, flattenParticipants)

		},
		checkEmptyValuesInProfile(){
			const profile =	this.currentUser.profile
			const emptyKeysInProfile = Object.keys(profile).filter(function(key) {
					return isNil(profile[key])
			})
			this.$store.dispatch('createEmptyKeysInProfile', emptyKeysInProfile).then(response => {
				this.compareProfileAndEmptyArrays()
			}, error => {
				console.error('error:',error)
			})
		},
		onlyProfileInputs () {
			this.dealWithDOB()
      const onlyProfileForm = ['dob','email','firstname','gender','lastname','phone','education_name','ethnicity_name', 'income_name', 'occupation_name', 'handedness', 'metadata_tracking']
			return filterObj(onlyProfileForm, this.currentUser.profile)
		},
		dealWithDOB(){
			const filteredDOB = filterDOB(this.currentUser.profile.dob),
						newDOB = filteredDOB[0].split('/'),
						mappedDOB = twoDigits(newDOB).join('')
			return this.currentUser.profile.dob = mappedDOB
		},
    compareProfileAndEmptyArrays () {
      const filteredProfile = this.onlyProfileInputs(),
						filteredProfileArray = Object.keys(filteredProfile),
						duplicateLength = findDuplicate(filteredProfileArray.concat(this.currentUser.emptyKeysInProfile)).length,
						profileLengthTotal = filteredProfileArray.length,
				 		profileLengthUndefined = duplicateLength,
						lengths = {
							profileLengthTotal,
							profileLengthUndefined
						}
						this.$store.dispatch('createProfileLengths', lengths).then(response => {
							if(response > 0){
								this.$store.state.auth.currentUser.profileIncomplete = true
							} else{
								return
							}
						},error =>{
							console.error('error:',error)
						})
        		return 
    }

	}
}
</script>
<style lang="sass">

</style>



