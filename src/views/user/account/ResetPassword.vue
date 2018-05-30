<template>
  <el-row class="gd-row">
    <el-card class="gd-card" v-loading="loading">
      <div v-if="!successfulPasswordReset" class="gd-wrapper">
        <h3>Create new password</h3>
        <div class="gd-form-container">
          <el-form :model="resetPasswordForm" :rules="resetPasswordFormRules" ref="resetPasswordForm">
            <el-form-item prop="password">
              <div class="header">Your new password:</div>
              <el-input v-model="resetPasswordForm.password" type="password" placeholder="********"></el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword">
              <div class="header">Confirm new password:</div>
              <el-input
                v-model="resetPasswordForm.confirmPassword"
                type="password"
                placeholder="********"
                @keyup.enter.native="submitForm('resetPasswordForm')"></el-input>
            </el-form-item>
            <div v-if="showErr" class="gd-err-msg">UserId or Token was not found.</div>
            <el-form-item>
              <el-button
                :disabled="showErr"
                @click="submitForm('resetPasswordForm')"
                class="gd-btn">
                  Change password
                </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-else class="gd-wrapper">
        <h5>Your password was successfully changed.</h5>
        <el-button class="gd-btn" @click="$router.push('/login')">Jump to login</el-button>
      </div>
    </el-card>
  </el-row>
</template>
<script>
  export default {
    name: 'ResetPasswordView',
    data () {
      return {
        showErr: false,
        loading: false,
        successfulPasswordReset: false,
        resetPasswordForm: {
          userId: '',
          token: '',
          password: '',
          confirmPassword: ''
        },
        resetPasswordFormRules: {
          password: [{
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }],
          confirmPassword: [{
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.resetPassword()
          } else {
            return false
          }
        })
      },
      resetPassword () {
        this.showErr = false
        this.loading = true
        this.axios.post('account/resetpassword', this.resetPasswordForm).then(response => {
          this.successfulPasswordReset = true
          this.loading = false
        }).catch(err => {
          this.$notify.error({
            title: 'Error',
            message: err.response.data.message,
          offset: 50
          })
          console.log(err)
          this.loading = false
        })
      }
    },
    created: function () {
      let userId = this.$route.query.Id
      let token = this.$route.query.token
      if (userId && token) {
        this.resetPasswordForm.userId = userId
        this.resetPasswordForm.token = token
        return
      }
      this.showErr = true
    }
  }

</script>
<style scoped>
  .gd-row {
    display: flex;
    justify-content: center;
  }

  .gd-card {
    margin-top: 20px;
    width: 100%;
    max-width: 700px;
  }

  .gd-wrapper {
    max-width: 450px;
    margin: 20px auto;
  }

  .header {
    text-align: left;
  }

  .gd-form-container {
    margin-top: 40px;
  }

  .gd-err-msg {
    color: red;
    margin-bottom: 10px;
  }

  .gd-btn {
    margin-top: 20px;
  }

</style>
