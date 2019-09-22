<template>
<div class="chatCommentForm widefull-box">
  <div class="container">
    <div class="c-form-group">
      <div class="c-form-group_item c-form-group__item--main">
        <textarea class="textarea"
          style="margin:0 auto;"
          v-model="body"
          :rows="body.split(/\n/).length"
          placeholder="Add a comment..."></textarea>
      </div>
      <div class="c-form-group__item c-form-group__item--end">
        <button class="button is-primary is-small" @click="create">Send</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { Chat } from '../api/'

export default {
  nane: 'ChatCommentForm',

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

<style lang="scss" scoped>
.widefull-box {
  max-width: 960px;
  text-align: center;
  margin: 0 -1.5rem;
  width: 100%;
  padding: 0;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  height: 65px;
  display: block;
}
.c-form-group {
  padding: 0.5rem 1.5rem;
  display: flex;

  &__item {
    display: flex;

    &--main {
      align-items: center;
      justify-content: center;
      flex: 1;
    }

    &--end {
      justify-content: flex-end;
      width: 70px;
    }
  }
}
</style>
