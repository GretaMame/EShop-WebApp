<template>
  <div class="form-loading" :style="'height:' + screenHeight + 'px'">
    <vue-loading class="centered" type="bars"/>
  </div>
</template>
<script>
import vueLoading from 'vue-loading-template'
export default {
  components: {
    vueLoading
  },
  props: ['screenHeight']
}
</script>
<style>
  .form-loading{
    border-radius:25px;
    text-align: center;
    background-color: rgba(0,0,0,0.05);
  }
  .centered{
    position: relative;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    margin: auto;
  }
</style>

