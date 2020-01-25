<template>
<div>
  <eb-navbar />
  <div class="container" v-cloak>
    <main class="section">
      <b-loading :active="isLoading" :is-full-page="true" :canCancel="true"></b-loading>
      <router-view></router-view>
    </main>
  </div>
</div>
</template>

<script>
import EbNavbar from '@/components/organisms/EbNavbar'

export default {
  name: 'App',

  components: {
    EbNavbar,
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
