<template>
  <el-row>
    <el-card class="box-card">
      <h2>Log in to store</h2>
      <el-form ref="loginForm" :rules='rules' :model="loginForm" size="medium">
        <el-form-item prop="email" label="Email">
          <el-input :autofocus="true" v-model="loginForm.email" placeholder="Enter your email"></el-input>
        </el-form-item>
        <el-form-item id="passwordItem" prop="password" label="Password">
          <el-input type="password" v-model="loginForm.password" placeholder="Enter your password"></el-input>
        </el-form-item>
        <el-row justify="end">
          <el-form-item id="forgotPasswordLinkItem" size="mini">
            <el-button type="text" @click="redirect('login/forgotPassword')">Forgot password?</el-button>
          </el-form-item>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('loginForm')">Login</el-button>
          <el-button @click="redirect('register')">Sign up</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-row>
</template>
<script>
export default {
  data () {
    var checkIfEmptyField = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Field can\'t be empty'))
      } else {
        callback()
      }
    }
    return {
      windowName: '',
      loginForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [
        { type: 'email', message: 'Please input correct email address', trigger: 'blur,change' },
        { validator: checkIfEmptyField, trigger: 'blur' }
        ],
        password: [
          { validator: checkIfEmptyField, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('Please check your email to reset your password!')
          } else {
            console.log('Forgot password form submit error :(')
          }
        })
    },
    redirect (windowName) {
      this.$router.push(windowName)
    }
  }
}
</script>
<style scoped>
  .box-card {
    margin: auto;
    max-width: 600px;
    margin-top: 40px;
    padding: 40px 60px 20px 60px;
  }
  form {
    margin: 10px;
    margin-top: 30px;
  }
  #forgotPasswordLinkItem {
    text-align: end;
  }
  div#passwordItem {
    margin-bottom: 0px;
  }
  button {
    min-width: 120px;
  }
</style>
