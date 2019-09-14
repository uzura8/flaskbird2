<template>
<div class="chats">
  <h1 class="title">Chat Rooms</h1>
  <section v-if="isAuth" class="is-clearfix">
    <router-link
      to="/chats/create"
      class="button is-link is-pulled-right">
        <b-icon pack="fas" size="is-small" icon="plus"></b-icon>
        <span>Create Room</span>
    </router-link>
  </section>
  <section>
    <ul v-if="chats">
      <li v-for="item in chats" :key="item.id">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <p>
                <strong>
                  <router-link
                    :to="'/chats/' + item.id">
                      {{ item.name }}
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
  </section>
</div>
</template>

<script>
import { Chat } from '@/api'

export default{
  data(){
    return {
      chats: [],
    }
  },

  created() {
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

<style scoped>
li {
  margin-top: 3rem
}
</style>

