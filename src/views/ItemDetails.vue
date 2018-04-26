<template>
  <el-row>
    <el-card v-loading="loading" class="box-card" >
      <el-row>
        <el-col :lg="12" :md="24" :sm="24">
          <el-row>
            <el-carousel height="600px" :autoplay="false" arrow="always">
              <el-carousel-item v-for="picture in this.item.pictures" :key="picture.id" >
                <img class="carouselImage" :src="picture.url">
              </el-carousel-item>
            </el-carousel>
          </el-row>
        </el-col>
        <el-col :lg="12" :md="24" :sm="24">
            <el-row class="gd-itemName">
                <h2>{{this.item.name}}</h2>
                <span>SKU: {{this.item.sku}}</span>
            </el-row>
            <el-row v-for="attr in this.item.attributes" :key="attr.attributeid">
              <span>{{attr.name}}: {{attr.value}}</span>
            </el-row>
            <el-row class="gd-itemPrice">
              <span>{{item.price}} €</span>
            </el-row>
            <el-row class="gd-addToCard">
              <el-input-number size="medium" :min="1" v-model="count"/>
              <el-button type="primary">Add to cart</el-button>
            </el-row>
        </el-col>
      </el-row>
      <el-row class="gd-description">
        <h2>Description</h2>
      </el-row>
      <el-row>
        {{this.item.description}}
      </el-row>
    </el-card>
  </el-row>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      item: {},
      loading: false,
      count: 1
    }
  },

  mounted () {
    this.loadItemDetails()
  },

  methods: {
    loadItemDetails () {
      this.loading = true
      this.axios.get(`items/itemdetails/${this.id}`).then(response => {
        this.item = response.data
        this.loading = false
      })
      .catch(err => {
        console.log(err)
        this.loading = false
        this.$notify.error({
          title: 'Error',
          message: 'Ups! Something bad happened.'
        })
      })
    }
  }
}
</script>

<style scoped>
  .box-card {
    margin: auto;
    margin-top: 16px;
    padding: 40px 60px 20px 60px;
    max-width: 1376px;
  }

  .carouselImage {
    height: 600px;
    width: auto;
    max-width: 600px;
  }

  .gd-itemName {
    padding-bottom:25px;
  }
    .gd-itemName > h2 {
      padding-bottom: 0px;
      margin-bottom: 0px;
      line-height: 1;
    }

    .gd-itemName > span {
      font-size: 12px;
      padding-top: -12px;
      margin-top: 0px;
    }

  .gd-itemPrice {
    font-size: 24px;
    padding-top: 24px;
  }

  .gd-addToCard {
    margin:20px;
  }

  .gd-description {
    margin-top: 16px;
    border-top: solid black 1pt;
  }

    .gd-description h2 {
      padding-top: 24px;
    }
</style>
