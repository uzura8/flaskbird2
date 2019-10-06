<template>
<div ref="appContainer" class="chat-container u-bg-tr" v-cloak>
  <b-loading :active.sync="isLoading" :is-full-page="true" :canCancel="true"></b-loading>
  <div v-if="isActive" class="chat-widget">
    <div class="chat-widget-container">
      <header class="chat-widget-header">
        <div class="container"></div>
        <h3 v-if="chat" class="title is-4 is-clearfix">
          {{ chat.name }}
          <a @click="isActive = !isActive"
            class="button is-white u-bg-tr is-pulled-right">
            <i class="fas fa-times"></i>
          </a>
        </h3>
      </header>
      <eb-chat
        :isInclude="true"
        :chatId="chatId"
        @loaded-chat="setChat"></eb-chat>
    </div>
  </div>
  <button v-else
    @click="chatOpen"
    class="button is-primary is-medium is-rounded btn-chat-window">
    <span class="icon is-large">
      <i class="fas fa-comment"></i>
    </span>
  </button>
</div>
</template>

<script>
import EbChat from '@/components/organisms/EbChat'
import { Chat } from '@/api/'

export default {
  name: 'AppiIncluded',
  components: {
    EbChat,
  },

  data(){
    return {
      isActive: false,
      chat: {},
    }
  },

  computed: {
    isLoading () {
      return this.$store.state.common.isLoading
    },

    chatId () {
      return this.chat.id
    },

    appContainerSize () {
      return {
        width: this.$refs.appContainer.clientWidth,
        height: this.$refs.appContainer.clientHeight,
      }
    },
  },

  watch: {
    isActive: function (val) {
      if (typeof window.parent.postMessage === undefined) return
      //const origin = site.baseUri('origin')
      window.parent.postMessage({ chatActive: val }, '*');
    }
  },

  created() {
  },

  methods: {
    chatOpen: function() {
      if (!this.chatId) {
        this.activate()
      } else {
        this.isActive = true
      }
    },

    activate: function() {
      if (! this.isAuth) {
        this.signInAnonymously()
      } else {
        this.setChat()
      }
    },

    signInAnonymously: function() {
      this.$store.dispatch('authenticateAnonymously')
        .then(() => {
          this.setChat()
        })
        .catch(err => {
          this.handleApiError(err, 'Sign Anonymously is failed')
        })
    },

    setChat: function() {
      Chat.getByUserId(this.authUserId, this.authUserToken, 'support')
        .then(res => {
          if (!this.isEmpty(res)) {
            this.chat = res[0]
            this.isActive = true
          } else {
            this.assignSupportChat()
          }
        })
        .catch(err => {
          this.handleApiError(err, 'Failed to get data from server')
        })
    },

    assignSupportChat: function() {
      Chat.assignSupportChat(this.authUserId, this.authUserToken)
        .then(res => {
          this.chat = res[0]
          this.isActive = true
        })
        .catch(err => {
          this.handleApiError(err, 'Failed to get data from server')
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.chat-container {
  background-color: transparent;
  height: 100%;
}
.chat-widget {
  background-color: transparent;
  padding: 1rem;
  height: 100%;
}
.chat-widget-container {
  background-color: #fff;
  padding: 55px 1rem 0.5rem;
  height: 100%;
}
.chat-widget-header {
  position: fixed;
  top: 0;
  left: 1rem;
  right: 1rem;
  z-index: 1;
  width: calc(100% - 2rem);
  background-color: #fff;
  padding: 1rem 1rem 1rem;
}
</style>


