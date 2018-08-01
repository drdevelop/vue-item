import Vue from 'vue'
import VueRouter from 'vue-router'
import http from '../utils/HttpClient'

import HomeComponent from '../components/home/home.vue'
import LoginComponent from '../components/login/login.vue'
import Clients from '../components/clients/clients.vue'
import Client from '../components/client/client.vue'
import PageNotFound from '../components/pagenotfound/pagenotfound.vue'
import UsersComponent from '../components/users/users.vue'
import UserComponent from '../components/user/user.vue'
import AuthsComponent from '../components/auths/auths.vue'
import AuthComponent from '../components/auth/auth.vue'
import PositionsComponent from '../components/positions/positions.vue'
import PositionComponent from '../components/position/position.vue'
import AutocodesComponent from '../components/autocodes/autocodes.vue'
import AutocodeComponent from '../components/autocode/autocode.vue'
import SuppliersComponent from '../components/suppliers/suppliers.vue'
import SupplierComponent from '../components/supplier/supplier.vue'

Vue.use(VueRouter)

const router = new VueRouter({
	routes: [{
		path: '/',
		name: 'home',
		component: HomeComponent,
		children: [{
			path: '/clients',
			name: 'clients',
			component: Clients
		},{
			path: '/client/:id',
			name: 'client',
			component: Client
		},{
			path: '/users',
			name: 'users',
			component: UsersComponent
		},{
			path: '/user/:id',
			name: 'user',
			component: UserComponent
		},{
			path: '/auths',
			name: 'auths',
			component: AuthsComponent
		},{
			path: '/auth/:id',
			name: 'auth',
			component: AuthComponent
		},{
			path: '/positions',
			name: 'positions',
			component: PositionsComponent
		},{
			path: '/position/:id',
			name: 'position',
			component: PositionComponent
		},{
			path: '/autocodes',
			name: 'autocodes',
			component: AutocodesComponent
		},{
			path: '/autocode/:id',
			name: 'autocode',
			component: AutocodeComponent
		},{
			path: '/suppliers',
			name: 'suppliers',
			component: SuppliersComponent
		},{
			path: '/supplier/:id',
			name: 'supplier',
			component: SupplierComponent
		},{
			path: '**',
			name: '404',
			component: PageNotFound
		}]
	},{
		path: '/login',
		name: 'login',
		component: LoginComponent
	}]
})

// 对将要进入的路由进行权判断
router.beforeEach((to, from, next) =>{
	// console.log(to);
	if(to.path.indexOf('login') < 0 && !window.localStorage.getItem('access_token')){
		router.replace('login');
		next();
	} 
	next();
})

export default router