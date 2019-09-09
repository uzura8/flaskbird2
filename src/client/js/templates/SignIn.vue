<template>
<div class="signin">
  <h1 class="title">Sign in</h1>

  <b-field label="Email"
    :type="isEmpty(errors.email) ? '' : 'is-danger'"
    :message="isEmpty(errors.email) ? 'Used for Sign In' : errors.email[0]">
    <b-input type="email"
      v-model="email"
      icon="envelope"
      icon-pack="fas"
      @blur="validate('email')"
      placeholder="Email">
    </b-input>
  </b-field>

  <b-field label="Password"
    :type="isEmpty(errors.password) ? '' : 'is-danger'"
    :message="isEmpty(errors.password) ? 'Used for Sign In' : errors.password[0]">
    <b-input type="password"
      v-model="password"
      :password-reveal="true"
      icon="lock"
      icon-pack="fas"
      @blur="validate('password')"
      placeholder="Password">
    </b-input>
  </b-field>

  <div class="field is-grouped">
    <div class="control">
      <button
        class="button is-link"
        :disabled="hasErrors"
        @click="signIn">Sign In</button>
    </div>
  </div>

  <p>You don't have an account? 
    <router-link to="/signup">create account now!!</router-link>
  </p>
</div>
</template>

<script>
import { User } from '../api/'
import str from '@/util/str'

export default {
  name: 'SignIn',
  data () {
    return {
      errors: {},
      email: '',
      password: '',
    }
  },

  computed: {
    hasErrors: function() {
      let hasError = false
      Object.keys(this.errors).map(field => {
        if (this.errors[field].length > 0) hasError = true
      })
      return hasError
    },
  },

  created: function() {
    //if (this.$store.state.auth.state) {
    //  this.$router.push('/member')
    //}
  },

  methods: {
    signIn: function() {
      this.validateAll()
      if (this.hasErrors) {
        this.showGlobalError('Correct inputs')
      } else {
        const vals = {
          email: this.email,
          password: this.password,
        }
        this.$store.dispatch('authenticate', vals)
          .then(() => {
            this.$router.push({ path: '/member' })
          })
          .catch(err => {
            this.setErrors(err.response.data.errors)
            this.showGlobalError('Sign In failed')
          })
      }
    },

    showGlobalError: function(msg) {
      this.$buefy.toast.open({
        message: msg,
        type: 'is-danger',
        duration: 5000,
        position: 'is-bottom',
      })
    },

    setErrors: function(errors) {
      const keys = Object.keys(this.errors)
      errors.map(err => {
        const field = err.param
        this.initErrors(field)
        this.errors[field].push(err.msg)
      })
    },

    validateAll: function() {
      ['email', 'password'].map(field => {
        this.validate(field)
      })
    },

    validate: function(field) {
      const key = 'validate' + str.capitalize(field)
      this[key]()
    },

    validateEmail: function() {
      this.initError('email')
      if (this.isEmpty(this.email)) this.errors.email.push('Email is required')
      if (!str.checkEmail(this.email)) this.errors.email.push('Email is not valid')
    },

    validatePassword: function() {
      this.initError('password')
      if (this.isEmpty(this.password)) {
        this.errors.password.push('Password is required')
      }
      if (this.password.length < 6) {
        this.errors.password.push('Password must be at least 6 characters')
      }
    },

    initError: function(field) {
      this.$set(this.errors, field, [])
    },

    initErrors: function(field) {
      const keys = Object.keys(this.errors)
      if (!this.inArray(field, keys)) {
        this.initError(field)
      }
    },

    throwReject (err) { return Promise.reject(err) }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.signin {
}
</style>
