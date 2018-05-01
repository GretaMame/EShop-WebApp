<template>
  <el-row>
    <el-col :lg="18" :md="18" :sm="16" :xs="24">
      <el-row>
        <el-card class="gd-cart-card">
          <h2>My shopping bag</h2>
          <CartItem class="gd-cart-item-card" v-for="item in items" v-bind:key="item.SKU" v-bind:item="item"></CartItem>
        </el-card>
      </el-row>
    </el-col>
    <el-col class="gd-summary-card" :lg="6" :md="6" :sm="8" :xs="16" :push="8">
      <div>
        <el-card class="gd-cart-total-card">
          <el-row>
            <h4>SUMMARY</h4>
              <el-row>
                <el-col class="gd-total-price-label" :lg="12" :md="10" :sm="9" :xs="14">
                  <p>Total: </p>
                </el-col>
                <el-col class="gd-item-price" :lg="12" :md="14" :sm="15" :xs="8">
                  <p>10000.12 €</p>
                </el-col>
              </el-row>
            <el-button class="gd-checkout-button" type="primary">Checkout</el-button>
          </el-row>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CartItem from '@/components/CartItem'
export default {
  data () {
      return {
          items: [
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
            CreateDate: '2018-03-16 23:20'}
          ]
      }
  },
  components: {
    CartItem
  }
  // mounted () {
    // this.axios.get('api/items').then(response => {
    //   this.items = response.data
    // }).catch(error => {
    //   console.log(error)
    // })
  // }
}
</script>

<style scoped>
  .gd-cart-card{
    margin-right: 10px;
    margin-bottom: 16px;
  }
   .gd-cart-item-card {
    margin-bottom: 20px;
  }
  .gd-cart-total-card{
    background-color: #F5F5F5;
    margin-bottom: 20px;
    margin-right: 8px;
  }
  .gd-summary-card{
    position: sticky;
    top: 0;
  }
  .cart-total-price-font{
    font-size: 16pt;
    text-decoration-color: gray;
    font-weight: bold;
    margin: 0;
  }
  .gd-checkout-button{
    float: right;
  }
  .gd-total-price-label{
    margin-bottom: 0;
    text-align: right;
    vertical-align: text-bottom;
  }
  .gd-item-price{
    font-size: 14pt;
    color: midnightblue;
    font-weight: bold;
    text-align: right;
    float: left;
  }
</style>
