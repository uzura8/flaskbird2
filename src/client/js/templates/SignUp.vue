<template>
<div class="signup">
  <h1 class="title">Sign Up</h1>

  <div class="field">
    <label class="label">Name</label>
    <div class="control has-icons-left has-icons-right">
      <input class="input" type="text" placeholder="Name" v-model="name">
    </div>
  </div>

  <div class="field">
    <label class="label">Email</label>
    <div class="control has-icons-left has-icons-right">
      <input class="input" type="text" placeholder="Email" v-model="email">
    </div>
  </div>

  <div class="field">
    <label class="label">Password</label>
    <div class="control has-icons-left has-icons-right">
      <input class="input" type="password" placeholder="Password" v-model="password">
    </div>
  </div>

  <div class="field is-grouped">
    <div class="control">
      <button class="button is-link" @click="signUp">Register</button>
    </div>
  </div>

  <p>Do you have an account? 
    <router-link to="/signin">sign in now!!</router-link>
  </p>
</div>
</template>

<script>
import { User } from '../api/'

export default {
  name: 'Signup',
  data () {
    return {
      name: '',
      email: '',
      password: '',
    }
  },
  methods: {
    signUp: function () {
      const vals = {
        name: this.name,
        email: this.email,
        password: this.password,
      }
      User.create(vals)
       .catch(err => {
         this.$toast.open({
           message: err.message,
           type: 'is-danger',
           duration: 5000,
           position: 'is-bottom',
         })
       })
       .then(() => {
       })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.signup {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center
}
</style>
