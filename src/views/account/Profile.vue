<template>
  <el-card class="box-card">
    <el-tabs>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-info"></i>My details</span>
        <edit-profile
          :initialUserData="initialUserData"
          :loading="loading"
          v-on:dataUpdated="updateUserPersonalInfo">
        </edit-profile></el-tab-pane>
      <el-tab-pane>
        <span slot="label"><icon name="lock"></icon>Password</span>
        <change-password></change-password>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><icon name="home"></icon>Address book</span>
        <address-book
          :initialUserData="initialUserData"
          :loading="loading"
          v-on:dataUpdated="updateUserAddresses">
        </address-book>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-tickets"></i>My orders</span>
        <order-history></order-history>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
  import EditProfile from '@/components/ProfileComponents/EditProfile.vue'
  import ChangePassword from '@/components/ProfileComponents/ChangePassword.vue'
  import AddressBook from '@/components/ProfileComponents/AddressBook.vue'
  import OrderHistory from '@/components/ProfileComponents/OrderHistory.vue'
  export default {
    components: {
      'edit-profile': EditProfile,
      'change-password': ChangePassword,
      'address-book': AddressBook,
      'order-history': OrderHistory
    },
    data () {
      return {
        initialUserData: {},
        loading: ''
      }
    },
    mounted () {
      this.loadUserInfo()
    },
    methods: {
      loadUserInfo () {
        this.loading = true
        this.axios.get('user/profile')
          .then(response => {
            console.log(response)
            this.initialUserData = response.data
            this.loading = false
          })
          .catch(err => {
            console.log(err)
            this.$notify.error({
              title: 'Error',
              message: 'Ups! Something bad happened.'
            })
            this.loading = false
          })
      },
      updateUserPersonalInfo (form) {
        this.initialUserData.name = form.name
        this.initialUserData.surname = form.surname
        this.initialUserData.phone = form.phone
      },
      updateUserAddresses (address) {
        this.loading = true
        console.log(this.initialUserData.addresses)
        this.initialUserData.addresses.forEach((entry, index) => {
          console.log(entry.Id)
          if (entry.Id === address.Id) {
            console.log('Address found')
            this.set(this.initialUserData.addresses, index, address)
          }
        })
        console.log(this.initialUserData.addresses)
        this.loading = false
      }
    }
  }
</script>

<style>
  i {
    margin-right: 5px;
  }
  .fa-icon {
    margin-right: 5px;
    vertical-align: text-bottom;
  }
  .gd_wrapper {
    margin: auto;
    max-width: 700px;
    margin-top: 40px;
    padding: 10px 50px;
  }
  h2 {
    margin: 20px;
    margin-bottom: 40px;
  }
</style>

