import store from '@/store'
import listener from '@/listener'
import util from '@/util'
import config from '@/config/config'

export default {
  computed: {
    isFirebaseEnabled: function () {
      return config.firebase.isEnabled
    },

    isAuth: function () {
      return this.$store.state.auth.state
    },

    isAnonymous: function () {
      return this.$store.getters.checkUserType('anonymous')
    },

    isAdmin: function () {
      return this.$store.getters.checkUserType('admin')
    },

    authUserId: function () {
      return this.$store.state.auth.state ? this.$store.state.auth.user.id : 0
    },
  },

  methods: {
    siteUri: util.site.uri,
    isEmpty: util.common.isEmpty,
    inArray: util.arr.inArray,
    listen: listener.listen,
    destroyed: listener.destroyed,

    showGlobalMessage: function(msg, type='is-danger', pos='is-bottom', duration=5000) {
      this.$buefy.toast.open({
        message: msg,
        type: type,
        duration: duration,
        position: pos,
      })
    },

    handleApiError: function(err, defaultMsg='') {
      if (err != null && err.response != null && err.response.status == 401) {
        store.dispatch('resetAuth')
        this.showGlobalMessage('Required to auth')
      }
      if (typeof this.setErrors == 'function'
        && !this.isEmpty(err)
        && !this.isEmpty(err.response.data.errors)) {
        this.setErrors(err.response.data.errors)
      }
      if (err.response != null
        && err.response.data.message != null) {
        this.showGlobalMessage(err.response.data.message)
      } else if (defaultMsg) {
        this.showGlobalMessage(defaultMsg)
      } else {
        this.showGlobalMessage('Server error')
      }
    },

    signOut: function () {
      store.dispatch('signOut')
        .then(() => {
          this.showGlobalMessage('Signed out', 'is-success')
        })
        .catch(err => {
          this.handleApiError(err, 'Sign Out failed')
        })
    },
  },
}
