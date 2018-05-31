<template>
  <el-row>
    <el-card class="box-card" v-loading="loading">
      <h2>Reset your password</h2>
      <p>Please enter the email address registered on your account.</p>
      <el-form ref="forgotPasswordForm" :rules="rules" :model="forgotPasswordForm" size="medium">
        <el-form-item prop="email">
          <el-input
            :autofocus="true"
            v-model="forgotPasswordForm.email"
            placeholder="Enter your email"
            @keyup.enter.native="submitForm('forgotPasswordForm')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('forgotPasswordForm')">Reset password</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog title="Password reset link has been sent!" :visible.sync="dialogVisible" width="35%">
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
        loading: false,
        forgotPasswordForm: {
          email: ''
        },
        rules: {
          email: [{
            required: true,
            type: 'email',
            message: 'Please enter your email address',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.resetPassword()
          }
        })
      },
      resetPassword () {
        this.loading = true
        this.axios.post('account/forgotPassword', this.forgotPasswordForm).then(response => {
          this.loading = false
          this.dialogVisible = true
        }).catch(err => {
          this.dialogVisible = false
          this.loading = false
          this.$notify.error({
            title: 'Error',
            message: err.response.data.message,
          offset: 50
          })
        })
      }
    }
  }

</script>

<style scoped>
  .box-card {
    margin: auto;
    max-width: 700px;
    margin-top: 40px;
  }

  form {
    margin: 40px auto;
    max-width: 450px;
  }

  h2 {
    margin: 15px;
  }

  p {
    margin: 15px;
  }

  button {
    margin-top: 30px;
  }
</style>
