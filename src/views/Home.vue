<template>
  <el-row v-if="items">
    <el-col class="homePageItemCard" v-for="item in items" :key="item.SKU" :xs="12" :sm="8" :md="6" :lg="4">
      <ItemCard :item="item"></ItemCard>
    </el-col>
  </el-row>
</template>

<script>
import ItemCard from '@/components/ItemCard'
export default {
  data () {
      return {
        items: []
      }
    },
    components: {
      ItemCard
    },
    mounted () {
      this.axios.get('items').then(response => {
        this.items = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  }

</script>
<style>
  .homePageItemCard {
    padding: 10px;
  }

</style>
