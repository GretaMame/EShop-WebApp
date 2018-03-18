<template>
  <div>
    <el-menu :default-active="activeIndex" :mode="displayMode" :router="true"
      background-color="#545c64" text-color="#fff" active-text-color="#0080FF"
      v-if="!smallScreen">
      <el-menu-item index="1" route="/home">
        <template slot="title">Goal Diggers</template>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">Goods</template>
        <el-menu-item index="2-1" v-for="category in categories">
          {{category.name}}
        </el-menu-item>
      </el-submenu>
      <el-menu-item class="gd_right" index="8" v-if="!isAuthorised" route="/register">Sign up</el-menu-item>
      <el-menu-item class="gd_right" index="7" v-if="!isAuthorised" route="/login">Log in</el-menu-item>
      <el-submenu class="gd_right" index="6" v-if="isAuthorised">
        <template slot="title">
          <i class="el-icon-menu"></i>
        </template>
        <el-menu-item index="6-1" route="/user/profile">My profile</el-menu-item>
        <el-menu-item index="6-2" route="#">Sign out</el-menu-item>
      </el-submenu>
      <el-menu-item class="gd_right" index="5" route="#">
        <i class="el-icon-goods"></i>
        {{(goodsInCart)}}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      goodsInCart: 0,
      isAuthorised: false,
      displayMode: 'horizontal',
      categories: [
        {
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
  }
}
</script>

<style scoped>
  .gd_right {
    float: right;
  }
</style>

