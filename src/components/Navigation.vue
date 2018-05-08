<template>
  <div class="gd-nav">
    <el-menu :default-active="$route.path" :mode="displayMode" :router="true" background-color="#333333" text-color="#fff" active-text-color="#DF3A01">
      <el-menu-item index="/home" route="/home">
        <template slot="title">
          <span class="gd-logo">
            Goal Diggers
          </span>
        </template>
      </el-menu-item>
      <el-submenu index="/categories">
        <template slot="title">Goods</template>
        <el-submenu v-for="category in categories" :key="category.name" :index="`/home/${category.id}`">
          <template slot="title">
            <span class="gd-category gd-pr-30px">
              {{category.name}}
            </span>
          </template>
          <el-menu-item v-if="category.subCategories" 
          v-for="subcategory in category.subCategories" 
          :key="subcategory.name" 
          :index="`/home/${category.id}/${subcategory.id}`">
            <template slot="title">
              <span class="gd-category">
                {{subcategory.name}}
              </span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item class="gd-float-right" index="/register" v-if="!this.$store.getters.isAuthenticated" route="/register">
        Sign up
      </el-menu-item>
      <el-menu-item class="gd-float-right" index="/login" v-if="!this.$store.getters.isAuthenticated" route="/login">
        Log in
      </el-menu-item>
      <el-submenu class="gd-float-right" index="/user" v-if="this.$store.getters.isAuthenticated">
        <template slot="title">
          <icon name="user-o"></icon>
        </template>
        <el-menu-item index="/user/profile" route="/user/profile">
          My account
        </el-menu-item>
        <el-menu-item index="/user/orderHistory" route="/user/orderHistory">
          Order history
        </el-menu-item>
        <el-menu-item index="/user/signout" v-on:click="signOut">
          Sign out
        </el-menu-item>
      </el-submenu>
      <el-menu-item class="gd-float-right" index="/cart" route="/cart">
        <i class="el-icon-goods"></i>
        {{(itemsInCart)}}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import EventBus from '@/eventBus'
  export default {
    data () {
      return {
        categories: [],
        activeIndex: '1',
        itemsInCart: 0,
        displayMode: 'horizontal',
        categoriesPromise: null
      }
    },
    created () {
      this.fetchData()

      EventBus.$on('getNamesForBreadcrumb', (ids) => {
        if (this.categoriesPromise) {
          this.categoriesPromise.then(() => {
            this.resolveCategoriesNames(ids)
          })
        } else {
          this.resolveCategoriesNames(ids)
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
      resolveCategoriesNames (ids) {
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
        EventBus.$emit('setBreadcrumbNames', {categoryName: categoryName, subcategoryName: subcategoryName})
      }
    }
  }

</script>

<style scoped>
  .gd-category{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 300px; 
    display: inline-block;
  }
</style>
