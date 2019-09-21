<template>
<section class="chatDetail">
  <header v-if="chat" >
    <h1 class="title">{{ chat.name }}</h1>
    <h2 class="subtitle">{{ chat.body }}</h2>
    <nav v-if="isAuther" class="is-clearfix">
      <router-link
        :to="'/chats/edit/' + chat.id"
        class="button is-pulled-right">
        <b-icon pack="fas" size="is-small" icon="cog"></b-icon>
        <span>Edit</span>
      </router-link>
    </nav>
  </header>
  <div>
    <eb-chat
      :chatId="chatId"
      @loaded-chat="setChat"></eb-chat>
  </div>
</section>
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
