<template>
  <el-card class="card" :body-style="{ padding: '0px' }">
    <img :src="item.img" class="image">
    <div class="itemCardPrice">
      <span>{{item.price}} €</span>
    </div>
    <div style="padding: 3%;">
      <el-tooltip class="module line-clamp" :content="item.name">
        <span>{{item.name}}</span>
      </el-tooltip>
      <!-- Uzkomentuotas mygtukas, jei reiks 'Add to cart' is home page mygtuko, tai atkomentuosime. -->
      <!-- <div class="bottom">
        <el-button class="itemCardButton" type="primary" icon="el-icon-plus" size="medium">
          Add to cart
        </el-button>
      </div> -->
      <div style="border-bottom: 1px solid;"/>
    </div>
    <!-- Cia bus ideti pirmi du pasitaike imet'o pozymiai. 
    Kadangi pozymiu gali ir nebuti / buti vienas / buti du, tai darant ideti v-if salyga.
    Card'o dydis neturetu kisti => line-height: 1.2em; height: 2.4em;-->
    <div class="itemCardAttributes">
      <div>
        <span>Spalva: </span>
        <span>ruda</span>
      </div>
      <div>
        <span>Dydis: </span>
        <span>gigantiškas</span>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  props: [ 'item' ]
}
</script>

<style>
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .image {
    width: 100%;
    display: block;
  }
  .itemCardAttributes{
    text-align: left;
    font-size: 10pt;
    margin-left: 5%;
    margin-bottom: 3%;
    color: grey;
    line-height: 1.2em;
    height: 2.4em;
  }
  .itemCardButton{
    width: 50%;
    padding: 2%;
  }
  .module {
    overflow: hidden;
    line-height: 1.2em;
    height: 2.4em;
    text-align: center;
    font-size: 12pt;
    margin: 2%;
  }
  .line-clamp {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
  }
  .itemCardPrice{
    color:midnightblue;
    font-weight: bold;
    font-size: 12pt;
    text-align: left;
    padding-left: 10%;
    padding-top: 2%;
  }
</style>
