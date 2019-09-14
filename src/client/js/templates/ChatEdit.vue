<template>
<div class="chatEdit">
  <h1 class="title">Edit: {{ chat.name }}</h1>

  <b-field label="Room Name"
    :type="isEmpty(errors.name) ? '' : 'is-danger'"
    :message="isEmpty(errors.name) ? 'Used for display name' : errors.name[0]">
    <b-input
      v-model="name"
      @blur="validate('name')"
      placeholder="Name">
    </b-input>
  </b-field>

  <b-field label="Description"
    :type="isEmpty(errors.body) ? 'Description for room' : 'is-danger'"
    :message="isEmpty(errors.body) ? 'Used for room description' : errors.body[0]">
    <b-input type="textarea"
      v-model="body"
      @blur="validate('body')"
      placeholder="Description">
    </b-input>
  </b-field>

  <div class="field">
    <div class="control">
      <button
        class="button is-link"
        :disabled="!isUpdated || hasErrors"
        @click="edit">Edit</button>
    </div>
  </div>
</div>
</template>

<script>
import { Chat } from '../api/'
import str from '@/util/str'

export default {
  name: 'ChatEdit',

  data () {
    return {
      chat: [],
      errors: {},
      name: '',
      body: '',
    }
  },

  computed: {
    chatId () {
      return this.$route.params.id
    },

    updatedValues () {
      const keys = ['name', 'body']
      let isUpdated = false
      let values = {}
      for (let i = 0, n = keys.length; i < n; i++) {
        let key = keys[i]
        if (this.chat[key] != this[key]) {
          values[key] = this[key]
          isUpdated = true
        }
      }
      if (!isUpdated) return false
      return values
    },

    isUpdated: function() {
      return !this.isEmpty(this.updatedValues)
    },

    hasErrors: function() {
      let hasError = false
      Object.keys(this.errors).map(field => {
        if (this.errors[field].length > 0) hasError = true
      })
      return hasError
    },
  },

  created: function() {
    this.setChat()
  },

  methods: {
    setChat: function() {
      Chat.get(this.chatId)
        .then(res => {
          this.chat = res
          this.name = res.name
          this.body = res.body
        })
        .catch(err => {
          this.handleApiError(err, 'Failed to get data from server')
        })
    },

    edit: function() {
      if (!this.isUpdated) {
        this.showGlobalError('Values not updated')
        return
      }

      this.validateAll()
      if (this.hasErrors) {
        this.showGlobalError('Correct inputs')
        return
      }

      const vals = {
        name: this.name,
        body: this.body,
      }
      Chat.edit(this.chatId, vals)
        .then((res) => {
          this.$router.push({ path:'/chats/' + this.chatId })
        })
        .catch(err => {
          this.handleApiError(err, 'Edit failed')
        })
    },

    setErrors: function(errors) {
      const keys = Object.keys(this.errors)
      errors.map(err => {
        const field = err.param
        this.initErrors(field)
        this.errors[field].push(err.msg)
      })
    },

    validateAll: function() {
      ['name', 'body'].map(field => {
        this.validate(field)
      })
    },

    validate: function(field) {
      const key = 'validate' + str.capitalize(field)
      this[key]()
    },

    validateName: function() {
      this.initError('name')
      if (this.isEmpty(this.name)) {
        this.errors.name.push('Name is required')
      }
    },

    validateBody: function() {
      this.initError('body')
      if (this.isEmpty(this.body)) {
        this.errors.body.push('Body is required')
      }
    },

    initError: function(field) {
      this.$set(this.errors, field, [])
    },

    initErrors: function(field) {
      const keys = Object.keys(this.errors)
      if (!this.inArray(field, keys)) {
        this.initError(field)
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chatEdit {
}
</style>
