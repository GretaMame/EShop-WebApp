<template>
  <el-card class="box-card gd_wrapper">
    <h2>Change password</h2>
    <el-form :model="user" :rules="rules" ref="changePasswordForm" size="medium" label-position="top" align="left">
      <el-form-item label="Current password">
        <el-input type="password" :autofocus="true" v-model="user.currentPassword" placeholder="Enter your current password"></el-input>
      </el-form-item>
      <el-form-item prop="newPassword" label="New password">
        <el-input type="password" v-model="user.newPassword" placeholder="Enter your new password"></el-input>
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" @click="submitForm('changePasswordForm')">Change password</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    data () {
      return {
        user: {
          email: '',
          currentPassword: '',
          newPassword: ''
        },
        rules: {
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
          console.log('Password change successful')
          this.dialogVisible = true
        } else {
          console.log('Password change error :(')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  form {
    margin: 10px;
    margin-top: 30px;
    padding: 0px 60px;
  }
  .el-button {
    margin-top: 30px;
  }
</style>
