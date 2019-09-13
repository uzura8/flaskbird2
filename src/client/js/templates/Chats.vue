<template>
<div>
  <h1 class="title">Chats</h1>
  <p v-if="isAuth">Hi, {{$store.state.auth.user.name}}!</p>
</div>
</template>

<script>

export default{
  data(){
    return {
    }
  },

  created() {
  },

  methods: {
  },
}
</script>
