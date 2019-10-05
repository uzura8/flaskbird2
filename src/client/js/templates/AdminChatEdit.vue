<template>
<div class="chatEdit">
  <h1 class="title">Edit: {{ chat.name }}</h1>
  <eb-chat-create-form
    :chat-id="chatId"
    :is-use-admin="true"
    @loaded-chat="setChat" />
</div>
</template>

<script>
import EbChatCreateForm from '@/components/organisms/EbChatCreateForm'

export default {
  name: 'ChatEdit',

  components: {
    EbChatCreateForm,
  },

  data () {
    return {
      chat: {},
    }
  },

  computed: {
    chatId () {
      return this.$route.params.id
    },
  },

  created: function() {
  },

  methods: {
    setChat: function(chat) {
      this.chat = chat
    },
  }
}
</script>

<style scoped>
</style>

