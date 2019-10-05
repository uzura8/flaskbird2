<template>
<div class="chats">
  <h1 class="title">Chat Rooms</h1>
  <section class="is-clearfix">
    <router-link
      to="/admin/chats/create"
      class="button is-link is-pulled-right">
        <b-icon pack="fas" size="is-small" icon="plus"></b-icon>
        <span>Create Room</span>
    </router-link>
  </section>

  <eb-chats :is-use-admin="true" />

</div>
</template>

<script>
import EbChats from '@/components/molecules/EbChats'

export default{
  name: 'Chats',

  data(){
    return {
    }
  },

  components: {
    EbChats,
  },

  created() {
  },

  methods: {
  },
}
</script>

<style scoped>
</style>

