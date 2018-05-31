<template>
  <div>
    <el-row class="hidden-sm-and-up">
      <NavigationMobile :categories="categories" :itemsInCart="itemsInCart" v-on:signOut="signOut" />
    </el-row>
    <el-row class="hidden-xs-only">
      <Navigation :categories="categories" :itemsInCart="itemsInCart" v-on:signOut="signOut" />
    </el-row>
  </div>
</template>
<script>
  import Navigation from '@/components/Navigation/DesktopNavigation'
  import NavigationMobile from '@/components/Navigation/MobileNavigation'
  import EventBus from '@/eventBus'

  export default {
    components: {
      Navigation,
      NavigationMobile
    },
    data () {
      return {
        categories: [],
        itemsInCart: 0,
        categoriesPromise: null
      }
    },
    created () {
      this.fetchData()
      EventBus.$on('getNamesForBreadcrumb', this.getNamesForBreadcrumb)
      EventBus.$on('cartMerged', this.loadCartCount)
      EventBus.$on('updateCartCount', this.loadCartCount)
    },
    beforeDestroy () {
      EventBus.$off('cartMerged', this.loadCartCount)
      EventBus.$off('updateCartCount', this.loadCartCount)
      EventBus.$off('getNamesForBreadcrumb', this.getNamesForBreadcrumb)
    },
    methods: {
      fetchData () {
        this.loadCategory().catch(err => {
          console.log(err)
        })
        this.loadCartCount()
      },
      loadCategory () {
        this.categoriesPromise = this.axios.get('Category').then(response => {
          this.categories = response.data
          this.categoriesPromise = null
        })
        return this.categoriesPromise
      },
      loadCartCount () {
        if (this.$store.getters.isAuthenticated) {
          this.axios.get('/Cart/itemsCount').then(response => {
            this.itemsInCart = response.data
          }).catch(err => {
            if (err.response && err.response.status === 404) {
              this.itemsInCart = 0
            }
          })
        } else {
          this.itemsInCart = this.$store.getters.countCartItemsCount
        }
      },
      signOut () {
        this.axios.post('account/logout').then(response => {
          this.postSignOut()
        }).catch(err => {
          if (err.cookieExpired) {
            this.postSignOut()
            return
          }
          this.$notify.error({
            title: 'Error',
            message: err.response.data.message,
            offset: 50
          })
        })
      },
      calculateCount (cartItems) {
        this.$nextTick(() => {
          if (cartItems) {
            var arrayLength = cartItems.length
            for (var i = 0; i < arrayLength; i++) {
              this.itemsInCart += cartItems[i].count
            }
          }
        })
      },
      postSignOut () {
        this.$store.dispatch('logOut')
        this.$notify.success({
          title: 'Successful logout',
          offset: 50
        })
        this.$router.push('/home')
        this.axios.get('account/renewcsrftoken')
      },
      resolveCategoriesNames (ids, setNames) {
        var categoryName
        var subcategoryName
        if (ids.categoryID) {
          for (let i = 0; i < this.categories.length; i++) {
            if (Number(ids.categoryID) === this.categories[i].id) {
              categoryName = this.categories[i].name
            }
          }
        }
        if (ids.subcategoryID) {
          for (let i = 0; i < this.categories.length; i++) {
            if (!this.categories[i].subCategories) {
              continue
            }
            for (let j = 0; j < this.categories[i].subCategories.length; j++) {
              if (Number(ids.subcategoryID) === this.categories[i].subCategories[j].id) {
                subcategoryName = this.categories[i].subCategories[j].name
              }
            }
          }
        }
        setNames({
          categoryName: categoryName,
          subcategoryName: subcategoryName
        })
      },
      goToOrderHistory () {
        this.$router.push()
      },
      getNamesForBreadcrumb (ids, setNames) {
        if (this.categoriesPromise) {
          this.categoriesPromise.then(() => {
            this.resolveCategoriesNames(ids, setNames)
          })
        } else {
          this.resolveCategoriesNames(ids, setNames)
        }
      }
    }
  }

</script>
