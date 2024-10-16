import Vue from "vue"
import Vuex from "vuex"
import authServices from "../services/authServices"

export const store = new Vuex.Store({
  state: {
    isAdmin: JSON.parse(localStorage.getItem("isAdmin")) || false,
    token: localStorage.getItem("token") || '',
    role: localStorage.getItem("role") || ''
  },

  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    clearToken(state) {
      state.token = ''
      localStorage.removeItem('token')
    },
    setRole(state, role) {
      state.role = role
      localStorage.setItem('role', role)
      state.isAdmin = role === 'admin'
      localStorage.setItem('isAdmin', JSON.stringify(state.isAdmin))
    },
    clearRole(state) {
      state.role = ''
      localStorage.removeItem('role')
      state.isAdmin = false
      localStorage.removeItem('isAdmin')
    }
  },

  actions: {
    async login({ commit }, { email, password }) {
      try {
        const data = await authServices.login(email, password)
        commit('setToken', data.token)
        const decoded = JSON.parse(atob(data.token.split('.')[1]))
        commit('setRole', decoded.role)
      } catch (error) {
        console.error('Error logging in:', error)
        throw error
      }
    },
    logout({ commit }) {
      commit('clearToken')
      commit('clearRole')
    }
  },

  getters: {
    isAdmin: state => state.isAdmin,
    isAuthenticated: state => !!state.token,
    userRole: state => state.role
  }
})

Vue.prototype.$store = store