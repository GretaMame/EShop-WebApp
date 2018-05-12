<template>
  <el-card :body-style="{ padding: '0px' }">
    <img v-if="item.Pictures && item.Pictures[0]" :src="item.Pictures[0].URL" class="gd-item-image">
    <img v-else src="@/../static/image-not-found.jpg" class="gd-item-image">
    <el-row class="gd-item-price">
      <el-col :lg="20" :md="20" :sm="20" :xs="20" :pull="4">
        <span>{{item.Price}} €</span>
      </el-col>
    </el-row>
    <el-row class="gd-item-card-main">
      <el-popover class="gd-module"
        width="300"
        :open-delay="300"
        placement="bottom"
        trigger="hover">
        <div slot="reference" class="gd-item-tooltip">{{item.Name}}</div>
        <span>{{item.Name}}</span>
      </el-popover>
      <!-- 'Add to cart' button. Uncommend  -->
      <!-- <el-row class="gd-add-to-card">
        <el-col :lg="20" :md="20" :sm="20" :xs="20" :push="2">
          <el-button class="gd-add-to-card-button" type="primary" icon="el-icon-plus" size="medium">
            Add to cart
          </el-button>
        </el-col>
      </el-row> -->
      <div style="border-bottom: 1px solid;"/>
    </el-row>
    <el-row v-if="item.Attributes" class="gd-item-attributes" >
      <div v-for="attribute in item.Attributes" :key="attribute.Name">
        <div>{{attribute.Name}}:   {{attribute.Value}}</div>
      </div>
    </el-row>
    <el-row v-else class="gd-item-attributes" >
      <div></div>
    </el-row>
  </el-card>
</template>

<script>
  export default {
    props: [ 'item' ]
  }
</script>

<style scoped>
  .gd-item-card-main{
    padding: 10px;
  }
  .gd-item-tooltip{
    width: 100%; 
    word-wrap: break-word; 
    text-align: justify;
  }
  .gd-add-to-card{
    margin: 5px;
  }
  .gd-item-image {
    align-content: center;
    max-height: 150px;
  }
  .gd-item-attributes{
    text-align: left;
    font-size: 10pt;
    margin-left: 10px;
    color: grey;
    line-height: 1.2em;
    height: 2.4em;
  }
  .gd-add-to-card-button{
    width: 100%;
    padding: 0;
    height: 20px;
  }
  .gd-module {
    overflow: hidden;
    line-height: 1.2em;
    height: 3.6em;
    text-align: left;
    font-size: 10pt;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .gd-item-price{
    color:midnightblue;
    font-weight: bold;
    font-size: 12pt;
  }
</style>
