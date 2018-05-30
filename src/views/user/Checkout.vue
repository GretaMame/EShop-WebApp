<template>
  <div>
    <div v-if="!cart.items || cart.items.length === 0" v-loading="loading">
        <el-card v-loading="loading">
          <h2 class="gd-min-height-70vh">
            Your cart is empty. Please add items to your cart.
          </h2>
        </el-card>
    </div>
    <el-card v-if="cart.items && cart.items.length !== 0" class="gd-min-height-77vh">
      <el-steps
        :active="activeIndex"
        finish-status="success"
        process-status="process"
        align-center>
        <el-step title="View cart"></el-step>
        <el-step title="Delivery"></el-step>
        <el-step title="Payment"></el-step>
        <el-step title="Review order"></el-step>
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
        v-if="activeIndex === 4"
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
      var localCart = this.$store.getters.localCart
      if (!localCart || localCart.length === 0) {
        return Promise.resolve()
      }

      var filter = ''
      for (var i = 0; i < localCart.length; i++) {
        filter += `id eq ${localCart[i].ItemID} or `
      }
      filter = filter.slice(0, -4)
      var select = 'id,sku,name,price,discount,attributes&$expand=attributes,pictures($select=url)'

      return this.axios.get(`odata/Items?$select=${select}&$filter=${filter}`).then(response => {
        this.cart = {items: response.data.value}
        this.prepareItems(localCart)
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
    prepareItems (localCart) {
      if (!localCart && !this.cart.items) return
      for (let i = 0; i < this.cart.items.length; i++) {
        let currItem = this.cart.items[i]
        let itemInLocal = localCart.find(i => i.ItemID === currItem.id)
        if (itemInLocal) {
          this.$set(this.cart.items[i], 'count', itemInLocal.Count)
        }
        this.$set(this.cart.items[i], 'mainPicture', this.cart.items[i].pictures[0] &&
          this.cart.items[i].pictures[0].url ? this.cart.items[i].pictures[0].url : null)
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

  @media screen and (min-width: 100px) and (max-width: 680px) {
    .el-card {
      margin: 0px;
    }
    .el-card__body {
      padding: 10px;
    }
  .el-steps {
    margin: 0px;
    margin-top: 0px;
  }
  }
</style>
