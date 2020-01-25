<template>
  <header>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">Sample Site</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">{{ $t('common.top') }}</b-nav-item>
          <b-nav-item to="/anime">テストアニメ</b-nav-item>
          <b-nav-item to="/about">{{ $t('page.about') }}</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>

export default {
  name: 'FbNavbar',
  data () {
    return {
    }
  },

  computed: {
    isHeaderMenuOpen: function () {
      return this.$store.state.common.isHeaderMenuOpen
    },
  },

  created: function() {
    this.listen(window, 'click', function(e){
      if (!this.$el.contains(e.target)) {
        this.$store.dispatch('setHeaderMenuOpen', false)
      }
    }.bind(this));
  },

  destroyed: function() {
    this.destroyed()
  },

  methods: {
    toggleHeaderMenuOpen: function () {
      this.$store.dispatch('setHeaderMenuOpen', !this.isHeaderMenuOpen)
    },
  }
}
</script>

