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
    <view-cart v-if="activeIndex === 0" ></view-cart>
    <delivery
      v-if="activeIndex === 1"
      :address="deliveryAddress"
      :loading="loading"
      v-on:updateAddress="changeAddress">
    </delivery>
    <payment v-if="activeIndex === 2"></payment>
    <order-summary v-if="activeIndex === 3"></order-summary>
    <div class="gd_buttons_wrapper">
      <el-button @click="previousStep">Previous</el-button>
      <el-button @click="nextStep" type="primary">Next</el-button>
    </div>
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
      numberOfSteps: 4,
      activeIndex: 0,
      loading: '',
      deliveryAddress: {},
      order: {
        address: {}
      }
    }
  },
  mounted () {
    this.loadAddress()
  },
  methods: {
    loadAddress () {
      this.loading = true
      this.axios.get('user/profile')
      .then(response => {
        this.deliveryAddress = response.data.address
        this.loading = false
      })
      .catch(error => {
        this.$notify.error({
          title: 'Error!',
          message: 'Could not fetch address'
        })
        console.log(error)
        this.loading = false
      })
    },
    changeAddress (newAddress) {
      this.setFields(newAddress, this.deliveryAddress)
    },
    nextStep () {
      if (++this.activeIndex > this.numberOfSteps) this.activeIndex = this.numberOfSteps
    },
    previousStep () {
      if (--this.activeIndex < 0) this.activeIndex = 0
    },
    setFields (from, to) {
      to.name = from.name
      to.surname = from.surname
      to.street = from.street
      to.city = from.city
      to.country = from.country
      to.postcode = from.postcode
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
</style>
