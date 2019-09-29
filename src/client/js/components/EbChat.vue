<template>
<div class="ebChat">
  <section class="comments-box" :class="{'is-auth': isAuth}">
    <div v-if="comments">
      <nav v-if="minId">
        <a class="u-clickable" @click="fetchComments({ maxId:minId })">More</a>
      </nav>
      <ul>
        <li v-for="item in comments"
          :key="item.id"
          class="">
          <div class="notification u-mt10"
            :class="{'is-info': item.userId == authUserId}">
            <div>
              <strong v-if="item.user.name && item.user.name != 'null'">{{ item.user.name }}</strong>
              <strong v-else>GuestUser</strong>
              <small class="u-ml05r">{{ item.createdAt | dateFormat('lll') }}</small>
            </div>
            <p class="is-size-5">{{ item.body }}</p>
          </div>
        </li>
      </ul>
    </div>
    <p v-else>No data</p>
  </section>

  <eb-chat-comment-form
    v-if="isAuth"
    :chat="chat">
  </eb-chat-comment-form>
  <nav v-else-if="isEnabledFB"
    class="u-mt1r">
    <a @click="signInAnonymously"
      class="button is-text">Comment as anonymous user</a>
  </nav>
</div>
</template>

<script>
import Vue from 'vue'
import { Loading, Toast } from 'buefy'
Vue.use(Toast)
Vue.use(Loading)

import io from 'socket.io-client'
import { Chat } from '@/api/'
import EbChatCommentForm from '@/components/EbChatCommentForm'
import config from '@/config/config'

export default {
  nane: 'EbChat',

  components: {
    EbChatCommentForm,
  },

  props: {
    isInclude: {
      type: Boolean,
      default: false,
    },

    chatId: {
      type: Number,
      default: 0,
    },
  },

  data(){
    return {
      socket: io(`${config.domain}:${config.port}`),
      chat: null,
    }
  },

  computed: {
    comments () {
      return this.$store.state.chatComment.list
    },

    minId () {
      return !this.isEmpty(this.comments) ? this.comments[0].id : 0
    },

    isEnabledFB () {
      return config.firebase.isEnabled
    },
  },

  created() {
    this.getChat()
    if (this.chatId != this.$store.state.chatComment.chatId) {
      this.$store.dispatch('resetChatCommentList', this.chatId)
      this.fetchComments()
    }
    this.socket.on(`CHAT_COMMENT_${this.chatId}`, (comment) => {
      this.$store.dispatch('addChatComment', comment)
    })
  },

  updated() {
    this.scrollToEnd()
  },

  methods: {
    getChat: function() {
      Chat.get(this.chatId)
        .then(res => {
          this.chat = res
          this.$emit('loaded-chat', res)
        })
        .catch(err => {
          this.handleApiError(err, 'Failed to get data from server')
        })
    },

    fetchComments: function(params={}) {
      const payload = {
        chatId: this.chatId,
        params: params,
      }
      this.$store.dispatch('fetchChatComments', payload)
        .catch(err => {
          this.handleApiError(err, 'Failed to get data from server')
        })
        .then(() => {
        })
    },

    signInAnonymously: function() {
      this.$store.dispatch('authenticateAnonymously')
        .then(() => {
          this.$store.dispatch('resetChatCommentList', this.chatId)
          this.fetchComments()
        })
        .catch(err => {
          this.showGlobalMessage('Sign Anonymously is failed')
        })
    },

    scrollToEnd() {
      this.$nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.comments-box {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;

  &.is-auth {
    padding-bottom: 80px;
  }
}
</style>

