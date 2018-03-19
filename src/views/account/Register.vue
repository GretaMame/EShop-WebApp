<template>
  <el-row>
    <el-card class="box-card">
      <h2>Create new account</h2>
      <el-form :model="registerForm" :rules="rules" ref="registerForm" size="medium">
        <el-form-item prop="email" label="Email">
          <el-input :autofocus="true" v-model="registerForm.email" placeholder="Enter your email"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="Password">
          <el-input type="password" v-model="registerForm.password" placeholder="Enter your password"></el-input>
        </el-form-item>
        <el-form-item prop="passwordRepeat" label="Repeat password">
          <el-input type="password" v-model="registerForm.passwordRepeat" placeholder="Repeat your password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerForm')">Sign up</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog
      title="Your registration was successful!"
      :visible.sync="dialogVisible"
      width="35%">
      <span>Please check your email to validate your account.</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible=false">Ok</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
  export default {
    data () {
      var validatePasswordRepeat = (rule, value, callback) => {
        if (value !== this.registerForm.password) {
          callback(new Error('Passwords don\'t match!'))
        } else {
          callback()
        }
      }
      return {
        dialogVisible: false,
        registerForm: {
        email: '',
        password: '',
        passwordRepeat: ''
        },
        rules: {
          email: [
            { required: true, message: 'Please enter your email address', trigger: 'blur' },
            { type: 'email', message: 'Please input correct email address', trigger: 'blur,change' }
          ],
          password: [
            { required: true, message: 'Please enter your password', trigger: 'blur' },
            { min: 6, message: 'Password must be at least 5 characters', trigger: 'change, blur' }
          ],
          passwordRepeat: [
            { required: true, message: 'Please repeat your password', trigger: 'blur' },
            { validator: validatePasswordRepeat, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('Sign up successful')
            this.dialogVisible = true
          } else {
            console.log('Sign up error :(')
            return false
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
    padding: 40px 60px 0px 60px;
  }
  form {
    margin: 10px;
    margin-top: 30px;
  }
  button {
    min-width: 150px;
    margin-top: 30px;
  }
</style>
