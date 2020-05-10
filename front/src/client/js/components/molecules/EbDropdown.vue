<template>
<div class="dropdown" :class="[{ 'is-active': isActive }, position]">
  <div class="dropdown-trigger">
    <button @click="isActive = !isActive"
      class="button"
      aria-haspopup="true"
      aria-controls="dropdown-menu">
      <slot name="label"></slot>
      <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  nane: 'EbDropdown',

  props: {
    position: {
      type: String,
      default: '',
    },
  },

  data(){
    return {
      isActive: false,
    }
  },

  computed: {
    parentBtnClass() {
      return {
        'is-active': this.isActive,
        active: true,
        'text-danger': false
      }
      return Number(this.$route.params.id)
    },
  },

  created() {
    this.listen(window, 'click', function(e) {
      if (!this.$el.contains(e.target)) {
        this.isActive = false
      }
    }.bind(this));
  },

  methods: {
  },
}
</script>

<style lang="scss" scoped>
</style>
