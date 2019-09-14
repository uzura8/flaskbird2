<template>
<div class="chatDetail">
  <div v-if="chat" >
    <h1 class="title">{{ chat.name }}</h1>
    <h2 class="subtitle">{{ chat.body }}</h2>
    <section v-if="isAuther" class="is-clearfix">
      <router-link
        :to="'/chats/edit/' + chat.id"
        class="button is-pulled-right">
        <b-icon pack="fas" size="is-small" icon="cog"></b-icon>
        <span>Edit</span>
      </router-link>
    </section>
  </div>
</div>
</template>

<script>
import { Chat } from '../api/'

export default{
  data(){
    return {
      chat: null
    }
  },

  computed: {
    chatId () {
      return this.$route.params.id
    },

    isAuther () {
      return this.isAuth && this.chat.userId == this.$store.state.auth.user.id
    },
  },

  created() {
    this.getChat()
  },

  methods: {
    getChat: function() {
      Chat.get(this.chatId)
        .then(res => {
          this.chat = res
        })
        .catch(err => {
          this.showGlobalError('Failed to get data from server', err.response)
        })
    },
  },
}
</script>
