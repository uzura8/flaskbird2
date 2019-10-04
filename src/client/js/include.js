import Vue from 'vue'
import 'es6-promise/auto'
import App from './AppIncluded'
import store from './store'
import config from './config/config'

import Firebase from './firebase'
if (config.firebase.isEnabled) Firebase.init()

import mixin from './mixins/include'
Vue.mixin(mixin);

import moment from 'moment'
import 'moment/locale/ja'
moment.locale('en');
Vue.filter('dateFormat', function (date, format='LLL') {
  return moment(date).format(format);
});

import * as filters from './filters';
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
