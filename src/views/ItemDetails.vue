<template>
  <el-row>
    <el-card v-loading="loading" class="box-card" >
      <el-row>
<<<<<<< HEAD
        <el-breadcrumb v-if="item.ItemCategory" class="gd-itemDetailsBread">
          <el-breadcrumb-item :to="`/home/${item.ItemCategory.ID}`">
            {{item.ItemCategory.name}}
=======
        <el-breadcrumb v-if="item.itemCategory" class="gd-itemDetailsBread">
          <el-breadcrumb-item :to="`/home/${item.itemCategory.id}`">
            {{item.itemCategory.name}}
>>>>>>> master
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="`/home/${item.itemCategory.id}/${item.itemCategory.subCategory.id}`">
            {{item.itemCategory.subCategory.name}}
          </el-breadcrumb-item>
          <el-breadcrumb-item class="gd-truncateText">
            {{item.name}}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-row :gutter="30">
        <el-col :lg="12" :md="24" :sm="24">
          <el-row>
            <el-carousel height="500px" :autoplay="false" arrow="always">
              <el-carousel-item v-if="item.pictures && item.pictures.length === 0">
                <img class="carouselImage" src="@/../static/image-not-found.jpg">
              </el-carousel-item>
<<<<<<< HEAD
              <el-carousel-item v-for="picture in this.item.pictures" :key="picture.ID" >
                <img class="carouselImage" :src="picture.URL">
=======
              <el-carousel-item v-for="picture in this.item.pictures" :key="picture.id" >
                <img class="carouselImage" :src="picture.url">
>>>>>>> master
              </el-carousel-item>
            </el-carousel>
          </el-row>
        </el-col>
        <el-col :lg="12" :md="24" :sm="24">
            <el-row class="gd-itemName">
                <h2>{{this.item.name}}</h2>
                <span>SKU: {{this.item.sku}}</span>
            </el-row>
            <el-row v-for="attr in this.item.attributes" :key="attr.attributeID" :gutter="10">
              <el-col class="gd-attributeName" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                {{attr.name}}:
              </el-col>
              <el-col class="gd-attributeValue" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                {{attr.value}}
              </el-col>
            </el-row>
            <el-row class="gd-itemPrice">
              <span>{{item.price}} €</span>
            </el-row>
            <el-row class="gd-addToCard">
              <el-input-number size="medium" :min="1" v-model="count"/>
              <el-button type="primary" @click="addToCart()">Add to cart</el-button>
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
      this.axios.get(`odata/Items?$expand=attributes,pictures,itemCategory($expand=subCategory)&$filter=id eq ${this.id}`).then(response => {
        if (response.data.value && response.data.value[0]) {
          this.item = response.data.value[0]
        }
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
    },
    addToCart () {
      var newItem = {
        ItemID: this.id,
        Count: this.count
      }
      var addPromise = null
      if (this.$store.getters.isAuthenticated) {
        addPromise = this.addToCartRemote(newItem)
      } else {
        addPromise = this.addToCartLocal(newItem)
      }

      addPromise.then(() => {
        this.$notify.closeAll()
        this.$notify.success({
          title: 'Success',
          message: 'Item was added to cart.'
        })
      })
      .catch(err => {
        // try again if cookie expired, so items will be added to local storage cart
        if (err.cookieExpired) {
          this.addToCart()
          return
        }
        console.log(err)
        this.$notify.closeAll()
        this.$notify.error({
          title: 'Error',
          message: 'Ups! Something bad happened.'
        })
      })
    },
    addToCartLocal (item) {
      return new Promise((resolve) => {
        this.$store.dispatch('addItemToCart', item)
        resolve()
      })
    },
    addToCartRemote (item) {
      return this.axios.put(`cart`, item)
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
    max-height: 500px;
    max-width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto auto;
  }

  .gd-truncateText {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 25vw;
  }

  .gd-itemDetailsBread {
    font-size: 18px;
    padding-bottom: 20px;
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

  .gd-attributeName {
    text-align: right;
  }

  .gd-attributeValue {
    text-align: left;
    color: grey;
  }

  .gd-itemPrice {
    font-size: 24px;
    padding-top: 24px;
  }

  .gd-addToCard {
    margin:20px;
  }

    .gd-addToCard > .el-input-number {
      margin-right: 10px;
    }

  .gd-description {
    margin-top: 16px;
    border-top: solid black 1pt;
  }

    .gd-description h2 {
      padding-top: 24px;
    }
</style>
