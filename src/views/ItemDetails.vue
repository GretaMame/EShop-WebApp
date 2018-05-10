<template>
  <el-row>
    <el-card v-loading="loading" class="box-card" >
      <el-row>
        <el-breadcrumb v-if="item.ItemCategory" class="gd-itemDetailsBread">
          <el-breadcrumb-item :to="`/home/${item.ItemCategory.ID}`">
            {{item.ItemCategory.Name}}
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="`/home/${item.ItemCategory.ID}/${item.ItemCategory.SubCategory.ID}`">
            {{item.ItemCategory.SubCategory.Name}}
          </el-breadcrumb-item>
          <el-breadcrumb-item class="gd-truncateText">
            {{item.Name}}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-row :gutter="30">
        <el-col :lg="12" :md="24" :sm="24">
          <el-row>
            <el-carousel height="600px" :autoplay="false" arrow="always">
              <el-carousel-item v-if="item.Pictures && item.Pictures.length === 0">
                <img class="carouselImage" src="@/../static/image-not-found.jpg">
              </el-carousel-item>
              <el-carousel-item v-for="picture in this.item.Pictures" :key="picture.ID" >
                <img class="carouselImage" :src="picture.URL">
              </el-carousel-item>
            </el-carousel>
          </el-row>
        </el-col>
        <el-col :lg="12" :md="24" :sm="24">
            <el-row class="gd-itemName">
                <h2>{{this.item.Name}}</h2>
                <span>SKU: {{this.item.SKU}}</span>
            </el-row>
            <el-row v-for="attr in this.item.Attributes" :key="attr.AttributeID" :gutter="10">
              <el-col class="gd-attributeName" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                {{attr.Name}}:
              </el-col>
              <el-col class="gd-attributeValue" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                {{attr.Value}}
              </el-col>
            </el-row>
            <el-row class="gd-itemPrice">
              <span>{{item.Price}} €</span>
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
        {{this.item.Description}}
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
      this.axios.get(`odata/Items?$expand=Attributes,Pictures,ItemCategory($expand=SubCategory)&$filter=ID eq ${this.id}`).then(response => {
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
    height: 500px;
    width: auto;
    max-width: 500px;
    margin-top: 50px;
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
