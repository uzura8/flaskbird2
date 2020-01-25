<template>
  <div>
    <h1>テストアニメ</h1>
    <div>
      <b-button @click="runAnimation">Start</b-button>
    </div>
    <section>
      <figure v-if="activeNo > 0" class="image">
        <b-img :src="activeImage" fluid></b-img>
      </figure>
    </section>
  </div>
</template>

<script>
export default{
  data(){
    return {
      images: [],
      maxNo: 5,
      activeNo: 0,
      animeInterval: 1000,// ms
    }
  },

  computed: {
    activeImage () {
      return `/statics/img/anime${this.activeNo}.png`
    },
  },

  created() {
    //this.setImages()
  },

  methods: {
    setImages: function() {
      for (let i = 1; i <= $this.maxNo; i++) {
      }
    },

    runAnimation: function() {
      this.activeNo = 0
      let id = setInterval(() => {
        this.activeNo++
        if (this.activeNo >= this.maxNo) {
          clearInterval(id)
        }
      }, this.animeInterval)
    },
  }
}
</script>
