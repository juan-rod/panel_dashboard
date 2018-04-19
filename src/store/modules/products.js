import Vue from 'vue'
import { router } from '../../router/router'

const state = {
  points:{
		points_available: 0,
		points_redeemed: 0
	},
	rewards:{
      added: [],
      products: [
        {
          id: 'bcd755a6-9a19-94e1-0a5d-426c0303454e',
          name: 'Amazon e-Gift Card',
          price: 10,
          category: 'Electronic Gift Card',
          img: '../dist/images/amazon_gift_card.png',
          points: 1200,
          desc: 'A $10 Amazon e-Gift Card (Sent via email)',
          legal:'legal text. dont steal. stealing is bad. we dont own anything.',
          showLegal: true,
          delivery: 'Instant'
        },
        {
          id: 'bcd755a6-9a19-94e1-0a5d-426c0303454a',
          name: 'Charity Donation',
          price: 25,
          category: 'Charity Donation',
          img: '../dist/images/nyc_food_bank.png',
          points: 1100,
          desc: 'Donation to Food Bank for New York City equals $25 worth of nutritious food or 50 meals.',
          legal:'legal text. dont steal. stealing is bad. we dont own anything.',
          showLegal: true,
          delivery: 'Instant'
        },
        {
          id: 'bcd755a6-9a19-94e1-0a5d-426c0303454b',
          name: 'Fandango Movie Gift Card',
          price: 15,
          category: 'Electronic Gift Card',
          img: '../dist/images/fandango.png',
          points: 1800,
          desc: 'A $15 e-Gift Card to Fandango movies (Sent via email)',
          legal:'legal text. dont steal. stealing is bad. we dont own anything',
          showLegal: false,
          delivery: 'Instant'
        },
        {
          id: 'bcd755a6-9a19-94e1-0a5d-426c0303454c',
          name: '$25 Gift Card',
          price: 25,
          category: 'Electronic Gift Card',
          img: '../dist/images/amex.png',
          points: 3200,
          desc: 'A $25 AMEX gift card',
          legal:'legal text. dont steal. stealing is bad. we dont own anything',
          showLegal: false,
          delivery: 'Instant'
        },
        {
          id: 'bcd755a6-9a19-94e1-0a5d-426c0303454d',
          name: '$20 Gift Card',
          price: 20,
          category: 'Electronic Gift Card',
          img: '../dist/images/amex.png',
          points: 2600,
          desc: 'A $20 AMEX gift card',
          legal:'legal text. dont steal. stealing is bad. we dont own anything',
          showLegal: false,
          delivery: 'Instant'
        }
      ]
  },
}

const getters = {
	allProducts : state => state.rewards.products, // would need action/mutation if data fetched async
	getNumberOfProducts : state => (state.rewards.products) ? state.rewards.products.length : 0,
	cartProducts : state => {
	    return state.rewards.added.map(({ id, quantity }) => {
        const product = state.rewards.products.find(p => p.id === id)
	      return {
          id: product.id,
	        name: product.name,
          price: product.price,
	        points: product.points,
	        quantity
	      }
	    })
  },
  points: state => state.points

}

const actions = {
	setUser ({commit},user){
		commit("SET_USER", user);
	},
	addToCart ({ commit }, product){
    	commit('ADD_TO_CART', {id: product.id})
  },
  removeFromCart ({ commit }, product){
    	commit('REMOVE_FROM_CART', {id: product.id})
  },
  getPoints ({commit}, points) {
		return new Promise((resolve, reject) =>{
			if(!points){
				reject("points is empty")
			} else {
				commit('SET_POINTS', points)
				resolve (points)
			}
		})
	}
}

const mutations = {
	SET_USER(state, user){
    state.currentUser = user
  },
  ADD_TO_CART(state, { id }) {
    // console.log('id:',id)
    const record = state.rewards.added.find(p => p.id === id)
    if (!record) {
      state.rewards.added.push({
        id,
        quantity: 1
      })
    } else {
      record.quantity++
    }
  },
  REMOVE_FROM_CART(state, { id }) {
    const record = state.rewards.added.find(p => p.id === id)
    let index = state.rewards.added.indexOf(record)
    if (record.quantity <= 0) {
      state.rewards.added.splice(index, 1);
    } else {
      record.quantity--
    }
  },
  SET_POINTS(state,data) {
    state.points.points_available = data
  }
	
}
export default {
  state,
  getters,
  actions,
  mutations
}
