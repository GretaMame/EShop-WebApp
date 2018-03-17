<template>
  <el-row>
      <el-card class="cart-card">
        <CartItem class="cart-item-card" v-for="item in items" :key="item.SKU" :item="item"></CartItem>
      </el-card>
  </el-row>
</template>

<script>
import CartItem from './../components/CartItem'
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
  .cart-card {
    margin: 3%;
    padding: 0;
  }
   .cart-item-card {
    margin: 2%;
  }
</style>
