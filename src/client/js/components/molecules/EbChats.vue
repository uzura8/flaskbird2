<template>
<div class="ebChats">
  <ul v-if="chats">
    <li v-for="item in chats" :key="item.id">
      <article class="media">
        <div class="media-content">
          <div class="content">
            <div>
              <strong>
                <router-link
                  :to="isUseAdmin ? '/admin/chats/' + item.id : '/chats/' + item.id"
                  v-text="dispChatName(item.type, item, isUseAdmin)">
                </router-link>
              </strong>
            </div>
            <div v-if="item.body" class="u-mt5" v-html='usableTextEscaped(item.body)'></div>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <small>{{ $t('common["createdAt"]') }}: {{ item.createdAt | dateFormat('lll') }}</small>
            </div>
          </nav>
        </div>
      </article>
    </li>
  </ul>
  <p v-else>{{ $t('msg["No Data"]') }}</p>
</div>
</template>

<script>
import { Chat } from '@/api'
import str from '@/util/str'

export default {
  name: 'EbChats',

  props: {
    isUseAdmin: {
      type: Boolean,
      default: false,
    },
  },

  data () {
    return {
      chats: [],
    }
  },

  computed: {
  },

  created: function() {
    this.getChats()
  },

  methods: {
    getChats: function() {
      const token = this.isFirebaseEnabled ? this.$store.state.auth.token : null
      Chat.get('', token)
        .then(res => {
          this.chats = res
        })
        .catch(err => {
          this.handleApiError(err, this.$t('msg["Failed to get data from server"]'))
        })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
  margin-top: 3rem
}
</style>
