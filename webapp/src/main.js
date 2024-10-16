import Vue from "vue"
import Vuex from "vuex"
import App from "./App.vue"
import router from "./router"
import vuetify from "./plugins/vuetify"
import './plugins/sweetalert'

Vue.config.productionTip = false
Vue.use(Vuex)

new Vue({
  el: "#app",
  router,
  vuetify,
  mounted() {
    require('./store')
  },
  render: h => h(App)
})