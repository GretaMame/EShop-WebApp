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
        <el-menu-item index="/user/orderhistory" route="/user/orderhistory">
          Order history
        </el-menu-item>
        <el-menu-item index="/user/signout" @click="$emit('signOut')"> 
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
        displayMode: 'horizontal'
      }
    },
    props: {
      categories: { type: Array },
      itemsInCart: { type: Number }
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
