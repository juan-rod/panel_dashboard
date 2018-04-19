<template>
  <div>
       <div class="col-12 rewards__card--points sm__icon ">
           <p> <i class="fa fa-sm fa-star"></i>
            {{product.points}}</p>
        </div>
        <div class="col-12 rewards__card--img ">
          <img :src="product.img" :alt="product.name">
        </div>
        <div class="col-12 rewards__card--body ">
            <p>{{product.desc}}</p>
        </div>
        <div class="col-12 ms__button--right rewards__card--btn ">
            <button @click='addToCart(product); btnClick(product.id)' class='ms__button' :class="{active: isActive}" data-toggle="tooltip" data-placement="bottom" title="Add to Cart"><i class="fa fa-shopping-cart"></i></button>
        </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions} from 'vuex'
export default {
  name: 'RewardsBody',
  props: {
    product: Object
  },
  data () {
    return {
        isActive: false
    }
  },
  computed: {
    ...mapGetters([
        'allProducts',
        'getNumberOfProducts',
        'cartProducts'
    ])
  }, 
  methods:{
    ...mapActions([
	    'addToCart'
	  ]),
      btnClick (product) {
        // console.log("product:",product)
	      this.isActive = !this.isActive
      }
  }
}
</script>

