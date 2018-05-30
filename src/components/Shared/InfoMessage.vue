<template>
  <el-card v-loading="loading">
    <div v-if="!feedbackSubmited">
      <div class="message">
        <h2>Thank you for your order!</h2>
        <h3>Please check your email for your order details</h3>
      </div>
      <div class="feedback-form-container">
        <div class="feedback-content">
          <p>How was your shopping experience? Please rate it below and leave your feedback.</p>
          <div class="rating-container">
            <el-col class="hidden-xs-only" :push="1" :sm="3" :md="3" :lg="3">
              <h4>Poor</h4>
            </el-col>
            <el-col :sm="8" :md="8" :lg="8">
              <el-rate class="rate-content" @change="rateChanged" v-model="form.rating" />
            </el-col>
            <el-col class="hidden-xs-only" :pull="1" :sm="3" :md="3" :lg="3">
              <h4>Great</h4>
            </el-col>
          </div>
          <el-form :model="form" :rules="rules" ref="feedbackForm">
            <el-form-item prop="message">
              <el-input type="textarea" v-model="form.message" placeholder="Enter your feedback">
              </el-input>
            </el-form-item>
            <el-form-item>
              <div class="error-custom" v-if="isErrorOccured">Please make sure you enter rating before submiting feedback!</div>
            </el-form-item>
            <div class="buttons" align="center">
              <el-form-item>
                <el-button class="btn" @click="$router.push('/home')">Continue shopping</el-button>
              </el-form-item>
              <el-form-item>
                <el-button class="btn" type="primary" @click="submitFeedback('feedbackForm')">Submit</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>Thank your for your feedback!</h1>
      <el-button class="btn" type="primary" @click="$router.push('/home')">Continue shopping</el-button>
    </div>
  </el-card>
</template>

<script>
  export default {
    data () {
      return {
        isErrorOccured: false,
        loading: false,
        feedbackSubmited: false,
        form: {
          message: '',
          rating: null
        },
        rules: {
          message: [{
            required: true,
            message: 'Please enter your feedback first',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      submitFeedback (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.form.rating === 0) {
              this.isErrorOccured = true
              return
            }
            this.loading = true
            this.axios.post('/feedback', this.form).then(response => {
              this.loading = false
              this.feedbackSubmited = true
            }).catch(e => {
              console.log(e)
              this.loading = false
              this.$notify.error({
                title: 'Error',
                message: e.response.data.message,
                offset: 50
              })
            })
          }
        })
      },
      rateChanged () {
        this.isErrorOccured = false
      }
    }
  }

</script>


<style scoped>
  .message {
    align-items: center;
    justify-content: center;
  }

  .message h2 {
    margin: 0;
  }

  .buttons {
    display: flex;
    justify-content: center;
  }

  .btn {
    margin: 5px;
  }

  .rate-content {
    margin: 0px 10px 30px 10px;
  }

  .el-rate__icon {
    font-size: 26px !important;
  }

  .feedback-form-container {
    justify-content: center;
    display: flex;
  }

  .feedback-content {
    max-width: 600px;
  }

  .rating-container {
    display: flex;
    justify-content: center;
  }

  .rating-container h4 {
    margin: 1px;
  }

  .error-custom {
    color: red;
  }

</style>
