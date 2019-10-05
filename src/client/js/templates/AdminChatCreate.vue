<template>
<div class="chatCreate">
  <h1 class="title">Create Chat Room</h1>
  <eb-chat-create-form :is-use-admin="true" />
</div>
</template>

<script>
import EbChatCreateForm from '@/components/organisms/EbChatCreateForm'

export default {
  name: 'ChatCreate',

  components: {
    EbChatCreateForm,
  },

  data () {
    return {
    }
  },

  computed: {
  },

  created: function() {
  },

  methods: {
  }
}
</script>

<style scoped>
</style>
