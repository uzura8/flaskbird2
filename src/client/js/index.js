import 'es6-promise/auto'
import Vue from 'vue'
import router from './router'
import store from './store'
import './common';

import Buefy from 'buefy'
Vue.use(Buefy)
//import { Loading, Toast } from 'buefy'
//Vue.use(Toast)
//Vue.use(Loading)

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
  computed: {
    isLoading () {
      return store.state.common.isLoading
    },
    isHeaderMenuOpen: function () {
      return store.state.common.isHeaderMenuOpen
    },
  },
  created: function () {
  },
  methods: {
    toggleHeaderMenuOpen: function () {
      store.dispatch('setHeaderMenuOpen', !this.isHeaderMenuOpen)
    },
  },
  store,
  router,
});

