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
    Navigation,
    AdminNavigation
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
