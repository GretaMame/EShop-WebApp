<template>
  <el-card class="gd_wrapper" :v-loading="loading">
    <h2>Change password</h2>
    <el-form
      :model="user"
      :rules="rules"
      ref="changePasswordForm"
      size="medium"
      label-position="top"
      align="left"
      class="gd_form_wrapper">
      <el-form-item id="passwordItem" prop="currentPassword" label="Current password">
        <el-input
          type="password"
          :autofocus="true"
          v-model="user.currentPassword"
          placeholder="Enter your current password">
        </el-input>
      </el-form-item>
      <el-row>
        <el-form-item id="forgotPasswordLinkItem" size="mini">
            <el-button
              class="gd_link"
              type="text"
              @click="redirect('forgotPassword')">
              Forgot password?
            </el-button>
          </el-form-item>
        </el-row>
      <el-form-item prop="newPassword" label="New password">
        <el-input
          type="password"
          v-model="user.newPassword"
          placeholder="Enter your new password">
        </el-input>
      </el-form-item>
      <el-form-item prop="repeatNewPassword" label="Repeat new password">
        <el-input
          type="password"
          v-model="user.repeatNewPassword"
          placeholder="Repeat your new password"
          @keyup.enter.native="submitForm('changePasswordForm')">
        </el-input>
      </el-form-item>
      <el-form-item align="center">
        <el-button
          type="primary"
          @click="submitForm('changePasswordForm')">
          Change password
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    data () {
      var validatePasswordRepeat = (rule, value, callback) => {
        if (value !== this.user.newPassword) {
          callback(new Error('Passwords don\'t match!'))
        } else {
          callback()
        }
      }
      var checkIfNewPasswordIsDifferent = (rule, value, callback) => {
        if (value === this.user.currentPassword) {
          callback(new Error('New password can\'t match current password!'))
        } else {
          callback()
        }
      }
      return {
        loading: '',
        user: {
          currentPassword: '',
          newPassword: '',
          repeatNewPassword: ''
        },
        errorMessage: '',
        rules: {
          currentPassword: [
            {
              required: true,
              message: 'Please enter your current password',
              trigger: 'blur'
            }
          ],
          newPassword: [
            {
              required: true,
              message: 'Please enter your new password',
              trigger: 'blur'
            },
            {
              min: 6,
              message: 'Password must be at least 6 characters',
              trigger: 'change, blur'
            },
            {
              pattern: '[A-Z]+',
              message: 'Password must contain at least one upper case letter',
              trigger: 'blur, change'
            },
            {
              pattern: '[0-9]+',
              message: 'Password must contain at least one digit',
              trigger: 'blur, change'
            },
            {
              pattern: '[!@#$%^&*]',
              message: 'Password must contain at least one speacial character',
              trigger: 'blur, change'
            },
            {
              validator: checkIfNewPasswordIsDifferent,
              trigger: 'blur'
            }
          ],
          repeatNewPassword: [
            {
              required: true,
              message: 'Please repeat your new password',
              trigger: 'blur'
            },
            {
              validator: validatePasswordRepeat,
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.axios.put('account/changePassword', this.user)
          .then(response => {
          console.log('Password change successful')
            this.$notify.success({
              title: 'Success!',
              message: 'Password changed'
            })
            this.$store.dispatch('logOut')
            this.redirect('login')
          })
          .catch(err => {
            this.$notify.error({
              title: 'Error!',
              message: err.response.data.message
            })
          this.$refs['changePasswordForm'].resetFields()
          this.loading = false
          })
        }
      })
    },
    redirect (windowName) {
        this.$router.push({name: windowName})
      }
  }
}
</script>

<style scoped>
  label {
    margin: 0px;
  }
  form {
    margin: 10px;
    margin-top: 30px;
    padding: 0px 60px;
  }
  .el-button {
    margin-top: 30px;
  }
  .gd_wrapper {
    margin: auto;
    max-width: 700px;
    margin-top: 40px;
  }
  .gd_form_wrapper {
    margin: 0 auto;
    max-width: 400px;
    padding: 0;
  }
  h2 {
    margin: 20px;
    margin-bottom: 40px;
  }
  #forgotPasswordLinkItem {
    text-align: end;
  }
  div#passwordItem {
    margin-bottom: 0px;
  }
  .gd_link {
    margin-top: 0px;
  }
  @media screen and (max-width: 600px) {
    .gd_wrapper {
      margin: auto;
      margin-top: 40px;
      padding: 10px 10px;
    }
    form {
    margin: 10px;
    margin-top: 30px;
  }
  }
</style>
