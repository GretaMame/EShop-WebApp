<template>
  <el-card class="gd_step_body" v-loading="loading">
    <el-row class="gd_card_row">
      <h3 class="gd_step_title">Order summary</h3>
      <el-card class="gd_cart_item" v-for="item in items" :key="item.SKU" :item="item">
        <el-row :gutter="20">
        <el-col :span="8">
          <el-row>
          <img class="gd_image" :src="item.Image">
          </el-row>
          <el-row>
            <div align="left">
            </div>
          </el-row>
        </el-col>
        <el-col :span="16">
          <div class="gd_item_wrapper" align="left">
            <el-row>
              <el-col :span="12">
                <span class="gd_label">SKU:</span>
              </el-col>
              <el-col :span="12">
                <span class="gd_line">{{item.SKU}}</span>
              </el-col>
            </el-row>
            <el-row>
              <span class="gd_line">{{item.Name}}</span>
            </el-row>
            <el-row>
              <el-col :span="12">
                <span class="gd_label">Unit price:</span>
              </el-col>
              <el-col :span="12">
                <span class="gd_line">{{item.Price}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <span class="gd_label">Quantity:</span>
              </el-col>
              <el-col :span="12">
                <span class="gd_line">{{item.Count}}</span>
              </el-col>
            </el-row>
          <div
            v-if="item.Attributes"
            v-for="attribute in item.Attributes"
            :key="attribute.Name"
            :attribute="attribute">
            <el-row>
              <el-col :span="12">
                <span class="gd_attribute gd_label">{{attribute.Name}}:</span>
              </el-col>
              <el-col :span="12">
                <span class="gd_attribute gd_line"> {{attribute.Value}}</span>
              </el-col>
            </el-row>
          </div>
          </div>
        </el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-row class="gd_card_row">
      <el-card class="gd_cart_item">
        <div class="gd_wrapper" align="center">
          <h3>Payment details</h3>
          <div align="left">
            <el-row>
              <el-col :span="12">
                <span class="gd_label">Card number: </span>
              </el-col>
              <el-col :span="12">
                <span class="gd_line">**** **** **** {{cardDetails.number.substr(15)}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <span class="gd_label">Card holder: </span>
              </el-col>
              <el-col :span="12">
                <span class="gd_line">{{cardDetails.holder}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <span class="gd_label">Expiration date: </span>
              </el-col>
              <el-col :span="12">
                <span class="gd_line">{{cardDetails.exp_year}}/{{cardDetails.exp_month}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <span class="gd_label">CVV: </span>
              </el-col>
              <el-col :span="12">
                <span class="gd_line">***</span>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-card>
    </el-row>
    <el-row class="gd_card_row">
      <el-card class="gd_cart_item">
        <div class="gd_item_wrapper" align="center">
          <h3>Delivery Address</h3>
          <div class="gd_address_wrapper" align="left">
          <span class="gd_line">{{address.name}} {{address.surname}}</span><br>
          <span class="gd_line">{{address.street}}</span><br>
          <span class="gd_line">{{address.city}}</span><br>
          <span class="gd_line">{{address.country}} {{address.postcode}}</span>
          </div>
        </div>
      </el-card>
    </el-row>
    <el-row class="gd_card_row">
      <el-card>
        <div class="gd_item_wrapper" align="right">
          <div class="gd_subtotals">
        <h3><span class="gd_label">Subtotal:</span><span class="gd_price">{{(subtotal.toFixed(2))}} €</span></h3>
        <h3><span class="gd_label">Shipping:</span><span class="gd_price">{{(shippingCost)}} €</span></h3>
          </div>
        <h2><span class="gd_label">Total:</span><span class="gd_price">{{(subtotal.toFixed(2))}} €</span></h2>
        </div>
      </el-card>
    </el-row>
      <div class="gd_step_buttons">
        <el-button @click="$emit('previousStep')">Previous</el-button>
        <el-button type="primary" @click="$emit('nextStep')">Place order</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    cardDetails: { type: Object },
    address: { type: Object },
    items: {type: Array},
    loading: { type: Boolean },
    subtotal: { type: Number }
  },
  data () {
    return {
      shippingCost: 0
    }
  }
}
</script>

<style scoped>
  .el-row {
    margin-bottom: 10px;
  }
  .gd_card_row {
    margin-bottom: 20px;
  }
  .gd_label {
    font-weight: bold;
  }
  .gd_wrapper {
    margin: 0px auto;
    max-width: 300px;
  }
  .gd_item_wrapper {
    margin: 0 auto;
    max-width: 300px;
  }
  .gd_address_wrapper {
    margin: 0 auto;
    max-width: 120px;
  }
  .gd_step_title {
    margin-top: 20px;
    margin-bottom: 30px;
  }
  .gd_image {
    max-width: 140px;
    max-height: 140px;
  }
  .gd_cart_item {
    margin-bottom: 20px;
  }
  .gd_attribute {
    color: gray;
  }
  .gd_price {
    min-width: 150px;
    text-align: right;
    display: inline-block;
  }
</style>
