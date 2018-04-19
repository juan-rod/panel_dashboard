<template>
	<div id="rewards" class="rewards">
			<div class="rewards__card" v-for="product in allProducts" :key="product.id">
				<card :title="product.name" :body="body" :footer="product.category">
					<rewards-body class="rewards__body" :product="product"></rewards-body>						
				</card>
			</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions} from 'vuex'
import Card from '../../components/Card.vue'
import RewardsBody from './RewardsBody.vue'
export default {
	name:'rewards',
	components:{Card, RewardsBody},
	data(){
		return {
			title: 'Rewards',
			body:'',
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
	mounted(){
		// this.init()
	},
	methods: {
		...mapActions([
				'addToCart',
				'showConstruction'
		])
	} 
	
}
</script>
