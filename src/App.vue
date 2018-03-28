<template>
  <div id="app">
    <AdminNavigation v-if="this.$route.path.indexOf('admin') !== -1"></AdminNavigation>
    <Navigation v-else></Navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from './components/Navigation'
import AdminNavigation from './components/AdminNavigation'
export default {
  name: 'app',
  components: {
<<<<<<< HEAD
    Navigation,
    AdminNavigation
=======
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
>>>>>>> master
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
