<template>
  <div style="float: left">
    <br>
    <div class="el-menu-vertical-demo">
      <el-menu mode="vertical" default-active="3" :router="true">
        <span>ADMIN PANEL</span>
        <el-menu-item index="1">
          <i class="el-icon-document"></i>
          <span slot="title">Oneone</span>
        </el-menu-item>
        <el-menu-item index="2" :route="{name:'adminItems'}">
          <i class="el-icon-goods"></i>
          <span slot="title">Items</span>
        </el-menu-item>
        <el-menu-item index="3" :route="{name:'adminUsers'}">
          <i class="el-icon-service"></i>
          <span slot="title">Users</span>
        </el-menu-item>
        <el-menu-item index="4" :route="{name:'adminCategories'}">
          <i class="el-icon-d-caret"></i>
          <span slot="title">Categories</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script>
  import EventBus from '@/eventBus'
  export default {
    mounted () {
      EventBus.$on('exportStarted', () => {
        console.log('im working')
        window.onbeforeunload = () => {
          return 'export running'
        }
      })
      EventBus.$on('exportFinished', () => {
        console.log('im working nooot')
        window.onbeforeunload = undefined
      })
    }
  }

</script>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 300px;
  }

</style>
