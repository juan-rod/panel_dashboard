<template>
  <div id="form" class="profileTest__form user-form">
    <div class="profileTest__form--section contact">
      <div class="contact__section contact__section--name">
        <profileInput id="component-profileInput" class="group" :inputName="inputName.firstname" v-model="currentUser.profile.firstname"></profileInput>
        <profileInput id="component-profileInput" class="group" :inputName="inputName.lastname" v-model="currentUser.profile.lastname"></profileInput>
      </div>
      <div class="contact__section contact__section--email">
        <profileInput id="component-profileInput" class="group group__email" :inputName="inputName.email" v-model="currentUser.profile.email"></profileInput>
      </div>
      <div class="contact__section contact__section--phone-bday">
        <profileInput id="component-profileInput" class="group" :inputName="inputName.phone" v-model="currentUser.profile.phone"></profileInput>
        <profileInput id="component-profileInput" class="group" :inputName="inputName.dob" v-model="currentUser.profile.dob"></profileInput>
      </div>
    </div>
    <div class="profileTest__form--section demographics">
      <div class="demographics__section demographics__section--edEth">
          <dropdown id="component-dropdown" class="group" :ddName="ddName.education_name" :options="educations" v-model="currentUser.profile.education_name"></dropdown>
          <dropdown id="component-dropdown" class="group" :ddName="ddName.ethnicity_name" :options="ethnicities" v-model="currentUser.profile.ethnicity_name"></dropdown>
      </div>
      <div class="demographics__section demographics__section--inOcc">
          <dropdown id="component-dropdown" class="group" :ddName="ddName.income_name" :options="incomes" v-model="currentUser.profile.income_name"></dropdown>
          <dropdown id="component-dropdown" class="group" :ddName="ddName.occupation_name" :options="occupations" v-model="currentUser.profile.occupation_name"></dropdown>
      </div>
      <div class="demographics__section demographics__section--handMeta">
          <dropdown id="component-dropdown" class="group" :ddName="ddName.handedness" :options="handedness" v-model="currentUser.profile.handedness"></dropdown>
          <dropdown id="component-dropdown" class="group" :ddName="ddName.metadata_tracking" :options="metadata_tracking" v-model="currentUser.profile.metadata_tracking"></dropdown>
      </div>
    </div>
    <div class="group ms__button--right">
      <button class="ms__button" @click="submitParticipant">Update</button>
    </div>
    <!-- <v-dialog height="auto"
				width="auto"
				:adaptive="true"/> -->
    <!-- <modal 
				name="modal-success"
				height="auto"
				width="50%"
				:adaptive="true"
				>
				<modal-success></modal-success>
			</modal> -->
  </div>
