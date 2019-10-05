<template>
<div class="EbChatCreateForm">
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
        :disabled="hasErrors"
        @click="create">Create</button>
    </div>
  </div>
</div>
</template>

<script>
import { Chat } from '@/api/'
import str from '@/util/str'

export default {
  nane: 'EbChatCreateForm',

  props: {
    isUseAdmin: {
      type: Boolean,
      default: false,
    },
  },

  data(){
    return {
      errors: {},
      name: '',
      body: '',
    }
  },

  computed: {
    hasErrors: function() {
      let hasError = false
      Object.keys(this.errors).map(field => {
        if (this.errors[field].length > 0) hasError = true
      })
      return hasError
    },
  },

  created() {
  },

  methods: {
    create: function() {
      this.validateAll()
      if (this.hasErrors) {
        this.showGlobalMessage('Correct inputs')
      } else {
        const vals = {
          name: this.name,
          body: this.body,
        }
        const token = this.isFirebaseEnabled ? this.$store.state.auth.token : null
        Chat.create(vals, token)
          .then((res) => {
            if (this.isUseAdmin && this.isAdmin) {
              this.$router.push({ name:'AdminChats' })
            } else {
              this.$router.push({ name:'Chats' })
            }
          })
          .catch(err => {
            this.handleApiError(err, 'Create failed')
          })
      }
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
  },
}
</script>

<style lang="scss" scoped>
</style>

