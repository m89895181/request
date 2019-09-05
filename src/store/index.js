/*
 * @Author: 苑振东 
 * @Date: 2019-09-04 19:50:05 
 * @Last Modified by: 苑振东
 * @Last Modified time: 2019-09-05 09:00:40
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import music from './music'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        user,
        music
    }
})