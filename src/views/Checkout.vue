<template>
  <div>
    <info-message
      v-if="cartItemsCount === 0"
      message="Your cart is empty. Please add items to your cart :("
      v-loading="loading">
    </info-message>
    <el-card v-if="cartItemsCount !== 0">
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
      <el-button v-if="cartItemsCount === 0" @click="nextStep">
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
        message="Your order has been placed. Thank you for your order!">
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
      cartItemsCount: 0,
      deliveryAddress: {},
      cardDetails: {}
    }
  },
  mounted () {
    if (this.$store.getters.isAuthenticated) {
      var cartPromise = this.loadCart()
      var addressPromise = this.loadAddress()
      Promise.all([cartPromise, addressPromise]).then(() => {
          this.calculateSubtotal()
          this.loading = false
        }).catch((err) => {
          console.log(err)
          this.loading = false
        })
    } else {
      this.loadLocalCart()
    }
  },
  methods: {
    countItemsInCart () {
      if (this.cart.items) {
        this.cartItemsCount = this.cart.items.length
      } else {
        this.cartItemsCount = 0
      }
    },
    loadCart () {
      this.loading = true
      return this.axios.get(`Cart`)
      .then(response => {
        this.cart = response.data
        this.countItemsInCart()
      })
      .catch(error => {
        if (error.response.status !== 404) {
          this.$notify.error({
            title: 'Error!',
            message: 'Could not fetch cart'
          })
          console.log(error)
        }
      })
    },
    loadLocalCart () {
      this.loading = true
      var cart = this.$store.getters.localCart
      if (!cart) {
        this.loading = false
        return
      }

      var filter
      for (var i = 0; i < cart.length; i++) {
        filter = `id eq ${cart[i].ItemID} or`
      }
      filter = filter.slice(0, -3)
      var select = 'id,sku,name,price,attributes&$expand=attributes,pictures($select=url)'

      this.axios.get(`odata/Items?$select=${select}&$filter=${filter}`)
        .then(response => {
          this.countItemsInCart()
          this.cart.items = response.data.value
          this.countItemsInCart()
          this.setCartItemsQuantities(cart)
          this.loading = false
        })
        .catch(err => {
          console.log(err)
          this.loading = false
        })
      },
    loadAddress () {
      this.loading = true
      return this.axios.get('user/profile')
      .then(response => {
        if (response.data.address) {
          this.setAddressFields(response.data.address, this.deliveryAddress)
        }
      })
      .catch(error => {
        this.$notify.error({
          title: 'Error!',
          message: 'Could not fetch address'
        })
        console.log(error)
      })
    },
    setCartItemsQuantities (cart) {
      if (cart === null) return
      for (var i = 0; i < cart.length; i++) {
        this.cart.items[i]['count'] = cart[i].Count
        console.log(this.cart.items[i].pictures)
        this.cart.items[i]['mainPicture'] = this.cart.items[i].pictures[0]
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
      this.cardDetails['address'] = this.deliveryAddress
      this.cardDetails.number = this.cardDetails.number.replace(/\s/g, '')
      console.log(this.cardDetails.number)
      this.axios.post('checkout', this.cardDetails).then(response => {
        this.nextStep()
      }).catch(e => {
        this.$notify.error({
            title: 'Error',
            message: e.response.data.message
          })
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
