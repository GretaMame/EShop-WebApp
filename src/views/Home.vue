<template>
  <el-row v-if="items">
    <el-col class="homePageItemCard" v-for="item in items" :key="item.SKU" :xs="12" :sm="8" :md="6" :lg="4">
      <div class="gd-clickable" @click="onItemClicked(item)">
        <ItemCard :item="item"></ItemCard>
      </div>
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
    },
    methods: {
      onItemClicked (item) {
        console.log('clicky clicky')
        this.$router.push(`/itemdetails/${item.id}`)
      }
    }
  }

</script>
<style>
  .homePageItemCard {
    padding: 10px;
  }

  .gd-clickable:hover {
    cursor: pointer;
  }

</style>
