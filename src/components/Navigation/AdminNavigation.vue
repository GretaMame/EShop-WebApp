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
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-goods"></i>
            Items
          </template>
          <el-menu-item index="2-1" :route="{name:'adminItems'}">
            <span slot="title">View items</span>
          </el-menu-item>
          <el-menu-item index="2-2" :route="{name: 'adminImportItems'}">
            <span slot="title">Import</span>
          </el-menu-item>
        </el-submenu>
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
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 300px;
  }

  .el-menu {
    text-align: start;
  }

  .gd_title {
    padding-left: 20px;
  }

</style>
