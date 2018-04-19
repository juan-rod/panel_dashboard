<template>
  <div id="cart" class="cart">
      <card :title="title" :body="body" :footer="footer">
        <p v-show="!products.length">
        	<i>Your cart is empty!</i>
        	<router-link to="/rewards">Go shopping</router-link>
        </p>
        <div class="cart-table">
          <table class="table is-striped" v-show="products.length">
          	<thead>
          		<tr>
          			<td>Name</td>
          			<td style="text-align:center;">Points</td>
          			<td style="text-align:center;">Quantity</td>
          		</tr>
          	</thead>
          	<tbody>
          		<tr v-for="p in products" :key="p.id">
              		<td>{{ p.name }}</td>
              		<td style="text-align:center;"><i class="fa fa-sm fa-star"></i> {{ p.points }}</td>
              		<td style="text-align:center;">
                    <button class="quantity__btn" @click="addToCart(p)"><i class="fa fa-sm fa-plus" aria-hidden="true" style="font-size: .85em;opacity: .85;"></i></button>
                    {{ p.quantity }}
                    <!-- {{ quantity }} -->
                   <button class="quantity__btn" @click="removeFromCart(p)"><i class="fa fa-sm fa-minus" aria-hidden="true" style="font-size: .85em;opacity: .85;"></i></button>
                  </td>
              	</tr>
              	<tr>
              		<td><b>Total:</b></td>
              		<td style="text-align:center;"><b><i class="fa fa-sm fa-star"></i>{{ total }}</b></td>
              		<td style="text-align:center;">{{ totalQuantity }}</td>
              	</tr>
          	</tbody>
          </table>
        <div class="ms__button--right">
          <button v-show="products.length" class='btn btn-primary ms__button' @click='checkout'>Checkout</button>
        </div>
        </div>
      </card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Card from '../../components/Card.vue'
export default {
  name:'cart',
  components:{ Card },
  data(){
    return{
      title:'Your Cart',
      body: '',
      footer:''
    }
  },
  computed: {
    ...mapGetters({
      products: 'cartProducts'
    }),
    totalQuantity () {
      return this.products.reduce((total, p) => {
        return total += p.quantity
      }, 0)
    },
    total () {
      return this.products.reduce((total, p) => {
        return total + p.points * p.quantity
      }, 0)
    }
  },
  mounted (){
    // this.init()
  },
  methods: {
    ...mapActions([
      'showConstruction',
      'addToCart',
      'removeFromCart'
		]),
  	checkout(){
  		alert('Pay us $' + this.total)
    }
  }
}
</script>
<style scoped>
</style>