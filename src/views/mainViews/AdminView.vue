<template>
  <div>
    <AdminNavigation></AdminNavigation>
    <router-view/>
  </div>
</template>
<script>
import AdminNavigation from '@/components/Navigation/Admin'

export default{
  components: {
    AdminNavigation
  }
}
</script>
<style>
</style>
