import 'es6-promise/auto'
import config from '@/config/config'
import Vue from 'vue'
import store from '@/store'
import i18n from '@/i18n'
import App from '@/AppIncluded'

import Firebase from '@/firebase'
if (config.firebase.isEnabled) Firebase.init()

import mixin from '@/mixins/include'
Vue.mixin(mixin);

import * as filters from '@/filters';
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

new Vue({
  el: '#app',
  store,
  i18n,
  render: h => h(App)
})
