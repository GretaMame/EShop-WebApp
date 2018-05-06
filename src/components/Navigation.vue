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
        <el-submenu v-for="Category in Categories" :key="Category.Name" :index="Category.Name">
          <template slot="title">
            <span class="gd-category gd-pr-30px">
              {{Category.Name}}
            </span>
          </template>
          <el-menu-item v-if="Category.Subcategories" 
          v-for="Subcategory in Category.Subcategories" 
          :key="Subcategory.Name" 
          :index="Subcategory.Name">
            <template slot="title">
              <span class="gd-category">
                {{Subcategory.Name}}
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
  export default {
    data () {
      return {
        activeIndex: '1',
        itemsInCart: 0,
        displayMode: 'horizontal',
        Categories: [{
            Name: 'Category 0 z-a22324',
            Subcategories: [{ Name: 'SubCategory 0-0' }, { Name: 'SubCategory 0-1' }]
          },
          {
            Name: 'Clothes',
            Subcategories: [{ Name: 'SubCategory 1-0' }, { Name: 'SubCategory 1-1' }, { Name: 'SubCategory 1-2' }, { Name: 'SubCategory 1-3' }]
          },
          {
            Name: 'Mobile smarthones',
            Subcategories: [{ Name: 'SubCategory 2-0' }]
          }
        ]
      }
    },
    methods: {
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
