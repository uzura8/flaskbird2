import 'es6-promise/auto'
import Vue from 'vue'
import router from '@/router'
import i18n from '@/i18n'
import store from '@/store'
import '@/sanitize'
import '@/bootstrap-vue'
import '@/common'
import App from '@/App'

import mixin from '@/mixins/site'
Vue.mixin(mixin)

import * as filters from '@/filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})

