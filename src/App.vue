<template>
  <div id="app">
    <Navigation></Navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from './components/Navigation'
export default {
  name: 'app',
  components: {
    Navigation
  },
  mounted () {
    if (!this.$cookie.get('CSRF-TOKEN')) {
      this.axios.get('account/testconnection').then(response => {
      }).catch(error => {
        // if this request doesn't go through any other request won't work
        console.log(error)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
