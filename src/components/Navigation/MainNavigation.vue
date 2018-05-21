<template>
  <div>
    <el-row class="hidden-sm-and-up">
      <NavigationMobile 
        :categories="categories" 
        :itemsInCart="itemsInCart" 
        v-on:signOut="signOut"/>
    </el-row>
    <el-row class="hidden-xs-only">
      <Navigation 
        :categories="categories" 
        :itemsInCart="itemsInCart" 
        v-on:signOut="signOut"/>
    </el-row>
  </div>
</template>
<script>
  import Navigation from '@/components/Navigation/Desktop'
  import NavigationMobile from '@/components/Navigation/Mobile'
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
      EventBus.$on('getNamesForBreadcrumb', (ids, setNames) => {
        if (this.categoriesPromise) {
          this.categoriesPromise.then(() => {
            this.resolveCategoriesNames(ids, setNames)
          })
        } else {
          this.resolveCategoriesNames(ids, setNames)
        }
      })
    },
    methods: {
      fetchData () {
        this.categoriesPromise = this.axios.get('Category').then(response => {
          this.categories = response.data
          this.categoriesPromise = null
        }).catch(err => {
          console.log(err)
        })
      },
      signOut () {
        this.axios.post('account/logout').then(response => {
          this.postSignOut()
        }).catch(err => {
          if (err.cookieExpired) {
            this.postSignOut()
            return
          }
          console.log('error: ', err)
          this.$notify.error({
            title: 'Error',
            message: 'Unable to log out.'
          })
        })
      },
      postSignOut () {
        this.$store.dispatch('logOut')
        this.$notify.success({
          title: 'Successful logout'
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
        setNames({categoryName: categoryName, subcategoryName: subcategoryName})
      },
      goToOrderHistory () {
        this.$router.push()
      }
    }
  }
</script>