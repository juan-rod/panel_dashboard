<template>
  <div class="points">
    <card :title="title" :body="body" :footer="footer">
      <p v-show="points.points_available <= 0">
        <i>It looks like you don't have any points yet!</i>
      </p>

    </card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Card from '../../components/Card.vue'
export default {
  name:'Points',
  components:{ Card },
  data () {
    return{
      title: 'Points',
			body:'',
			footer: ''
    }
  },
  computed:{
    ...mapGetters([
      'points'
    ]),
  },
  methods:{}

}
</script>

<style>

</style>
