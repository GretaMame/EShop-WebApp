<template>
  <div>
  <b-navbar toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand to="/home">Goals eshop</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
    <b-nav-item-dropdown text="Category 0" left>
        <b-dropdown-item to="">Subcategory 0</b-dropdown-item>
        <b-dropdown-item to="">Subcategory 1</b-dropdown-item>
      </b-nav-item-dropdown>
    <b-nav-item-dropdown text="Category 1">
        <b-dropdown-item to="">Subcategory 0</b-dropdown-item>
        <b-dropdown-item to="">Subcategory 1</b-dropdown-item>
      </b-nav-item-dropdown>
    <b-nav-item-dropdown text="Category 2">
        <b-dropdown-item to="">Subcategory 0</b-dropdown-item>
        <b-dropdown-item to="">Subcategory 1</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

       <b-navbar-brand to="/cart">
          <icon name="shopping-cart"></icon>
          {{(goodsInCart)}}
        </b-navbar-brand>

      <b-nav-item-dropdown right v-if="isAuthorised">
        <template slot="button-content">
            <icon name="user"></icon>
        </template>
        <b-dropdown-item to="/user/profile">Profile</b-dropdown-item>
        <b-dropdown-item href="#">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
    <b-navbar-nav v-if="!isAuthorised">
      <b-nav-item class="login" to="/login">Login</b-nav-item>
      <b-nav-item class="register" to="/register">Register</b-nav-item>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>

</div>
</template>
<script>
export default {
  data () {
    return {
      goodsInCart: 0,
      isAuthorised: false
    }
  }
}
</script>
