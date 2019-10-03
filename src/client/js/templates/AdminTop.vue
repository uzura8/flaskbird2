<template>
<div>
  <h1 class="title">Admin Top</h1>
  <p v-if="isAuth">Hi, {{userName}} !</p>
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
