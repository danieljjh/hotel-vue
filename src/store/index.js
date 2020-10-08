/* eslint space-before-function-paren: ["error", "never"] */

import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 存储token
        Authorization: localStorage.getItem("Authorization") ? localStorage.getItem("Authorization") : "",
        UserIdt: localStorage.getItem("Idt") ? localStorage.getItem("Idt") : {}
    },
    mutations: {
        // 修改token，并将token存入localStorage
        setToken(state, user) {
            console.log("store..", user, typeof (user), "end")
            state.Authorization = user.Authorization
            state.UserIdt = user.Idt
        }
    },
    getters: {
        getAuthToken: state => {
            return state.Authorization
        },
        getUserInfo: state => {
            console.log("state.userIdt", state.userIdt)
            if (state.userIdt !== undefined) {
                return JSON.parse(state.UserIdt)
            } else {
                return null
            }
        }
    },
    actions: {},
    modules: {}
})
