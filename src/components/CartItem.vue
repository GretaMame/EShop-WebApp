<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span class="item-padding-align">SKU: {{item.SKU}}</span>
      <time class="create-time gd-float-right">{{item.CreateDate}}</time>
    </div>
    <el-row>
        <el-col :xs="24" :sm="24" :md="7" :lg="6">
          <el-row>
            <el-col :xs="21" :sm="21">
              <img :src="item.Image" class="image">
            </el-col>
            <el-col :xs="3" :sm="3">
              <el-button class="hidden-md-and-up" type="danger" size="small" icon="el-icon-delete"></el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :xs="24" :sm="24" :md="16" :lg="18">
          <el-row>
            <el-col :xs="24" :sm="24" :md="18" :lg="17" class="item-padding-align">
              <el-row class="item-padding-bottom item-name">
                {{item.Name}}
                <el-col class="item-price hidden-md-and-up" :md="24" :lg="24">
                      <span>{{item.Price}} €</span>
                </el-col>
              </el-row>
              <el-row class="item-attributes">
                <el-col v-if="item.Attributes" :xs="12" :sm="12" :md="12" :lg="12">
                  <div v-for="attribute in item.Attributes" :key="attribute.Name" :attribute="attribute">
                    <el-col class="item-attribute-name" :xs="6" :sm="6" :md="6" :lg="5">
                      <span>{{attribute.Name}}: </span>
                    </el-col>
                    <el-col class="item-attribute-value" :xs="16" :sm="16" :md="18" :lg="19">
                      <span>{{attribute.Value}}</span>
                    </el-col>
                  </div>
                </el-col>
                <el-col v-else :xs="12" :sm="12" :md="12" :lg="12">
                  &nbsp;
                </el-col>
                <el-col class="item-attributes quantity" :xs="12" :sm="12" :md="12" :lg="12">
                  <el-row>
                    <el-col :xs="24" :sm="6" :md="24" :lg="4">
                      <span>Quantity: </span>
                    </el-col>
                    <el-col :xs="24" :sm="18" :md="24" :lg="20">
                      <el-input-number size="mini" :min="1" v-model="item.Count"/>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
            <el-col :xs="24" :sm="24" :md="6" :lg="7">
              <el-row align="bottom">
                <el-col class="item-price hidden-sm-and-down" :md="24" :lg="24">
                  <span>{{item.Price}} €</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="item-delete hidden-sm-and-down" :xs="24" :sm="24" :md="24" :lg="24">
              <el-button type="danger" icon="el-icon-delete"></el-button>
            </el-col>
          </el-row>
        </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: [ 'item' ]
}
</script>

<style>
  .el-card__header{
    padding: 0px !important;
    background-color:#F5F5F5;
  }
</style>
<style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .create-time {
    font-size: 13px;
    color: #999;
    padding-right: 10px;
  }
  .item-padding-align{
    padding-left: 20px;
    text-align: left;
    float: left;
  }
  .item-padding-bottom{
    padding-bottom: 6%;
  }
  .image{
    max-width: 200px;
    max-height: 155px;
  }
  .item-attributes{
    color: grey;
    font-size: 10pt;
    padding-bottom: 2%;
  }
  .item-attribute-name{
    padding-right: 5px;
    text-align: right;
  }
  .item-attribute-value{
    padding-left: 4px;
  }
  .quantity{
    text-align: right;
    padding-right: 3%;
  }
  .input-number-size{
    max-width: 60px;
    text-align: center;
  }
  .el-input__inner{
    padding: 3px;
    text-align: center;
  }
  .item-price{
    font-size: 16pt;
    color: midnightblue;
    font-weight: bold;
    text-align: right;
  }
  .item-delete{
    justify-content: flex-end;
    display: flex;
  }
  @media (max-width: 768px) {
    .item-padding-bottom{
      padding-bottom: 1px;
    }
    .image{
      max-width: 150px;
      max-height: 200px;
      padding-bottom: 5px;
      margin-left: 20%;
    }
    .item-name{
      text-align: center;
    }
  }
</style>
