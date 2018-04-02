<template>
  <div id="app">
    <v-header></v-header>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
import header from './components/header/header.vue'
// import api from './fetch/api.js'

export default {
  components: {
    'v-header': header
  }

  // mounted() {
  //   api.getUserDetail('278946928')
  //     .then(res => {
  //       console.log(res)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }
}

</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

</style>
