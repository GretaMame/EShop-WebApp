<template>
  <el-card>
    <el-steps :active="activeIndex" finish-status="success" align-center>
      <el-step title="View cart"></el-step>
      <el-step title="Shipping"></el-step>
      <el-step title="Payment"></el-step>
      <el-step title="Review and place order"></el-step>
    </el-steps>
    <el-button @click="previousStep">Previous</el-button>
    <el-button @click="nextStep" type="primary">Next</el-button>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      numberOfSteps: 4,
      activeIndex: 0
    }
  },
  methods: {
    nextStep () {
      if (++this.activeIndex > this.numberOfSteps) this.activeIndex = this.numberOfSteps
    },
    previousStep () {
      if (--this.activeIndex < 0) this.activeIndex = 0
    }
  }
}
</script>

<style>
  .el-steps {
    margin: 20px;
    margin-top: 40px;
  }
  .el-card {
    margin: 20px
  }
</style>
