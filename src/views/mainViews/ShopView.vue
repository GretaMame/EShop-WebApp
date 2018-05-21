<template>
  <el-container>
    <el-header class="gd-nav-header">
      <MainNavigation/>
    </el-header>
    <el-main class="gd-body">
      <router-view ></router-view>
    </el-main>
  </el-container>
</template>
<script>

import MainNavigation from '@/components/Navigation/MainNavigation'

export default {
  components: {
    MainNavigation
  }
}
</script>