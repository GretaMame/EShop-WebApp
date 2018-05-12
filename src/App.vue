<template>
<router-view></router-view>
</template>

<script>
import EventBus from './eventBus'
export default {
  name: 'app',
  created () {
    this.axios.get('account/renewcsrftoken').catch(err => { console.log(err) })

    EventBus.$on('cookieExpired', () => {
      this.$router.push({name: 'login', query: {redirect: this.$router.currentRoute.path}})
      this.$notify.error({
        message: 'You were logged out'
      })
    })

    EventBus.$on('onLogin', () => {
      var cart = this.$store.getters.localCart
      if (!cart) {
        return
      }
      this.axios.post('cart', {Items: cart}).then(response => {
        this.$store.dispatch('clearCart')
      })
      .catch(err => {
        console.log('Error while mergin cart ' + err)
      })
    })
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
  }
  .gd-pr-30px{
    padding-right: 30px;
  }
  .gd-nav-header {
    padding: 0;
  }
  .gd-body {
    height: calc(100vh - 60px);
  }
    .gd-body > * {
      margin-bottom: 20px;
    }

  .gd-logo {
		font: italic bold 20px Georgia, serif;
		color:peru;
	}
  .gd-float-right {
    float: right !important;
  }
  .gd-float-left {
    float: left !important;
  }
  .gd-no-margin{
    margin: 0;
  }
  .gd-text-align-left{
    text-align: left;
  }
</style>
