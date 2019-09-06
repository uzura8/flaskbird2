<template>
<div>
  <h1 class="title">Member Top</h1>
  <p>This page needs Sign in</p>
</div>
</template>

<script>
import { User } from '../api/'

export default{
  data(){
    return {
    }
  },

  created() {
    console.log(this.getUserInfo());//!!!!!!
  },

  methods: {
    getUserInfo: function() {
      User.get()
        .then((res) => {
          console.log(res);//!!!!!!
        })
        .catch(err => {
          console.log(err);//!!!!!!
        })
    },
  },
}
</script>
