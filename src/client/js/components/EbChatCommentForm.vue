<template>
<div class="chatCommentForm columns is-1">
  <div class="column">
    <textarea class="textarea"
      v-model="body"
      :rows="body.split(/\n/).length"
      placeholder="Add a comment..."></textarea>
  </div>
  <div class="column is-2">
    <button class="button is-primary" @click="create">Submit</button>
  </div>
</div>
</template>

<script>
import { Chat } from '../api/'

export default {
  nane: 'ChatCommentForm',

  components: {
  },

  props: {
    chat: {
      type: Object,
      default: null,
    },
  },

  data(){
    return {
      body: '',
      error: '',
    }
  },

  computed: {
    isAuther () {
      return this.isAuth && this.chat.userId == this.$store.state.auth.user.id
    },

    hasError () {
      return !this.isEmpty(this.error)
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

    create: function() {
      this.$store.dispatch('setIsLoading', true)
      this.validate()
      if (this.hasError) {
        this.$store.dispatch('setIsLoading', false)
        this.showGlobalMessage(this.error)
        return
      }

      const payload = {
        chatId: this.chat.id,
        vals: {
          body: this.body,
        }
      }
      this.$store.dispatch('createChatComment', payload)
        .catch(err => {
          this.$store.dispatch('setIsLoading', false)
          this.handleApiError(err, 'Send comment failed')
        })
        .then(() => {
          this.$store.dispatch('setIsLoading', false)
          this.resetValues()
        })
    },
  },
}
</script>
