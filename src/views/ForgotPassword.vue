<template>
  <el-row>
    <el-card class="box-card">
      <h2>Reset your password</h2>
      <p>Please enter the email address registered on your account.</p>
      <el-form ref="forgotPasswordForm" :rules="rules" :inline="true" :model="forgotPasswordForm" size="medium">
        <el-form-item prop="email">
          <el-input :autofocus="true" v-model="forgotPasswordForm.email" placeholder="Enter your email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('forgotPasswordForm')">Reset password</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog
      title="Password reset link has been sent!"
      :visible.sync="dialogVisible"
      width="35%">
      <span>Please check your email to reset your password.</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible=false">Ok</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {
        dialogVisible: false,
        forgotPasswordForm: {
          email: ''
        },
        rules: {
          email: [
            { required: true, message: 'Please enter your email address', trigger: 'blur' },
            { type: 'email', message: 'Please input correct email address', trigger: 'blur,change' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('Reset password successful!')
            this.dialogVisible = true
          } else {
            console.log('Forgot password form submit error :(')
          }
        })
      }
    }
  }
</script>

<style scoped>
  .box-card {
    margin: auto;
    max-width: 600px;
    margin-top: 40px;
    padding: 50px;
  }
  h2 {
    margin: 15px;
  }
  p {
    margin: 15px;
  }
  form {
    margin: 10px;
    margin-top: 50px;
  }
</style>
