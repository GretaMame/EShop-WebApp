<template>
  <el-card>
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
      v-on:previousStep="previousStep">
    </order-summary>
    <el-card v-if="activeIndex === numberOfSteps">
      <div class="gd_order_placed_text">
      <h2>Thank you for your order!</h2>
      </div>
    </el-card>
  </el-card>
</template>

<script>
import Viewcart from '@/components/Checkout/ViewCart.vue'
import Delivery from '@/components/Checkout/Delivery.vue'
import Payment from '@/components/Checkout/Payment.vue'
import OrderSummary from '@/components/Checkout/OrderSummary.vue'
export default {
  components: {
    'view-cart': Viewcart,
    'delivery': Delivery,
    'payment': Payment,
    'order-summary': OrderSummary
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
  mounted () {
    var cartPromise = this.loadCart()
    var addressPromise = this.loadAddress()
    Promise.all([cartPromise, addressPromise]).then(() => {
        this.calculateSubtotal()
        this.loading = false
      }).catch((err) => {
        console.log(err)
        this.loading = false
      })
  },
  methods: {
    loadCart () {
      this.loading = true
      return this.axios.get(`Cart`)
      .then(response => {
        this.cart = response.data
      })
      .catch(error => {
        this.$notify.error({
          title: 'Error!',
          message: 'Could not fetch cart'
        })
        console.log(error)
      })
    },
    loadAddress () {
      this.loading = true
      return this.axios.get('user/profile')
      .then(response => {
        this.setAddressFields(response.data.address, this.deliveryAddress)
      })
      .catch(error => {
        this.$notify.error({
          title: 'Error!',
          message: 'Could not fetch address'
        })
        console.log(error)
      })
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
    },
    previousStep () {
      if (--this.activeIndex < 0) this.activeIndex = 0
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
        var arrayLength = items.length
        this.subtotal = 0
        for (var i = 0; i < arrayLength; i++) {
          this.subtotal += items[i].price * items[i].count
        }
      })
    },
    performCheckout () {
      this.cardDetails['address'] = this.deliveryAddress
      this.axios.post('checkout', this.cardDetails).then(response => {
        this.nextStep()
      }).catch(e => {
        this.$notify.error({
            title: 'Error',
            message: e.response.data.message
          })
      })
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
  .gd_order_placed_text {
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .gd_order_placed_text h2{
    margin: 0;
  }
  .gd_step_buttons {
    margin: 20px;
  }
</style>
