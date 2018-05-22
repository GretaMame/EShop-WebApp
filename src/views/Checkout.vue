<template>
  <div>
    <info-message
      v-if="!cart.items || cart.items.length === 0"
      message="Your cart is empty. Please add items to your cart :("
      v-loading="loading">
    </info-message>
    <el-card v-if="cart.items && cart.items.length !== 0">
      <el-steps
        :active="activeIndex"
        finish-status="success"
        process-status="process"
        align-center>
        <el-step title="View cart"></el-step>
        <el-step title="Delivery"></el-step>
        <el-step title="Payment"></el-step>
        <el-step title="Review and place order"></el-step>
      </el-steps>
      <el-button v-if="!cart.items || cart.items.length === 0" @click="nextStep">
        next
      </el-button>
      <view-cart
        v-if="activeIndex === 0"
        :cart="cart"
        :subtotal="subtotal"
        :loading="loading"
        v-on:updateSubtotal="calculateSubtotal"
        v-on:nextStep="nextStep"
        v-on:previousStep="previousStep">
      </view-cart>
      <delivery
        v-if="activeIndex === 1"
        :address="deliveryAddress"
        :loading="loading"
        v-on:nextStep="nextStep"
        v-on:previousStep="previousStep"
        v-on:updateAddress="changeAddress">
      </delivery>
      <payment
        v-if="activeIndex === 2"
        :cardDetails="cardDetails"
        :loading="loading"
        v-on:updatePaymentDetails="changePaymentDetails"
        v-on:nextStep="nextStep"
        v-on:previousStep="previousStep">
      </payment>
      <order-summary
        v-if="activeIndex === 3"
        :cardDetails="cardDetails"
        :address="deliveryAddress"
        :subtotal="subtotal"
        :loading="loading"
        v-on:performCheckout="performCheckout"
        v-on:previousStep="previousStep"
        v-on:setLoading="setLoading"
        v-on:calcluateSubtotal="calculateSubtotal">
      </order-summary>
      <info-message
        v-if="activeIndex === numberOfSteps"
        message="Thank you for your order! Please check your email for your order details"
        v-loading="loading">
      </info-message>
    </el-card>
  </div>
</template>

