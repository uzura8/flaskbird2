<template>
<div class="container" v-cloak>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <a class="navbar-item" href="">
      <router-link to="/" class="navbar-item">
        <img src="https://bulma.io/images/bulma-logo.png" alt="Sample Site" width="112" height="28">
      </router-link>
      </a>
      <div class="navbar-burger burger"
        v-bind:class="{'is-active': isHeaderMenuOpen}"
        @click="toggleHeaderMenuOpen()">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="navbar-menu" v-bind:class="{'is-active': isHeaderMenuOpen}">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">Top</router-link>
        <router-link to="/chats" class="navbar-item">Chat Rooms</router-link>
        <router-link v-if="!isAuth" to="/signup" class="navbar-item">Sign up</router-link>
        <router-link v-if="!isAuth" to="/signin" class="navbar-item">Sign in</router-link>
        <router-link v-if="isAuth" to="/user" class="navbar-item">User top</router-link>
        <a v-if="isAuth" class="navbar-item u-clickable" @click="signOut">Sign out</a>
        <router-link to="/about" class="navbar-item">About</router-link>
      </div>
    </div>
  </nav>
  <section class="section">
  <div class="container">
    <b-loading :active.sync="isLoading" :is-full-page="true" :canCancel="true"></b-loading>
    <router-view></router-view>
  </div>
  </section>
</div>
</template>

<script>
export default {
  name: 'App',

  computed: {
    isLoading () {
      return this.$store.state.common.isLoading
    },
    isHeaderMenuOpen: function () {
      return this.$store.state.common.isHeaderMenuOpen
    },
  },

  created: function () {
  },

  methods: {
    toggleHeaderMenuOpen: function () {
      this.$store.dispatch('setHeaderMenuOpen', !this.isHeaderMenuOpen)
    },
  },
}
</script>
