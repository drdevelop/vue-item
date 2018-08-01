import Vue from 'vue'
import http from '../../utils/HttpClient'
import router from '../../router/index'

const state = {
	a: 1,
	b: 2
}

const mutations = {
	login: (data, formData) => {
			formData.grant_type = 'password'
			http.post('User/Login', formData).then(response => {
				console.log(response)
				if(response.code < 1){
					
				}
				// router.push({name: 'home'})
			})
	}
}

const actions = {
	login: (store, params) => {
		store.commit('login', params)
	}
}

export default {
	state,
	mutations,
	actions
}