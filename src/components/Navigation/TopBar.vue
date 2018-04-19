
<template>
	<div class="banner">
		<div class="banner__profile">
			<div class="banner__title">
				<p>{{title}}</p>
			</div>
			<div class="banner__profile--iconsDiv">
				<div class="subIcons">
					<cart-nav class="banner__icons sm__icon cart__icon"></cart-nav>
					<points-nav class="banner__icons sm__icon points__icon"></points-nav>
				</div>
				<div class="banner__icons userProfile" @click.prevent="showPopover">
					<span>{{profileInitials}}</span>
				</div> 
			</div>
		</div> 
		<!-- <profile-dropdown v-if="showPopup" v-click-outside="closeProfile"></profile-dropdown> -->
		<profile-dropdown v-if="showPopup" @click="showPopover"></profile-dropdown>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions} from 'vuex'
import ProfileDropdown from '../CardProfile.vue'
import CartNav from '../ButtonCart.vue'
import PointsNav from '../ButtonPoints.vue'
import {profileInitials} from '../../utils/mixins/mixins'

export default {
	name:'TheBanner',
	props:{
	  title: String,
	  home: Boolean
	},
	mixins: [profileInitials],
	components:{ ProfileDropdown, CartNav, PointsNav },
	data () {
		return {
			showPopup: false,
      initials:''
		}
	},

  mounted () {
    this.init()
	},
	watch:{
    $route (to, from){
			//not best solution but works. needs refactor.
			let path = to.path
			
			if(path === '/profile') {
				if(this.showPopup) this.showPopup = !this.showPopup
			}
			if (path != '/profile') {
				if(this.showPopup) this.showPopup = !this.showPopup
			}

    }
	},
  methods: {
		...mapActions([
			'fetchLabs'
		]),
		init(){
			// this.fetchLabs()
		},
		showPopover() {
			this.showPopup = !this.showPopup;
		},
		closeProfile() {
				this.showPopup = !this.showPopup
		}
  }
}
</script>


