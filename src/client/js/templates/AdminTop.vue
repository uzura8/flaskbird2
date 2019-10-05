<template>
<div>
  <h1 class="title">Admin Top</h1>
  <p>Hi, {{userName}} !</p>
  <p>
    <router-link to="/admin/chats/1">Chat</router-link>
  </p>
</div>
</template>

<script>

export default{
  data(){
    return {
    }
  },

  computed: {
    userName () {
      return this.isEmpty(this.$store.state.auth.user.name)
        ? 'GuestUser'
        : this.$store.state.auth.user.name
    },
  },

  created() {
  },

  methods: {
  },
}
</script>
