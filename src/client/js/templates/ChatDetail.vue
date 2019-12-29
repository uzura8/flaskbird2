<template>
<div class="chatDetail">
  <h1 v-if="chat" class="title is-clearfix sticky-box">
    <span v-text="dispChatName(chat.type, chat)"></span>
    <eb-dropdown
      v-if="isAuther"
      :position="'is-right'"
      class="is-pulled-right">
      <span slot="label">
        <b-icon pack="fas" size="is-small" icon="cog"></b-icon>
      </span>

      <div class="dropdown-content">
        <router-link
          class="dropdown-item"
          :to="'/chats/' + chat.id + '/edit'">
          {{ $t('common.edit') }}
        </router-link>
      </div>
    </eb-dropdown>
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
import EbDropdown from '@/components/molecules/EbDropdown'

export default {
  nane: 'ChatDetail',

  components: {
    EbChat,
    EbDropdown,
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
      if (this.chat.type != 'public') return false
      if (this.isAdmin) return true
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
.chatDetail {
  padding-bottom: 30px;
}
.sticky-box {
  position:sticky;
  top: 0;
  z-index: 100;
  background-color: #fff;
  padding: 0.5rem 0;
}
</style>
