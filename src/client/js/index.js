import 'es6-promise/auto'
import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'
import './common';

import Buefy from 'buefy'
Vue.use(Buefy)

import moment from 'moment'
import 'moment/locale/ja'
moment.locale('en');
Vue.filter('dateFormat', function (date, format='LLL') {
  return moment(date).format(format);
});

import mixin from './mixin'
Vue.mixin(mixin);

import * as filters from './filters';
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

