<template>
  <div class="gd-nav">
    <el-menu :default-active="$route.path"
        :router="false"
				mode="horizontal"
        background-color="#333333"
        text-color="#fff"
        active-text-color="#DF3A01"
				menu-trigger="click"
        @select="onItemSelected">
			<el-menu-item @click="menuOpend=true" index="0">
				<template slot="title">
					<icon name="bars"/>
				</template>
    	</el-menu-item>
			<el-menu-item index="/home" :route="{name: 'home'}">
				<template slot="title">
          <span class="gd-logo">
            Goal Diggers
          </span>
        </template>
			</el-menu-item>
			<el-menu-item class="gd-float-right" index="/cart" :route="{name: 'cart'}">
        <el-row>
          <el-col :span="10">
            <i class="el-icon-goods"/>
          </el-col>
          <el-col :span="14" v-if="itemsInCart != 0">
            {{(itemsInCart)}}
          </el-col>
        </el-row>
			</el-menu-item>
    </el-menu>
		<div v-bind:class="{ showMenu: menuOpend }" class="sideMenu">
			<div class="gd-header">
        <span @click="menuOpend = false" class="side-menu-header">
				<icon class="side-menu-icon" name="close" />
        </span>
			</div>
			<el-menu :default-active="$route.path"
				:router="true"
				mode="vertical"
				background-color="#FFFFFF" 
				text-color="#000000" 
				:unique-opened="true"
				active-text-color="#DF3A01"
				class=" gd-text-align-left"
				menu-trigger="click">
				<el-menu-item @click="menuOpend = false" index="/login" v-if="!this.$store.getters.isAuthenticated" route="/login">
					<el-row>
						<el-col :xs="3">
							<icon name="user"/>
						</el-col>
						<el-col :xs="21">
							Log in
						</el-col>
					</el-row>
				</el-menu-item>
				<el-menu-item @click="menuOpend = false" index="/register" v-if="!this.$store.getters.isAuthenticated" route="/register">
					<el-row>
						<el-col :xs="3">
							<icon name="user-plus"/>
						</el-col>
						<el-col :xs="21">
							Sign up
						</el-col>
					</el-row>
				</el-menu-item>
				<el-submenu @click="menuOpend = false" index="/user" v-if="this.$store.getters.isAuthenticated">
					<template slot="title">
						<el-row>
							<el-col :xs="3">
								<icon name="user-o"/>
							</el-col>
							<el-col :xs="21">
								My account
							</el-col>
						</el-row>
					</template>
					<el-menu-item @click="menuOpend = false" index="/user/profile" route="/user/profile">
						Account
					</el-menu-item>
					<el-menu-item @click="menuOpend = false" index="/user/orderHistory" route="/user/orderHistory">
						Order history
					</el-menu-item>
					<el-menu-item index="/user/signout" @click="sigout" v-if="this.$store.getters.isAuthenticated">
						Sign out
					</el-menu-item>
				</el-submenu>
				<el-menu-item @click="menuOpend = false" index="/home1" route="/home">
					<el-row>
						<el-col :xs="3">
							<icon name="home"/>
						</el-col>
						<el-col :xs="21">
							Home
						</el-col>
					</el-row>
				</el-menu-item>
				<el-submenu index="Goods">
					<template slot="title">
						<el-row>
							<el-col :xs="3">
								<icon name="archive"/>
							</el-col>
							<el-col :xs="21">
								Goods
							</el-col>
						</el-row>
					</template>
					<el-submenu v-for="category in categories" :key="category.name" :index="`/home/${category.id}`">
						<template slot="title">
							<span class="gd-category gd-pr-30px">
								{{category.name}}
							</span>
						</template>
						<el-menu-item @click="menuOpend = false" v-if="category.subCategories" 
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
			</el-menu>
		</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        activeIndex: '1',
        displayMode: 'horizontal',
        menuOpend: false
      }
    },
    props: {
      categories: { type: Array },
      itemsInCart: { type: Number }
    },
    methods: {
      onItemSelected (index, indexPath) {
        if (index !== '0') {
          this.$router.push({path: index})
        } else {
          this.menuOpend = true
        }
      },
      sigout () {
        this.menuOpend = false
        this.$emit('signOut')
      }
    }
  }
</script>

<style scoped>
  .gd-category{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 200px; 
    display: inline-block;
  }
	.sideMenu {
		position: absolute;
		top:0;
		left:-100vw;
		margin:0;
		height: 100vh;
		width: 100vw;
		background-color: #ffffff;
    transition-duration: 0.5s;
		z-index: 10000;
		overflow: scroll;
	}
	.gd-header {
		height: 60px;
		width: 100vw;
		background: rgb(51, 51, 51);
		border-bottom: 1px solid grey;
	}
  .showMenu{
    left: 0;
  }
  .side-menu-header{
    width: 32px; 
    height: 32px; 
    float: right; 
    padding-top: 14px; 
    padding-right: 14px;
  }
  .side-menu-icon{
    width: 100%; 
    height: 100%;
    color:lightgray;
  }
</style>
