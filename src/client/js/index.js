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

import util from './util'
import listener from './listener'
import config from './config'
Vue.mixin({
  computed: {
    isAuth: function () {
      return this.$store.state.auth.state
    },
  },
  methods: {
    siteUri: config.uri,
    getConfig: config.get,
    isEmpty: util.common.isEmpty,
    inArray: util.arr.inArray,
    listen: listener.listen,
    destroyed: listener.destroyed,
    showGlobalError: function(msg) {
      this.$buefy.toast.open({
        message: msg,
        type: 'is-danger',
        duration: 5000,
        position: 'is-bottom',
      })
    },
    handleApiError: function(err, defaultMsg='') {
      if (err.response != null && err.response.status == 401) {
        store.dispatch('resetAuth')
        this.$router.push({
          path: '/signin',
          query: { redirect: this.$route.fullPath }
        })
      }
      if (typeof this.setErrors == 'function'
        && !this.isEmpty(err.response.data.errors)) {
        this.setErrors(err.response.data.errors)
      }
      if (err.response.data.message != null) {
        this.showGlobalError(err.response.data.message)
      } else if (defaultMsg) {
        this.showGlobalError(defaultMsg)
      } else {
        this.showGlobalError('Server error')
      }
    },
    signOut: function () {
      store.dispatch('signOut')
        .then(() => {
          router.push({ path: '/signin' })
        })
        .catch(err => {
          this.handleApiError(err, 'Sign Out failed')
        })
    },
  },
});

Vue.filter('numFormat', function (num) {
  num = parseInt(num)
  if (isNaN(num)) return 0
  return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
});
Vue.filter('substr', function (text, num) {
  return util.substr(text, num, '...')
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

