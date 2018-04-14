<template>
  <div class="gd-nav">
    <el-menu :default-active="$route.path" :mode="displayMode" :router="true" background-color="#333333" text-color="#fff" active-text-color="#DF3A01">
      <el-menu-item index="/home" route="/home">
        <template slot="title">Goal Diggers</template>
      </el-menu-item>
      <el-submenu index="/categories">
        <template slot="title">Goods</template>
        <el-menu-item index="2-1" v-for="category in categories" :key="category.name">
          {{category.name}}
        </el-menu-item>
      </el-submenu>
      <el-menu-item class="gd_right" index="/register" v-if="!this.$store.getters.isAuthenticated" route="/register">
        Sign up
      </el-menu-item>
      <el-menu-item class="gd_right" index="/login" v-if="!this.$store.getters.isAuthenticated" route="/login">
        Log in
      </el-menu-item>
      <el-submenu class="gd_right" index="/user" v-if="this.$store.getters.isAuthenticated">
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
      <el-menu-item class="gd_right" index="/cart" route="/cart">
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
        categories: [{
            name: 'Category 0',
            subcategories: [

            ]
          },
          {
            name: 'Category 1',
            subcategories: [

            ]
          },
          {
            name: 'Category 2',
            subcategories: [

            ]
          }
        ]
      }
    },
    methods: {
      signOut () {
        this.axios.post('account/logout').then(response => {
          this.$store.dispatch('logOut')
          this.$notify.success({
            title: 'Successful logout'
          })
          this.$router.push('/home')
        }).catch(err => {
          console.log('error: ', err)
          if (err.autoLogout) {
            this.$notify.info('You were logged out')
            return
          }
          this.$notify.error({
            title: 'Error',
            message: 'Unable to log out.'
          })
        })
      }
    }
  }

</script>

<style scoped>
  .gd_right {
    float: right;
  }
</style>
