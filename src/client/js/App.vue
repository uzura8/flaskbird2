<template>
<div>
  <fb-navbar />
  <div class="container" v-cloak>
    <b-loading :active="isLoading" :is-full-page="true" :canCancel="true"></b-loading>
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import FbNavbar from '@/components/organisms/FbNavbar'

export default {
  name: 'App',

  components: {
    FbNavbar,
  },

  computed: {
    isLoading () {
      return this.$store.state.common.isLoading
    },
  },

  created: function () {
  },

  methods: {
  },
}
</script>
