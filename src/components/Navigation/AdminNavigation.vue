<template>
  <div style="float: left">
    <br>
    <div class="el-menu-vertical-demo">
      <el-menu
        mode="vertical"
        default-active="1"
        :router="true">
        <div>
          <router-link :to="{name:'home'}">
            <el-button class="go-back-button" size="small" icon="el-icon-arrow-left">Back to store</el-button>
          </router-link>
        </div>
        <span class="gd_title">ADMIN PANEL</span>
        <el-menu-item index="1" :route="{name:'adminOrders'}">
          <i class="el-icon-document"></i>
          <span slot="title">Orders</span>
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
          <el-menu-item index="2-3" :route="{name:'adminArchivedItems'}">
            <span slot="title">Archived Items</span>
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
        <el-menu-item index="5" :route="{name:'adminDiscount'}">
          <i class="el-icon-bell"></i>
          <span slot="title">Discounts</span>
        </el-menu-item>
        <el-menu-item index="6" :route="{name:'adminFeedback'}">
          <i class="el-icon-star-off"></i>
          <span slot="title">Feedback</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
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

  .go-back-button {
    margin: 8px;
  }

</style>
