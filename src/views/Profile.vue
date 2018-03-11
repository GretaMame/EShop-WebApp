<template>
<div class="eshop-container-wrapper">
<b-tabs>
  <b-tab title="Edit profile" active>
    <br><profile-editing></profile-editing>
  </b-tab>
  <b-tab title="Change password">
    <br>Change password
  </b-tab>
</b-tabs>
</div>
</template>
<script>
  import ProfileEditing from '../components/ProfileEditing.vue'
  export default {
    components: {
      'profile-editing': ProfileEditing
    }
  }
</script>
<style>
.eshop-container-wrapper {
  margin-top: 15px;
  margin-left: 32px;
  margin-right: 32px;
}
</style>
