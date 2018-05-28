<template>
  <el-container>
    <el-header>
       <status-bar></status-bar>
    </el-header>
    <el-main>
    <AdminNavigation></AdminNavigation>
    <router-view/>
    </el-main>
    <el-footer>

    </el-footer>
  </el-container>
</template>
<script>
import AdminNavigation from '@/components/Navigation/Admin'
import StatusBar from '@/components/Import/StatusBar'

export default{
  components: {
    AdminNavigation,
    StatusBar
  }
}
</script>

<style scoped>
  .el-header {
    padding: 0;
    width: 100%;
  }
  header {
    height: 26px !important;
  }
</style>

