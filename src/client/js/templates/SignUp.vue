<template>
<div class="signup">
  <h1 class="title">Sign Up</h1>

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

  <b-field label="Name"
    :type="isEmpty(errors.name) ? '' : 'is-danger'"
    :message="isEmpty(errors.name) ? 'Used for display name' : errors.name[0]">
    <b-input type="name"
      v-model="name"
      @blur="validate('name')"
      placeholder="Name">
    </b-input>
  </b-field>

  <div class="field is-grouped">
    <div class="control">
      <button
        class="button is-link"
        :disabled="hasErrors"
        @click="signUp">Register</button>
    </div>
  </div>

  <p>Do you have an account? 
    <router-link to="/signin">sign in now!!</router-link>
  </p>
</div>
</template>

<script>
import { User } from '../api/'
import str from '@/util/str'

export default {
  name: 'SignUp',

  data () {
    return {
      errors: {},
      name: '',
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
  },

  methods: {
    signUp: function() {
      this.validateAll()
      if (this.hasErrors) {
        this.showGlobalError('Correct inputs')
      } else {
        const vals = {
          name: this.name,
          email: this.email,
          password: this.password,
        }
        User.create(vals)
          .then((res) => {
            this.$store.dispatch('authenticate', vals)
              .then(() => {
                this.$router.push({ name:'UserTop' })
              })
              .catch(err => {
                this.setErrors(err.response.data.errors)
                this.showGlobalError('Sign In failed')
              })
          })
          .catch(err => {
            this.setErrors(err.response.data.errors)
            this.showGlobalError('Sign Up failed')
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
      ['email', 'password', 'name'].map(field => {
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

    validateName: function() {
      this.initError('name')
      if (this.isEmpty(this.name)) {
        this.errors.name.push('Name is required')
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.signup {
}
</style>
