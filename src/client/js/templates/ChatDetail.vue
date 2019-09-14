<template>
<div class="chatDetail">
  <div v-if="chat" >
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

    <section v-if="comments" class="u-mt3r">
      <nav v-if="minId">
        <a class="u-clickable" @click="fetchComments({ maxId:minId })">More</a>
      </nav>
      <ul>
        <li v-for="item in comments"
          :key="item.id"
          class="columns is-mobile">
          <div class="notification column is-11"
            :class="{'is-offset-1':item.userId == authUserId, 'is-info': item.userId == authUserId}">
            <div>
              <strong>{{ item.user.name }}</strong>
              <small class="u-ml05r">{{ item.createdAt | dateFormat('lll') }}</small>
            </div>
            <p class="is-size-5">{{ item.body }}</p>
          </div>
        </li>
      </ul>
    </section>
    <p v-else>No data</p>

    <chat-comment-form
      v-if="isAuth"
      :chat="chat">
    </chat-comment-form>
  </div>
</div>
</template>

<script>
import { Chat } from '../api/'
import ChatCommentForm from '@/components/ChatCommentForm'

export default {
  nane: 'ChatDetail',

  components: {
    ChatCommentForm,
  },

  data(){
    return {
      chat: null,
      body: '',
    }
  },

  computed: {
    chatId () {
      return this.$route.params.id
    },

    comments () {
      return this.$store.state.chatComment.list
    },

    isAuther () {
      return this.isAuth && this.chat.userId == this.$store.state.auth.user.id
    },

    minId () {
      return !this.isEmpty(this.comments) ? this.comments[0].id : 0
    },
  },

  created() {
    this.getChat()
    if (this.chatId != this.$store.state.chatComment.chatId) {
      this.$store.dispatch('resetChatCommentList', this.chatId)
      this.fetchComments()
    }
  },

  methods: {
    getChat: function() {
      Chat.get(this.chatId)
        .then(res => {
          this.chat = res
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
  },
}
</script>
