<template>
<div>
		<div class="cardTemp">
			<div class="cardTemp__header">
				<div class="login__form--heading" v-if="isLogin">
					<h2>{{title}}</h2>
					<p>{{subtitle}}</p>
				</div>
				<p v-else>{{title}}</p>
			</div>
			<div class="cardTemp__body">
				<slot>
					<p>{{body}}</p>
				</slot>
			</div>
			<div class="cardTemp__footer">
				<div class="login__form--panel" v-if="isLogin">
					<div class="panel-heading">
						{{footer.question}}
							<span>
								<router-link :to="{path: footer.link}">{{footer.direction}}</router-link>
							</span>
					</div>
				</div>
				<p v-else>{{footer}}</p>
			</div>
		</div>
		</div>
</template>
<script>
export default {
	name: 'card-temp',
	props: {
		title: String,
		subtitle: String,
	  body: String,
	  footer: [String, Object]
	},
	data () {
		return {
			isLogin: false
		}
	},
	created () {
		let path = this.$route.path
				path = path.replace(/\//g, '')
				// console.log("path:",path)

				if (['dashboard-login', 'register', 'reset'].indexOf(path) >= 0) {
						// console.log("hello from cardTemp first")
						this.isLogin = true
				}
				if(path.includes('reset')){
					// console.log("it does! include reset:", path)
					this.isLogin = true
				}
	}
}
</script>
<style lang="sass">
</style>