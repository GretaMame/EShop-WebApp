<template>
  <div style="float: left">
    <br>
    <div class="el-menu-vertical-demo">
      <el-menu
        mode="vertical"
        default-active="3"
        :router="true">
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
        <el-menu-item index="5" :route="{name:'adminFeedback'}">
          <i class="el-icon-star-off"></i>
          <span slot="title">Feedback</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default{
}
</script>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 300px;
  }
</style>
