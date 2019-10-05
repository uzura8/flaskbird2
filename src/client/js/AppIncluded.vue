<template>
<div ref="appContainer" class="chat-container u-bg-tr" v-cloak>
  <b-loading :active.sync="isLoading" :is-full-page="true" :canCancel="true"></b-loading>
  <div v-if="isActive" class="chat-widget">
    <div class="chat-widget-container">
      <header class="chat-widget-header">
        <div class="container"></div>
        <h3 v-if="chat" class="title is-4 is-clearfix">
          {{ chat.name }}
          <a @click="isActive = !isActive"
            class="button is-white u-bg-tr is-pulled-right">
            <i class="fas fa-times"></i>
          </a>
        </h3>
      </header>
      <eb-chat
        :isInclude="true"
        :chatId="chatId"
        @loaded-chat="setChat"></eb-chat>
    </div>
  </div>
  <button v-else
    @click="isActive = !isActive"
    class="button is-primary is-medium is-rounded btn-chat-window">
    <span class="icon is-large">
      <i class="fas fa-comment"></i>
    </span>
  </button>
</div>
</template>

<script>
import site from '@/util/site'
import EbChat from '@/components/EbChat'
export default {
  name: 'AppiIncluded',
  components: {
    EbChat,
  },

  data(){
    return {
      isActive: false,
      chatId: 1,
      chat: null,
    }
  },

  computed: {
    isLoading () {
      return this.$store.state.common.isLoading
    },

    appContainerSize () {
      return {
        width: this.$refs.appContainer.clientWidth,
        height: this.$refs.appContainer.clientHeight,
      }
    },
  },

  watch: {
    isActive: function (val) {
      if (typeof window.parent.postMessage === undefined) return
      //const origin = site.baseUri('origin')
      window.parent.postMessage({ chatActive: val }, '*');
    }
  },

  created() {
    this.$store.dispatch('checkAuthenticate')
  },

  methods: {
    setChat: function(chat) {
      this.chat = chat
    },
  },
}
</script>

<style lang="scss" scoped>
.chat-container {
  background-color: transparent;
  height: 100%;
}
.chat-widget {
  background-color: transparent;
  padding: 1rem;
  height: 100%;
}
.chat-widget-container {
  background-color: #fff;
  padding: 55px 1rem 0.5rem;
  height: 100%;
}
.chat-widget-header {
  position: fixed;
  top: 0;
  left: 1rem;
  right: 1rem;
  z-index: 1;
  width: calc(100% - 2rem);
  background-color: #fff;
  padding: 1rem 1rem 1rem;
}
</style>


