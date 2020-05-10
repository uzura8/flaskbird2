<template>
<div class="chats">
  <h1 class="title">{{ $t('page.chatRooms') }}</h1>
  <section v-if="isAuth" class="is-clearfix">
    <router-link
      to="/chats/create"
      class="button is-link is-pulled-right">
        <b-icon pack="fas" size="is-small" icon="plus"></b-icon>
        <span>{{ $t('page.createChatRoom') }}</span>
    </router-link>
  </section>

  <eb-chats :is-use-admin="false" />

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

