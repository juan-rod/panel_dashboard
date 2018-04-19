import { mapGetters, mapMutations, mapActions} from 'vuex'
import store from '../../store/store';
export const profileInitials = {
  computed: {
		...mapGetters([
			'currentUser'
		]),
		profileInitials () {
			// let name = this.currentUser.contact.firstname;
			// let lastname = this.currentUser.contact.lastname;
			// this.initials = name.charAt(0)+""+lastname.charAt(0);
			// this.initials = this.initials.toUpperCase();
			this.initials = 'JR'
			return this.initials
		}
	}
}
export const modalCounter = {
	computed: {
		...mapGetters([
			'onboardingStep'
		])
	},
	methods:{
		modalRegister () {
			this.$store.state.onboardingStep.count++
		}
	}
}
export const vuex_mixin = {
  computed: {
    ...mapGetters([
      'currentUser',
			'educations',
			'ethnicities',
			'incomes',
			'occupations',
			'profileLengthActual',
			'profileLengthTotal',
			'profileIncomplete',
			'points',
			'onboardingStep'
    ]),
  },
  methods: {
    ...mapActions([
      'fetchEducations',
			'fetchEthnicities',
			'fetchIncomes',
			'fetchOccupations',
			'getUpdateParticipant',
			'getPoints',
			'getParticipantData',
			'getLogin'
    ])
  }
}