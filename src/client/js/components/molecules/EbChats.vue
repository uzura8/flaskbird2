<template>
<div class="ebChats">
  <ul v-if="chats">
    <li v-for="item in chats" :key="item.id">
      <article class="media">
        <div class="media-content">
          <div class="content">
            <p>
              <strong>
                <router-link
                  :to="isUseAdmin ? '/admin/chats/' + item.id : '/chats/' + item.id"
                  v-text="dispChatName(item, isUseAdmin)">
                </router-link>
              </strong>
              <br>
              {{ item.body }}
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <small>created: {{ item.createdAt | dateFormat('lll') }}</small>
            </div>
          </nav>
        </div>
      </article>
    </li>
  </ul>
  <p v-else>No data.</p>
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
      Chat.get()
        .then(res => {
          this.chats = res
        })
        .catch(err => {
          this.handleApiError(err, 'Failed to get data from server')
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
