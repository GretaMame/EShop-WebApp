<template>
  <div class="container">
    <el-card class="suc-card" v-loading="activating" element-loading-text="Activating">
      <el-row v-if="!errorOccured">
        <h3>Account verification successful</h3>
        <div>
          Your account has been confirmed and verified. Please login to start shopping.
        </div>
        <el-button @click="jumpToLogin" class="login-btn">
          Login
        </el-button>
      </el-row>
      <el-row v-else>
        <div class="err">
          Unable to confirm account. Please try again later.
        </div>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        activating: false,
        errorOccured: false
      }
    },
    mounted () {
      this.activating = true
      let userId = this.$route.query.UserId
      let code = this.$route.query.Code
      if (userId && code) {
        this.axios.get('account/confirmaccount?UserId=' + userId + '&Code=' + code).then(response => {
          this.activating = false
          this.errorOccured = false
        }).catch(e => {
          this.activating = false
          this.errorOccured = true
        })
      }
    },
    methods: {
      jumpToLogin () {
        this.$router.push('/login')
      }
    }
  }

</script>
<style scoped>
  .container {
    justify-content: center;
    display: flex;
  }

  .suc-card {
    padding: 10px;
    margin-top: 20px;
  }

  .login-btn {
    margin-top: 15px;
  }

  .err {
    color: red;
  }

</style>
