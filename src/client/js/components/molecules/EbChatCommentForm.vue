<template>
<div class="EbChatCommentForm"
  :class="{ included:isInclude }">
  <div class="chat-comment-form">
    <div class="chat-comment-input">
      <textarea class="textarea"
        style="margin:0 auto;"
        v-model="body"
        :rows="bodyRows"
        @keydown.enter="keyDownEnter"
        :placeholder="$t(`form['Add a comment...']`)"></textarea>
    </div>
    <div class="chat-comment-button">
      <button
        class="button is-primary is-small"
        @click="create">{{ $t('common.send') }}</button>
    </div>
  </div>
</div>
</template>

<script>
import { Chat } from '@/api/'

export default {
  nane: 'EbChatCommentForm',

  props: {
    chatId: {
      type: Number,
      default: 0,
    },

    isInclude: {
      type: Boolean,
      default: false,
    },
  },

  data(){
    return {
      body: '',
      error: '',
    }
  },

  computed: {
    hasError () {
      return !this.isEmpty(this.error)
    },

    bodyRows () {
      const rows = this.body.split(/\n/).length
      return rows > 10 ? 10 : rows
    },
  },

  created() {
    this.resetValues()
  },

  methods: {
    resetValues: function() {
      this.body = ''
      this.error = ''
    },

    validate: function() {
      this.error = ''
      if (this.isEmpty(this.body)) {
        this.error ='Input comment'
      }
    },

    keyDownEnter: function(event) {
      if (event.keyCode === 13) {
        if (event.shiftKey) {
          return
        }
        this.create()
      }
    },

    create: function() {
      this.$store.dispatch('setIsLoading', true)
      this.validate()
      if (this.hasError) {
        this.$store.dispatch('setIsLoading', false)
        this.showGlobalMessage(this.error)
        return
      }

      const payload = {
        chatId: this.chatId,
        vals: {
          body: this.body,
        },
        token: this.isFirebaseEnabled ? this.$store.state.auth.token : null
      }
      this.$store.dispatch('createChatComment', payload)
        .catch(err => {
          this.$store.dispatch('setIsLoading', false)
          this.handleApiError(err, this.$t("msg['Send comment failed']"))
        })
        .then(() => {
          this.$store.dispatch('setIsLoading', false)
          this.resetValues()
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.EbChatCommentForm {
  margin: 1px 10px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  width: calc(100% - 30px);
  max-height: 300px;
  background-color: #fff;
  padding: 0.5rem 1rem 1rem;

  &.included {
    border-bottom: solid 1px #dbdbdb;
    border-right: solid 1px #dbdbdb;
    border-left: solid 1px #dbdbdb;
    bottom: 10px !important;
  }
}
.chat-comment-form {
  display: flex;
  max-width: 960px;
  margin: 0 auto;
}
.chat-comment-input {
  flex-grow: 5;
}
.chat-comment-button {
  padding-left: 1rem;
}
</style>