</template>
<script>
import {vuex_mixin} from '../../utils/mixins/mixins'
import Dropdown from '../../components/InputDropdown.vue'
import ProfileInput from '../../components/InputProfile.vue'
import { filterObj, isNil, findDuplicate, unMaskDOB, unMaskPhone } from '../../utils/helpers.js'
// import ModalSuccess from '../../components/modals/ModalSuccess.vue'
export default {
  name:'ProfileForm',
  mixins: [vuex_mixin],
  components: { Dropdown, ProfileInput },
  data(){
    return {
      showPh: false,
      showDOB: false,
      emptyValidateKeys : [],
      name: 'default',
      ddName:{
        education_name : 'education_name',
        ethnicity_name : 'ethnicity_name',
        income_name : 'income_name',
        occupation_name : 'occupation_name',
        handedness : 'handedness',
        metadata_tracking : 'metadata_tracking'
      },
      inputName:{
        firstname : 'firstname',
        lastname : 'lastname',
        email : 'email',
        phone : 'phone',
        dob : 'dob'
      },
      handedness: [
        {id: 'left',name: 'Left'},
        {id: 'right',name: 'Right'},
        {id: 'ambidextrous',name: 'Ambidextrous'}
      ],
      educations: [
        {
          "name": "Grammar School",
          "id": 1,
        },
        {
          "name": "High School Or Equivalent",
          "id": 2,
        },
        {
          "name": "Vocational / Technical School (2 year)",
          "id": 3,
        },
        {
          "name": "Some College",
          "id": 4,
        },
        {
          "name": "Bachelors Degree",
          "id": 5,
        },
        {
          "name": "Masters Degree",
          "id": 6,
        },
        {
          "name": "Doctoral Degree",
          "id": 7,
        },
        {
          "name": "Professional Degree (MD, JD, etc)",
          "id": 8,
        },
        {
          "name": "Other Qualification",
          "id": 9,
        },
        {
          "name": "Prefer Not To Answer",
          "id": 10,
        }
      ],
      ethnicities: [
          {
            "name": "White / Caucasian",
            "id": 1,
          },
          {
            "name": "Hispanic",
            "id": 2,
          },
          {
            "name": "African American",
            "id": 3,
          },
          {
            "name": "Asian",
            "id": 4,
          },
          {
            "name": "Native American",
            "id": 5,
          },
          {
            "name": "Pacific Islander",
            "id": 6,
          },
          {
            "name": "Other",
            "id": 7,
          },
          {
            "name": "Prefer Not To Answer",
            "id": 8,
          }
      ],
      incomes: [
        {
          "name": "No Income - $0/year",
          "id": 1,
        },
        {
          "name": "Up to $20k/year",
          "id": 2,
        },
        {
          "name": "Up to $45k/year",
          "id": 3,
        },
        {
          "name": "Up to $70k/year",
          "id": 4,
        },
        {
          "name": "Up to $95k/year",
          "id": 5,
        },
        {
          "name": "Up to $120k/year",
          "id": 6,
        },
        {
          "name": "Up to $145k/year",
          "id": 7,
        },
        {
          "name": "Over $145k/year",
          "id": 8,
        },
        {
          "name": "Prefer Not To Answer",
          "id": 9,
        }
    ],
    occupations: [
        {
          "name": "Manager or Administrator",
          "id": 1,
        },
        {
          "name": "Professional (Doctor, Nurse, Lawyer, Secretary, etc)",
          "id": 2,
        },
        {
          "name": "Tradesperson (Electrician, Plumber, etc)",
          "id": 3,
        },
        {
          "name": "Retail (Cashier, Stocker, etc)",
          "id": 4,
        },
        {
          "name": "Industrial Laborer (Machine Operator, Construction Worker, etc)",
          "id": 5,
        },
        {
          "name": "Technical (Computer Technician, Graphic Designer, Programmer, etc)",
          "id": 6,
        },
        {
          "name": "Government",
          "id": 7,
        },
        {
          "name": "Education / Teaching",
          "id": 8,
        },
        {
          "name": "Stay At Home Parent / Household Duties",
          "id": 9,
        },
        {
          "name": "Student",
          "id": 10,
        },
        {
          "name": "Retired",
          "id": 11,
        },
        {
          "name": "Not Currently Employed",
          "id": 12,
        },
        {
          "name": "Other Occupation",
          "id": 13,
        },
        {
          "name": "Prefer Not To Answer",
          "id": 14,
        }
    ],
      metadata_tracking : [
        {id: 'SearchEngine',name: 'Search Engine (Google, Bing, etc.)'},
        {id: 'Pandora',name: 'Pandora'},
        {id: 'Article',name: 'Article / Blog'},
        {id: 'Facebook',name: 'Facebook'},
        {id: 'Twitter',name: 'Twitter'},
        {id: 'OtherSM',name: 'Other Social Media'},
        {id: 'WordOfMouth',name: 'Word of Mouth'},
        {id: 'doNYC',name: 'doNYC'},
        {id: 'Craigslist',name: 'Craigslist'},
        {id: 'DirectMail',name: 'Direct Mail'},
        {id: 'Radio',name: 'Radio'},
        {id: 'University',name: 'University'},
        {id: 'Friend',name: 'Friend'},
        {id: 'Other',name: 'Other'}
      ]
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
			this.fetchEducations()
			this.fetchEthnicities()
			this.fetchIncomes()
			this.fetchOccupations()
    },
    submitParticipant () {
      if(this.validateContact()){
        const contactKeys = ['dob','email','firstname','gender','lastname','phone']
        this.currentUser.participant.points_available = 1000
        this.getUpdateParticipant({ participant: this.currentUser.participant, contact: filterObj(contactKeys, this.currentUser.profile) })
            .then(response => {
              console.log('response:',response)
              let status = response.status
              console.log('status:',status)
              if(status === 'OK') {
                  this.$modal.show('dialog', {
                      title: 'Success!',
                      text: 'Your profile has been updated!',
                      buttons: [
                        {
                          title: 'Close',
                          default: true
                        }
                      ]
                  })
                  this.getPoints(this.currentUser.participant.points_available)
              }
            })
      } else {
        console.log('else in submitParticipant():')
        this.$modal.show('dialog', {
                      title: 'Missing Information',
                      text: 'Please ensure this form is filled out before updating your profile.',
                      buttons: [
                        {
                          title: 'Close',
                          default: true
                        }
                      ]
                  })
      }
    },
    addPoints(points){
      console.log('points:',points)
     let pointsObj = {points_available : points}
      console.log('pointsObj:',pointsObj)
      this.getUpdateParticipant({participant: pointsObj,contact})
          .then(response =>{
            console.log('response:',response)
          })
    },
    validateContact () {
      // console.log('this.currentUser.profile:',this.currentUser.profile)
      let userProfile = this.currentUser.profile
      const emptyKeysInProfile = Object.keys(userProfile).filter(function(key) {
					return isNil(userProfile[key])
      })
      console.log('emptyKeysInProfile.length:',emptyKeysInProfile.length)
      if(emptyKeysInProfile.length > 1) {
        emptyKeysInProfile.forEach(element => {
          console.log('element:',element)
          if(element != 'can_sms') this.emptyValidateKeys.push(element) 
        })
        console.log('this.emptyValidateKeys:',this.emptyValidateKeys)
      }else {
        console.log('else in validateContact():')
        if(isNil(this.currentUser.contact.phone)) this.currentUser.contact.phone = unMaskPhone(this.currentUser.profile.phone)
        if(isNil(this.currentUser.contact.dob)) this.currentUser.contact.dob = unMaskDOB(this.currentUser.profile.dob)
        return true
      }
    }
  }
}
</script>

