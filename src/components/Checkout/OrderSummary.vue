<template>
  <el-card class="gd_step_body" v-loading="loading">
    <el-row>
      <h3>Order summary</h3>
      <cart-item
      class="gd_cart_item"
      v-for="item in cart.items"
      v-bind:key="item.sku"
      v-bind:item="item"
      v-bind:editable="false"/>
    </el-row>
    <el-row>
      <el-card class="gd_cart_item gd_font">
        <el-row>
          <el-row>
            <el-col :span="12">
              <h3>Payment details</h3>
            </el-col>
            <el-col :span="12">
              <h3>Delivery Address</h3>
            </el-col>
          </el-row>
          <el-col class="gd_padding_bottom" :span="12">
            <el-col :span="6">
              <img src="http://prints.ultracoloringpages.com/26394191ee3b0e1409d127324c3a5d56.png" class="gd_image">
            </el-col>
            <el-col :span="18" align="left">
              <el-row>
                <el-col :span="11" class="gd_label">Card number: </el-col>
                <el-col :span="12">**** **** **** {{cardDetails.number.substr(15)}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="11"  class="gd_label">Card holder: </el-col>
                <el-col :span="12">{{cardDetails.holder}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="11" class="gd_label">Expiration date: </el-col>
                <el-col :span="12">{{cardDetails.exp_year}}/{{cardDetails.exp_month}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="11" class="gd_label">CVV: </el-col>
                <el-col :span="12">***</el-col>
              </el-row>
            </el-col>
          </el-col>
          <el-col class="gd_padding_bottom gd_border_color" :span="12">
            <el-col :span="6">
              <img src="https://seeklogo.com/images/M/man-silhouette-delivery-logo-0DBA9FBE43-seeklogo.com.png" class="gd_image">
            </el-col>
            <el-col :span="18" align="left">
                <el-row>
                  <el-col :span="8" class="gd_label">Name: </el-col>
                  <el-col :span="12">{{address.name}} {{address.surname}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="8" class="gd_label">Street: </el-col>
                  <el-col :span="12">{{address.street}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="8" class="gd_label">Postcode: </el-col>
                  <el-col :span="12">{{address.postcode}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="8" class="gd_label">City: </el-col>
                  <el-col :span="12">{{address.city}}, {{address.country}}</el-col>
                </el-row>
            </el-col>
          </el-col>
        </el-row>
        <div class="gd_summary">
          <el-row class="gd_padding_bottom">
            <el-row>
              <el-col class="gd-text-align-right" :span="18">Subtotal:</el-col>
              <el-col :span="5">{{(subtotal.toFixed(2))}} €</el-col>
            </el-row>
            <el-row>
              <el-col class="gd-text-align-right" :span="18">Shipping:</el-col>
              <el-col :span="5">{{(shippingCost)}} €</el-col>
            </el-row>
          </el-row>
          <el-row>
            <el-col class="gd-text-align-right" :span="18">Total:</el-col>
            <el-col :span="5">{{(subtotal.toFixed(2))}} €</el-col>
          </el-row>
        </div>
      </el-card>
    </el-row>
    <el-row>
      <el-button @click="$emit('previousStep')">Previous</el-button>
      <el-button type="primary" @click="$emit('nextStep')">Place order</el-button>
    </el-row>
  </el-card>
</template>

<script>
import CartItem from '@/components/CartItem.vue'
export default {
  props: {
    cardDetails: { type: Object },
    address: { type: Object },
    loading: { type: Boolean },
    subtotal: { type: Number }
  },
  components: {
    'cart-item': CartItem
  },
  data () {
    return {
      shippingCost: 0,
      formName: 'Summary',
      cart: {}
    }
  },
  mounted () {
    var cartPromise = this.loadCart()
    Promise.all([cartPromise]).then(() => {
        this.calculateSubtotal()
        this.$emit('updateSubtotal')
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
    }
  }
}
</script>

<style scoped>
  .gd_font{
    background: #F5F5F5;
  }
  .gd_label {
    font-weight: bold;
  }
  .gd_step_title {
    margin-top: 20px;
    margin-bottom: 30px;
  }
  .gd_image {
    max-width: 60px;
    max-height: 70px;
  }
  .gd_cart_item {
    margin-bottom: 20px;
  }
  .gd_summary{
    padding-top: 20px; 
    font-size: 20pt;
  }
  .gd_padding_bottom{
    padding-bottom: 20px;
  }
  .gd_border_color{
    border-bottom: 0.5px outset #8a170617;
  }
</style>
