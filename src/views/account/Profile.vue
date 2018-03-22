<template>
  <el-card class="box-card">
    <el-tabs>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-info"></i>My details</span>
        <edit-profile></edit-profile></el-tab-pane>
      <el-tab-pane>
        <span slot="label"><icon name="lock"></icon>Password</span>
        <change-password></change-password>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><icon name="home"></icon>Address book</span>
        <address-book></address-book>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-tickets"></i>My orders</span>
        <order-history></order-history>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
  import EditProfile from '@/components/EditProfile.vue'
  import ChangePassword from '@/components/ChangePassword.vue'
  import AddressBook from '@/components/AddressBook.vue'
  import OrderHistory from '@/components/OrderHistory.vue'
  export default {
    components: {
      'edit-profile': EditProfile,
      'change-password': ChangePassword,
      'address-book': AddressBook,
      'order-history': OrderHistory
    }
  }
</script>

<style scoped>
  i {
    margin-right: 5px;
  }
  .fa-icon {
    margin-right: 5px;
    vertical-align: text-bottom;
  }
</style>

