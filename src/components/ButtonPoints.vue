<template>
  <div>
    <div class="pointsNav" data-toggle="tooltip" data-placement="bottom" title="Points">
      <router-link to='/points' class="button is-info">
        <span class="icon">
          <i class="fa fa-star"></i>
        </span>
        <span class="pointCount" v-show="pointNumber">{{pointCount}}</span>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PointsNav',
  data () {
    return {
      showCheckout:false,
      pointNumber: false
    }
  },
  computed: {
    pointCount(){
      // this.pointNumber = true;
      // return 1001
      let points = this.$store.getters.points.points_available;
      if(points > 0){
        this.pointNumber = true
      }
			return points
    }
  },
  methods: {
  
  }
}
</script>