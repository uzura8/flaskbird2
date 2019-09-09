<template>
<div>
  <h1 class="title">Member Top</h1>
  <p>Hi, {{$store.state.auth.user.name}}!</p>
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
