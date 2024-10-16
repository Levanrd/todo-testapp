import Vue from "vue"
import Router from "vue-router"

import Alpha from '../apps/alpha/'

Vue.use(Router)

let routes = []
.concat(Alpha.routes)

export default new Router({ routes })