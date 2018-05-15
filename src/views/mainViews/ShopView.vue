<template>
  <el-container>
    <el-header class="gd-nav-header">
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
import Navigation from '@/components/Navigation/Desktop'
import NavigationMobile from '@/components/Navigation/Mobile'

export default {
  components: {
    Navigation,
    NavigationMobile
  }
}
</script>
<style>
</style>
