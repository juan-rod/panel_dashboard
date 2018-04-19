import store from '../store/store'

/////// dashboard //////
import DashLogin from '../pages/Login/Login.vue'
import DashLoginForm from '../pages/Login/LoginForm.vue'
import DashLoginFormRegister from '../pages/Login/LoginFormRegister.vue'
import DashLoginFormResetPass from '../pages/Login/LoginFormResetPassword.vue'
import DashLoginFormVerify from '../pages/Login/LoginFormVerify.vue'
import DashHome from '../pages/Home/Home.vue'
import DashHomeView from '../pages/Home/HomeView.vue'
import DashProfile from '../pages/Profile/Profile.vue'
import DashRewards from '../pages/Rewards/Rewards.vue'
import DashSurveys from '../pages/Surveys/Surveys.vue'
import DashCart from '../pages/Cart/Cart.vue'
import DashPoints from '../pages/Points/Points.vue'
import DashSurveysPost from '../pages/Surveys/SurveysPost.vue'


export const routes = [
	{
		path:'/',
		component: DashHome,
		beforeEnter: (to, from, next) => {
			if(to.meta.auth){
				const isAuth = store.state.auth.currentUser.isAuth
				console.log('isAuth:',isAuth)
				if(isAuth){
					console.log("isAuth in beforeEach:",isAuth)
					next()
				}else{
					console.log("else isAuth in beforeEach:",isAuth)
					next({path: '/dashboard-login'})
				}
			}else{
				console.log("hello in else beforeEach")
				next()
			}  
		},
		meta: { auth: true },
		children:[
			{path: '', component: DashHomeView, meta:{auth:true}},
			{path: '/profile', component: DashProfile, meta:{auth:true}},
			{path: '/dashboard-rewards', component: DashRewards, meta:{auth:true}},
			{path: '/surveys', component: DashSurveys, meta:{auth:true}},
			{path: '/surveys/:posts', component: DashSurveysPost, props: true, meta: { auth: true }},
			{path: '/cart', component: DashCart, props: true, meta: { auth: true }},
			{path: '/points', component: DashPoints, props: true, meta: { auth: true }}
		]
	},
	{
		path:'/dashboard-login/',
		component: DashLogin,
		children: [
			{path: '', component: DashLoginForm, props: true},
			{path: '/register', component: DashLoginFormRegister, props: true},
			{path: '/reset', component: DashLoginFormResetPass, props: true},
			{path: '/reset/password/:id', component: DashLoginFormVerify, name:'reset-modal'}
		]
	}
]
