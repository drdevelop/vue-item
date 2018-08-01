import Vue from 'vue'
import Vuex from 'vuex'

import dic from '../utils/dictionary'

import login from '../components/login/Login'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        dic
    },
    modules: {
    	login
    }
})