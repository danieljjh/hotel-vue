/* eslint space-before-function-paren: ["error", "never"] */

import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 存储token
        Authorization: localStorage.getItem("Authorization") ? localStorage.getItem("Authorization") : "",
        user: localStorage.getItem("Idt") ? JSON.parse(localStorage.getItem("Idt")) : null
    },
    mutations: {
        setToken(state, user) {
            state.Authorization = user.Authorization
            state.user = user.Idt
        }
    },
    getters: {
        getAuthToken: state => {
            return state.Authorization
        },
        getUserInfo: state => {
            // console.log("store state.userIdt", state.user)
            return state.user
        }
    },
    actions: {},
    modules: {}
})
