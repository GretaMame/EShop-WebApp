<template>
  <router-view></router-view>
</template>

<script>
  import EventBus from './eventBus'
  export default {
    name: 'app',
    data () {
      return {
        loggedOutMessage: null
      }
    },
    created () {
      this.axios.get('account/renewcsrftoken').catch(err => {
        console.log(err)
      })

      EventBus.$on('cookieExpired', this.cookieExpired)
      EventBus.$on('onLogin', this.onLogin)
    },
    beforeDestroy () {
      EventBus.$off('cookieExpired', this.cookieExpired)
      EventBus.$off('onLogin', this.onLogin)
    },
    methods: {
      cookieExpired () {
        if (!this.loggedOutMessage) {
          this.$router.push({
            name: 'login',
            query: {
              redirect: this.$router.currentRoute.path
            }
          })
          EventBus.$emit('updateCartCount')

          this.loggedOutMessage = this.$notify.info({
            title: 'Logged out',
            message: 'You were logged out',
            offset: 50,
            onClose: () => { this.loggedOutMessage = null }
          })
        }
      },
      onLogin () {
        var cart = this.$store.getters.localCart
        if (!cart || cart.length === 0) {
          return
        }
        this.axios.get('account/renewcsrftoken').then(() => {
            this.axios.post('cart', {
              Items: cart
            }).then(response => {
              this.$store.dispatch('clearCart')
              EventBus.$emit('cartMerged', true)
            })
          })
          .catch(err => {
            console.log('Error while mergin cart ' + err)
            EventBus.$emit('cartMerged', false)
          })
      }
    }
  }

</script>
<style>
  .el-form--label-top .el-form-item__label {
    float: left;
  }

  .gd-app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    line-height: 1.6;
  }

  .gd-pr-30px {
    padding-right: 30px;
  }

  .gd-nav-header {
    padding: 0 !important;
  }

  .gd-body {
    height: calc(100vh - 60px);
  }

  .gd-body>* {
    margin-bottom: 20px;
  }

  .gd-logo {
    font: italic bold 20px Georgia, serif;
    color: peru;
  }

  .gd-float-right {
    float: right !important;
  }

  .gd-float-left {
    float: left !important;
  }

  .gd-no-margin {
    margin: 0;
  }

  .gd-text-align-left {
    text-align: left;
  }

  .gd-text-align-right {
    text-align: right;
  }

  .el-card__header {
    padding: 0px !important;
    padding-left: 5px !important;
    background-color: #F5F5F5 !important;
  }

  .gd-min-height-77vh {
    min-height: 77vh;
  }

  .gd-min-height-70vh {
    min-height: 70vh;
  }

</style>