<script>
import Viewcart from '@/components/Checkout/ViewCart.vue'
import Delivery from '@/components/Checkout/Delivery.vue'
import Payment from '@/components/Checkout/Payment.vue'
import OrderSummary from '@/components/Checkout/OrderSummary.vue'
import InfoMessage from '@/components/Shared/InfoMessage.vue'
import EventBus from '@/eventBus'
export default {
  components: {
    'view-cart': Viewcart,
    'delivery': Delivery,
    'payment': Payment,
    'order-summary': OrderSummary,
    'info-message': InfoMessage
  },
  data () {
    return {
      subtotal: 0,
      numberOfSteps: 4,
      activeIndex: 0,
      loading: '',
      cart: {},
      deliveryAddress: {},
      cardDetails: {}
    }
  },
  created () {
    EventBus.$on('cartMerged', this.cartMerged)
  },
  mounted () {
    if (this.$store.getters.isAuthenticated && this.$store.getters.localCart && this.$store.getters.localCart.length !== 0) {
      this.loading = true
      return
    }
    this.fetchData(!this.$store.getters.isAuthenticated)
  },
  beforeDestroy () {
    EventBus.$off('cartMerged', this.cartMerged)
  },
  methods: {
    cartMerged (mergeSuccessful) {
      this.fetchData(false)
      if (!mergeSuccessful) {
        this.loading = false
      }
    },
    fetchData (local) {
      this.loading = true
      if (local) {
        this.loadLocalCart().then(() => {
          this.loading = false
        }).catch((err) => {
          this.loading = false
          console.log('something bad happened ' + err)
        })
      } else {
        var cartPromise = this.loadCart()
        var addressPromise = this.loadAddress()
        Promise.all([cartPromise, addressPromise]).then(() => {
          this.calculateSubtotal()
          this.loading = false
        }).catch((err) => {
          this.loading = false
          if (err.cookieExpired) {
            this.fetchData(true)
            this.$notify.info({
              title: 'Logged out',
              message: 'You were logged out'
            })
            return
          }
          console.log('something bad happend ' + err)
        })
      }
    },
    loadCart () {
      return this.axios.get(`Cart`)
      .then(response => {
        this.cart = response.data
      })
    },
    loadLocalCart () {
      var cart = this.$store.getters.localCart
      if (!cart || cart.length === 0) {
        return Promise.resolve()
      }

      var filter = ''
      for (var i = 0; i < cart.length; i++) {
        filter += `id eq ${cart[i].ItemID} or `
      }
      filter = filter.slice(0, -4)
      var select = 'id,sku,name,price,attributes&$expand=attributes,pictures($select=url)'

      return this.axios.get(`odata/Items?$select=${select}&$filter=${filter}`).then(response => {
        this.cart.items = response.data.value
        this.prepareItems(cart)
        this.calculateSubtotal()
      })
    },
    loadAddress () {
      return this.axios.get('user/profile').then(response => {
        if (response.data.address) {
          this.setAddressFields(response.data.address, this.deliveryAddress)
        }
      })
    },
    prepareItems (cart) {
      if (!cart) return
      for (var i = 0; i < cart.length; i++) {
        this.cart.items[i]['count'] = cart[i].Count
        this.cart.items[i]['mainPicture'] = this.cart.items[i].pictures[0].url
      }
    },
    changeAddress (newAddress) {
      this.setAddressFields(newAddress, this.deliveryAddress)
    },
    changePaymentDetails (newDetails) {
      this.setCardDetails(newDetails, this.cardDetails)
    },
    controlNextStepButton (value) {
      this.buttonDisabled = value
    },
    nextStep () {
      if (++this.activeIndex > this.numberOfSteps) this.activeIndex = this.numberOfSteps
      if (this.activeIndex === 1) {
        this.$router.push({path: '/checkout'})
      }
    },
    previousStep () {
      if (--this.activeIndex < 0) this.activeIndex = 0
      if (this.activeIndex === 0) {
        this.$router.push({path: '/cart'})
      }
    },
    setAddressFields (from, to) {
      to.name = from.name
      to.surname = from.surname
      to.street = from.street
      to.city = from.city
      to.country = from.country
      to.postcode = from.postcode
    },
    setCardDetails (from, to) {
      to.number = from.number
      to.holder = from.holder
      to.exp_year = from.exp_year
      to.exp_month = from.exp_month
      to.cvv = from.cvv
    },
    calculateSubtotal () {
      var items = this.cart.items
      this.$nextTick(() => {
        if (items) {
          var arrayLength = items.length
          this.subtotal = 0
          for (var i = 0; i < arrayLength; i++) {
            this.subtotal += items[i].price * items[i].count
          }
        }
      })
    },
    performCheckout () {
      this.loading = true
      this.cardDetails['address'] = this.deliveryAddress
      this.cardDetails.number = this.cardDetails.number.replace(/\s/g, '')
      this.axios.post('checkout', this.cardDetails).then(response => {
        this.nextStep()
        this.loading = false
      }).catch(e => {
        this.$notify.error({
            title: 'Error',
            message: e.response.data.message
          })
        this.loading = false
      })
    },
    setLoading (value) {
      this.loading = value
    }
  }
}
</script>

<style scoped>
  .el-steps {
    margin: 20px;
    margin-top: 40px;
  }
  .el-card {
    margin: 20px
  }
  .gd_buttons_wrapper {
    margin-top: 20px;
  }
  .gd_step_body {
    max-width: 900px;
    margin: 0 auto;
  }
  .gd_step_buttons {
    margin: 20px;
  }
</style>
