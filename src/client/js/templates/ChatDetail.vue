<template>
<div class="chatDetail">
  <h1 v-if="chat" class="title is-clearfix sticky-box">
    {{ chat.name }}
    <router-link
      v-if="isAuther"
      :to="'/chats/edit/' + chat.id"
      class="button is-pulled-right">
      <b-icon pack="fas" size="is-small" icon="cog"></b-icon>
    </router-link>
  </h1>
  <h2 v-if="chat" class="subtitle">{{ chat.body }}</h2>
  <eb-chat
    :chatId="chatId"
    @loaded-chat="setChat"></eb-chat>
</div>
</template>

<script>
import { Chat } from '@/api/'
import EbChat from '@/components/EbChat'

export default {
  nane: 'ChatDetail',

  components: {
    EbChat,
  },

  data(){
    return {
      chat: null,
    }
  },

  computed: {
    chatId () {
      return Number(this.$route.params.id)
    },

    isAuther () {
      return this.isAuth && this.chat.userId == this.$store.state.auth.user.id
    },
  },

  created() {
  },

  methods: {
    setChat: function(chat) {
      this.chat = chat
    },
  },
}
</script>

<style lang="scss" scoped>
.sticky-box {
  position:sticky;
  top: 0;
  z-index: 100;
  background-color: #fff;
  padding: 0.5rem 0;
}
</style>
