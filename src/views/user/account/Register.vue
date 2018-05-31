<template>
  <el-row>
    <el-card class="box-card" v-loading="loading">
      <div v-if="!dialogVisible">
        <h2>Create new account</h2>
        <el-form :model="registerForm" :rules="rules" ref="registerForm" size="medium">
          <el-form-item prop="username" label="Email">
            <el-input :autofocus="true" v-model="registerForm.username" placeholder="Enter your email"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="Password">
            <el-input type="password" v-model="registerForm.password" placeholder="Enter your password"></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword" label="Repeat password">
            <el-input type="password" v-model="registerForm.confirmPassword" placeholder="Repeat your password" @keyup.enter.native="submitForm('registerForm')">
            </el-input>
          </el-form-item>
          <div class="error-msg" v-if="errorOccured">
            {{errorMessage}}
          </div>
          <el-form-item>
            <el-button type="primary" @click="submitForm('registerForm')">Sign up</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-else>
        <span>Please check your email to validate your account.</span>
      </div>
    </el-card>
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
        loading: false,
        registerForm: {
          username: '',
          password: '',
          confirmPassword: ''
        },
        rules: {
          username: [{
            type: 'email',
            required: true,
            message: 'Please input correct email address',
            trigger: 'blur'
          }],
          password: [{
              required: true,
              message: 'Please enter your password',
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
          ],
          confirmPassword: [{
              required: true,
              message: 'Please repeat your password',
              trigger: 'blur'
            },
            {
              validator: validatePasswordRepeat,
              trigger: 'blur'
            }
          ]
        },
        errorOccured: false,
        errorMessage: ''
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.register()
          }
        })
      },
      register () {
        this.loading = true
        this.errorOccured = false
        this.axios.post('account/register', this.registerForm).then(response => {
          this.loading = false
          this.dialogVisible = true
        }).catch(err => {
          this.loading = false
          this.errorOccured = true
          this.errorMessage = err.response.data.message
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
  }

  form {
    margin: 0 auto;
    max-width: 450px;
    margin-top: 30px;
  }

  button {
    min-width: 150px;
    margin-top: 30px;
  }

  .error-msg {
    color: red;
  }

</style>
