<template>
<div class="chatDetail">
  <h1 v-if="chat" class="title is-clearfix sticky-box">
    <span v-text="dispChatName(chat.type, chat, true)"></span>
    <router-link
      v-if="isAuther"
      :to="'/admin/chats/' + chat.id + '/edit'"
      class="button is-pulled-right">
      <b-icon pack="fas" size="is-small" icon="cog"></b-icon>
    </router-link>
  </h1>
  <h2 v-if="!isEmpty(chat.body)" class="subtitle">{{ chat.body }}</h2>
  <eb-chat
    :chatId="chatId"
    @loaded-chat="setChat"></eb-chat>
</div>
</template>

<script>
import { Chat } from '@/api/'
import EbChat from '@/components/organisms/EbChat'

export default {
  nane: 'ChatDetail',

  components: {
    EbChat,
  },

  data(){
    return {
    }
  },

  computed: {
    chatId () {
      return Number(this.$route.params.id)
    },

    chat () {
      return this.$store.state.chat
    },

    isAuther () {
      return this.isAuth && this.chat.userId == this.$store.state.auth.user.id
    },
  },

  created() {
    this.setChat()
  },

  methods: {
    setChat: function() {
      const payload = {
        chatId: this.chatId,
        token: this.authUserToken,
      }
      this.$store.dispatch('setChat', payload)
        .catch(err => {
          this.handleApiError(err, this.$t('msg["Failed to get data from server"]'))
        })
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
