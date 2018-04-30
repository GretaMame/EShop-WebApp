<template>
  <el-container>
      <AdminNavigation v-if="this.$route.path.indexOf('admin') !== -1"></AdminNavigation>
    <el-header v-else class="gd-nav-header">
      <el-row class="hidden-sm-and-up">
        <NavigationMobile/>
      </el-row>
      <el-row class="hidden-xs-only">
        <Navigation/>
      </el-row>
    </el-header>
    <el-main class="gd-body">
      <router-view ></router-view>
    </el-main>
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
  .gd-app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .gd-nav-header {
    padding: 0;
  }
  .gd-body {
    height: calc(100vh - 60px);
  }
  .gd-logo {
		font: italic bold 20px Georgia, serif;
		color:peru;
	}
  .gd-float-right {
    float: right !important;
  }
  .gd-float-left {
    float: left !important;
  }
  .gd-no-margin{
    margin: 0;
  }
</style>
