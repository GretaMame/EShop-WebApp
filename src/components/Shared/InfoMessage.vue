<template>
  <el-card>
    <div class="gd_message">
    <h2>{{localMessage}}</h2>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    message: { Type: String }
  },
  data () {
    return {
      localMessage: 'nothing to display'
    }
  },
  mounted () {
    this.localMessage = this.message
  }
}
</script>


<style scoped>
  .gd_message {
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .gd_message h2{
    margin: 0;
  }
</style>

