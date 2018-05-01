<template>
  <div class="gd-nav">
    <el-menu :default-active="$route.path" 
        :router="true" 
				mode="horizontal"
        background-color="#333333" 
        text-color="#fff" 
        active-text-color="#DF3A01">
			<el-submenu index="menu">
				<template slot="title">
					<icon name="bars"/> 
				</template>
				<el-menu :default-active="$route.path" 
					:router="true" 
					mode="vertical"
					background-color="#333333" 
					text-color="#fff" 
					active-text-color="#DF3A01"
					class=" gd-text-align-left">
					<el-menu-item index="/login" v-if="!this.$store.getters.isAuthenticated" route="/login">
						<el-row>
							<el-col :xs="4">
								<icon name="user"/>
							</el-col>
							<el-col :push="1" :xs="20">
								Log in
							</el-col>
						</el-row>
					</el-menu-item>
					<el-menu-item index="/register" v-if="!this.$store.getters.isAuthenticated" route="/register">
						<el-row>
							<el-col :xs="4">
								<icon name="user-plus"/>
							</el-col>
							<el-col :push="1" :xs="20">
								Sign up
							</el-col>
						</el-row>
					</el-menu-item>
					<el-submenu index="/user" v-if="this.$store.getters.isAuthenticated">
						<template slot="title">
							<el-row>
								<el-col :xs="4">
									<icon name="user-o"/>
								</el-col>
								<el-col :push="1" :xs="20">
									My account
								</el-col>
							</el-row>
						</template>
						<el-menu-item index="/user/profile" route="/user/profile">
							Account
						</el-menu-item>
						<el-menu-item index="/user/orderHistory" route="/user/orderHistory">
							Order history
						</el-menu-item>
					</el-submenu>
					<el-menu-item index="/home" route="/home">
						<el-row>
							<el-col :xs="4">
								<icon name="home"/>
							</el-col>
							<el-col :push="1" :xs="20">
								Home
							</el-col>
						</el-row>
					</el-menu-item>
					<el-submenu index="Goods">
						<template slot="title">
							<el-row>
								<el-col :xs="4">
									<icon name="archive"/> 
								</el-col>
								<el-col :push="1" :xs="20">
									Goods
								</el-col>
							</el-row>
						</template>
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
					<el-menu-item index="/user/signout" v-on:click="signOut" v-if="this.$store.getters.isAuthenticated">
						Sign out
					</el-menu-item>
				</el-menu>
    	</el-submenu>
			<el-menu-item index="search">
				<template slot="title">
          <span class="gd-logo">
            Goal Diggers
          </span>
        </template>
			</el-menu-item>
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
            Name: 'Category 0',
            Subcategories: [{ Name: 'SubCategory 0-0' }, { Name: 'SubCategory 0-1' }]
          },
          {
            Name: 'Category 1 SubCategory 1-0 ewt  SubCategory 1-0 ewt  ',
            Subcategories: [{ Name: 'SubCategory 1-0 ewt  y ryreyyeryer yeryery' }, { Name: 'SubCategory 1-1' }, { Name: 'SubCategory 1-2' }, { Name: 'SubCategory 1-3' }]
          },
          {
            Name: 'Category 2',
            Subcategories: [{ Name: 'SubCategory 2-0' }]
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
  .gd-category{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 200px; 
    display: inline-block;
  }
</style>
