<template>
<div class="eshop-container-wrapper">
  <div class="container">
    <b-container >
    <b-row >
      <b-col class="col-wrapper" v-for="item in goods" :key="item.name">
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" :src="item.img" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title" v-text="item.name"></h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Add to cart</a>
            </div>
        </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</div>

</template>
<script>
export default {
    data () {
        return {
            goods: []
        }
    },
    mounted () {
      this.axios.get('api/items').then(response => {
        this.goods = response.data
      }).catch(error => {
        console.log(error)
      })
    }
}
</script>
<style>
    .eshop-container-wrapper {
        margin-top: 15px;
    }

    .col-wrapper {
        margin-top: 25px;
    }

</style>
