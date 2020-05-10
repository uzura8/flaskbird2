<template>
<div class="chatCreate">
  <h1 class="title">{{ $t('page.createChatRoom') }}</h1>
  <eb-chat-form />
</div>
</template>

<script>
import EbChatForm from '@/components/organisms/EbChatForm'

export default {
  name: 'ChatCreate',

  components: {
    EbChatForm,
  },

  data () {
    return {
    }
  },

  computed: {
  },

  created: function() {
  },

  methods: {
  }
}
</script>

<style scoped>
</style>

