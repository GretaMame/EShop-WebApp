<template>
  <el-card class="box-card gd_wrapper" :v-loading="loading">
    <h2>Change password</h2>
    <el-form
      :model="user"
      :rules="rules"
      ref="changePasswordForm"
      size="medium"
      label-position="top"
      align="left">
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
      return {
        loading: '',
        user: {
          currentPassword: '',
          newPassword: ''
        },
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
            this.loading = false
            this.$refs['changePasswordForm'].resetFields()
          })
          .catch(err => {
            this.$notify.error({
              title: 'Error!',
              message: 'Password couldn\'t be changed'
            })
          this.$refs['changePasswordForm'].resetFields()
          this.loading = false
          console.log(err)
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
    padding: 10px 50px;
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
</style>
