<template>
<div class="EbChatForm">
  <b-field :label="$t(`form['Room Name']`)"
    :type="isEmpty(errors.name) ? '' : 'is-danger'"
    :message="isEmpty(errors.name) ? $t(`form['Used for display room name']`) : errors.name[0]">
    <b-input
      v-model="name"
      @blur="validate('name')"
      :placeholder="$t(`form['Room Name']`)">
    </b-input>
  </b-field>

  <b-field :label="$t('common.description')"
    :type="isEmpty(errors.body) ? $t(`form['Description for room']`) : 'is-danger'"
    :message="isEmpty(errors.body) ? $t(`form['Used for room description']`) : errors.body[0]">
    <b-input type="textarea"
      v-model="body"
      @blur="validate('body')"
      :placeholder="$t('common.description')">
    </b-input>
  </b-field>

  <div class="field">
    <div class="control">
      <button
        class="button is-link"
        :disabled="hasErrors"
        @click="save" v-text="isEdit ? $t('common.edit') : $t('common.create')"></button>
    </div>
  </div>
</div>
</template>

<script>
import { Chat } from '@/api/'
import str from '@/util/str'

export default {
  nane: 'EbChatForm',

  props: {
    chatId: {
      type: [String, Number],
      default: 0,
    },

    isUseAdmin: {
      type: Boolean,
      default: false,
    },
  },

  data(){
    return {
      errors: {},
      chat: {},
      name: '',
      body: '',
    }
  },

  computed: {
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

    isEdit: function() {
      return Boolean(this.chatId)
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

  created() {
    this.setChat()
  },

  methods: {
    setChat: function() {
      if (!this.isEdit) return
      Chat.get(this.chatId)
        .then(res => {
          this.chat = res
          this.name = res.name
          this.body = res.body
          this.$emit('loaded-chat', res)
        })
        .catch(err => {
          this.handleApiError(err, this.$t('msg["Failed to get data from server"]'))
        })
    },

    save: function() {
      if (this.isEdit && !this.isUpdated) {
        this.showGlobalMessage(this.$t('msg["Values not updated"]'))
        return
      }

      this.validateAll()
      if (this.hasErrors) {
        this.showGlobalMessage(this.$t('msg["Correct inputs"]'))
        return
      }

      let vals = {
        name: this.name,
        body: this.body,
      }
      const token = this.isFirebaseEnabled ? this.$store.state.auth.token : null
      if (this.isEdit) {
        Chat.edit(this.chatId, vals, token)
          .then((res) => {
            if (this.isUseAdmin && this.isAdmin) {
              this.$router.push({ path:'/admin/chats/' + this.chatId })
            } else {
              this.$router.push({ path:'/chats/' + this.chatId })
            }
          })
          .catch(err => {
            this.handleApiError(err, this.$t('msg["Edit failed"]'))
          })
      } else {
        vals.type = 'public'
        Chat.create(vals, token)
          .then((res) => {
            if (this.isUseAdmin && this.isAdmin) {
              this.$router.push({ name:'AdminChats' })
            } else {
              this.$router.push({ name:'Chats' })
            }
          })
          .catch(err => {
            this.handleApiError(err, this.$t('msg["Create failed"]'))
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
        this.errors.name.push(this.$t('msg["Name is required"]'))
      }
    },

    validateBody: function() {
      this.initError('body')
      if (this.isEmpty(this.body)) {
        this.errors.body.push(this.$t('msg["Description is required"]'))
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

