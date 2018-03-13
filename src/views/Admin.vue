<template>
  <div>
    <br>
    <b-tabs class="navigation" vertical>
      <b-tab title="Orders">Thddddddddddddddddddddddddddddddddddddddddddddddddddddddddddis is the orders lul</b-tab>
      <b-tab title="Items">
      </b-tab>
      <b-tab active title="Users">
        <admin-users></admin-users>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
import AdminUsers from '@/components/AdminUsers.vue'
export default{
  components: {
    AdminUsers
  }
}
</script>
<style>
  .navigation{
    background-color: white;
  }
</style>
