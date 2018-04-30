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
      :items="items"
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
      :items="items"
      :subtotal="subtotal"
      :loading="loading"
      v-on:nextStep="nextStep"
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
      deliveryAddress: {},
      items: [],
      cardDetails: {}
    }
  },
  mounted () {
    this.loadItems()
    this.loadAddress()
    this.calculateSubtotal()
  },
  methods: {
    loadAddress () {
      this.loading = true
      this.axios.get('user/profile')
      .then(response => {
        this.setAddressFields(response.data.address, this.deliveryAddress)
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
    loadItems () {
      // for now hardcoded data
      this.items.push(
            {SKU: '12134123',
            Name: 'Men\'s jacket Rahfa',
            Image: 'https://style24.lt/image/cache/data/products/82/vyriskas-megztinis-rahfa-39052-750x750.jpg',
            Price: 37.95,
            Count: 1,
            CreateDate: '2018-03-17 15:00',
            Attributes: [{Name: 'Color', Value: 'blue'}, {Name: 'Style', Value: 'casual'}]},
            {SKU: '12144123',
            Name: 'Mountainskin Thicken Fleece Winter Jackets Men\'s Coats 5XL Cotton Fur Collar Men\'s Jackets Military Casual Male Outerwear SA351',
            Image: 'https://ae01.alicdn.com/kf/HTB1Tzy9SpXXXXaKXpXXq6xXFXXXX/Mountainskin-Thicken-Fleece-Winter-Jackets-Men-s-Coats-5XL-Cotton-Fur-Collar-Men-s-Jackets-Military.jpg_640x640.jpg',
            Price: 31.89,
            Count: 3,
            CreateDate: '2018-03-17 14:45',
            Attributes: [{Name: 'Color', Value: 'black'}, {Name: 'Size', Value: 'XXL'}]},
            {SKU: '12144122223',
            Name: 'New Version Jumper EZbook 3 Pro Dual Band AC Wifi laptop with M.2 SATA SSD Slot Apollo Lake N3450 13.3" IPS 6GB DDR3 ultrabook',
            Image: 'https://ae01.alicdn.com/kf/HTB1WgwNQVXXXXXrXFXXq6xXFXXXP/New-Version-Jumper-EZbook-3-Pro-Dual-Band-AC-Wifi-laptop-with-M-2-SATA-SSD.jpg_640x640.jpg',
            Price: 322.83,
            Count: 1,
            CreateDate: '2018-03-17 13:10',
            Attributes: [{Name: 'Color', Value: 'white'}]},
            {SKU: '2323122223',
            Name: '50pcs T5577 EM4305 Copy Rewritable Writable Rewrite Duplicate RFID Tag Can Copy EM4100 125khz card Proximity Token Keyfobs',
            Image: 'https://ae01.alicdn.com/kf/HTB1SQEUPFXXXXalXpXXq6xXFXXXI/50pcs-T5577-EM4305-Copy-Rewritable-Writable-Rewrite-Duplicate-RFID-Tag-Can-Copy-EM4100-125khz-card-Proximity.jpg_640x640.jpg',
            Price: 15.49,
            Count: 4,
            CreateDate: '2018-03-16 23:20'})
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
      this.$nextTick(() => {
        var arrayLength = this.items.length
        this.subtotal = 0
        for (var i = 0; i < arrayLength; i++) {
          this.subtotal += this.items[i].Price * this.items[i].Count
        }
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
    padding-left: 40px;
    padding-right: 40px;
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
