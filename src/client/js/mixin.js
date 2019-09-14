import store from './store'
import router from './router'
import listener from './listener'
import config from './config'
import util from './util'

export default {
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
}
