<template>
  <div v-cloak>
    <div v-if="isActive">
      <a @click="isActive = !isActive"
        class="button is-white is-large btn-chat-window btn-chat-window u-bg-tr">
        <i class="fas fa-times"></i>
      </a>
      <eb-chat
        :isInclude="true"
        :chatId="chatId"
        @loaded-chat="setChat"></eb-chat>
    </div>
    <button v-else
      @click="isActive = !isActive"
      class="button is-primary is-medium is-rounded btn-chat-window">
      <span class="icon is-large">
        <i class="fas fa-comment"></i>
      </span>
    </button>
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
      isActive: false,
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

<style lang="scss" scoped>
.btn-chat-window {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;
}
</style>


