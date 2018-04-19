<template>
  <div>
    <div class="cartNav" data-toggle="tooltip" data-placement="bottom" title="Cart">
      <router-link to='/cart' class="button is-info">
        <span class="icon">
          <i class="fa fa-shopping-cart"></i>
        </span>
        <span v-if="showCheckout">Checkout </span>
        <span class="itemsInCart" v-show="itemNumber">{{itemsInCart}}</span>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CartNav',
  data () {
    return {
      showCheckout:false,
      itemNumber: false
    }
  },
  computed: {
    itemsInCart(){
      let cart = this.$store.getters.cartProducts;
      // console.log('cart:',cart)
      if(cart.length > 0){
        this.itemNumber = true
      }
			return cart.reduce((accum, item) => accum + item.quantity, 0)
    }
  },
  methods: {
  
  }
}
</script>

