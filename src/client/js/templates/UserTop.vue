<template>
<div>
    <h1 class="title">{{ $t('page.userTop') }}</h1>
  <p v-if="isAuth">{{ $t('msg.signInGreeting', { name: userName }) }}</p>
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
        ? this.$t('term.guestUser')
        : this.$store.state.auth.user.name
    },
  },

  created() {
  },

  methods: {
  },
}
</script>
