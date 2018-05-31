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
        <div v-for="category in categories" :key="category.name" >
          <el-submenu v-if="category.subCategories.length > 0" :index="`/home/${category.id}`">
            <template slot="title">
              <span class="gd-category gd-pr-30px gd-width-100" v-on:click="routToCategory(category.id)">
                {{category.name}}
              </span>
            </template>
            <el-menu-item
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
          <el-menu-item v-else>
            <template slot="title">
              <span class="gd-category">
                {{category.name}}
              </span>
            </template>
          </el-menu-item>
        </div>
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
        <el-row>
          <el-col :span="10">
            <i class="el-icon-goods"/>
          </el-col>
          <el-col :span="14" v-if="itemsInCart !== 0">
            {{(itemsInCart)}}
          </el-col>
        </el-row>
      </el-menu-item>
      <el-menu-item class="gd-float-right" index="/admin" v-if="this.$store.getters.isAdminAuthenticated" route="/admin">
        Admin panel
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
    },
    methods: {
      routToCategory (id) {
        this.$router.push('/home/' + id)
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
  .gd-width-100{
    width: 100%;
  }
</style>
