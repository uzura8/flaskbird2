<template>
  <div v-cloak>
    <eb-chat
      :isInclude="true"
      :chatId="chatId"
      @loaded-chat="setChat"></eb-chat>
  </div>
</template>

<script>
import EbChat from '@/components/EbChat'
export default {
  name: 'App',
  components: {
    EbChat,
  },
  data(){
    return {
      chatId: 1,
      chat: null,
    }
  },
  created() {
    this.$store.dispatch('checkAuthenticate')
  },
  methods: {
    setChat: function(chat) {
      this.chat = chat
    },
  },
}
</script>
