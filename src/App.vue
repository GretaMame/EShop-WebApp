<template>
  <el-container id="app">
      <AdminNavigation v-if="this.$route.path.indexOf('admin') !== -1"></AdminNavigation>
    <el-header v-else class="gd-nav-header">
      <el-row class="hidden-sm-and-up">
        <NavigationMobile/>
      </el-row>
      <el-row class="hidden-xs-only">
        <Navigation/>
      </el-row>
    </el-header>
    <router-view class="gd-body"></router-view>
  </el-container>
</template>

<script>
import Navigation from './components/Navigation'
import NavigationMobile from './components/NavigationMobile'
import AdminNavigation from './components/AdminNavigation'
export default {
  name: 'app',
  components: {
    Navigation,
    NavigationMobile,
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
  .gd-nav-header{
    padding: 0;
  }
  .gd-body{
    height: calc(100vh - 60px);
  }
</style>
