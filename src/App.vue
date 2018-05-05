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
import EventBus from './eventBus'
export default {
  name: 'app',
  components: {
    Navigation,
    NavigationMobile,
    AdminNavigation
  },
  created () {
    EventBus.$on('cookieExpired', () => {
      this.$router.push('/login')
      this.$notify.error({
        title: 'Logged out',
        message: 'You were logged out'
      })
    })
  }
}
</script>

<style>
  .el-form--label-top .el-form-item__label {
    float: left;
  }

  .gd-app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .gd-pr-30px{
    padding-right: 30px;
  }
  .gd-nav-header {
    padding: 0;
  }
  .gd-body {
    height: calc(100vh - 60px);
  }
    .gd-body > * {
      margin-bottom: 20px;
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
  .gd-text-align-left{
    text-align: left;
  }
</style>
