<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span class="item-font-size-10pt item-padding-align">SKU: {{item.sku}}</span>
    </div>
    <el-row>
        <el-col :xs="24" :sm="24" :md="7" :lg="6">
          <el-row>
            <el-col :xs="21" :sm="21">
              <img v-if="item.mainPicture" :src="item.mainPicture" class="image">
              <img v-else src="http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg" class="image">
            </el-col>
            <el-col :xs="3" :sm="3">
              <!-- <el-button @click="$emit('delete', item.id)" class="hidden-md-and-up" type="danger" size="small" icon="el-icon-delete"></el-button> -->
              <el-button  @click="removeDialogVisible = true" class="hidden-md-and-up" type="danger" size="small" icon="el-icon-delete"></el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :xs="24" :sm="24" :md="16" :lg="18">
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" class="item-padding-align">
              <el-row class="item-name">
                <el-col :xs="24" :sm="24" :md="19" :lg="18">
                  {{item.name}}
                </el-col>
                <el-col class="item-price hidden-sm-and-down" :push="1" :md="4" :lg="4">
                  <span>{{item.price}} €</span>
                </el-col>
              </el-row>
              <el-row class="item-font-size-10pt item-padding-bottom">
                <el-col v-if="item.attributes" :push="1" :xs="15" :sm="15" :md="11" :lg="19">
                  <div v-for="attribute in item.attributes" :key="attribute.name" :attribute="attribute">
                    <el-row>
                      <span>{{attribute.name}}: </span>
                      <span class="item-grey-color">{{attribute.value}}</span>
                    </el-row>
                  </div>
                </el-col>
                <el-col v-else :push="1" :xs="15" :sm="15" :md="11" :lg="19">
                  &nbsp;
                </el-col>
                <el-col class="item-price hidden-md-and-up" :push="1" :xs="6" :sm="6">
                  <span>{{item.price}} €</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="24" :md="18" :lg="18">
              <el-row  class="item-font-size-10pt item-grey-color quantity">
                <el-col :xs="16" :sm="16" :md="16" :lg="16">
                  <span>Quantity: </span>
                </el-col>
                <el-col :push="1" :xs="5" :sm="5" :md="7" :lg="7">
                  <el-input-number @change="$emit('updated')" size="mini" :min="1" :step="1" v-model="item.count"/>
                </el-col>
              </el-row>
            </el-col>
            <el-col class="item-delete hidden-sm-and-down" :md="6" :lg="6">
              <el-button @click="removeDialogVisible = true" type="danger" icon="el-icon-delete"></el-button>
              <!-- <el-button @click="$emit('delete', item.id)" type="danger" icon="el-icon-delete"></el-button> -->
            </el-col>
          </el-row>
        </el-col>
    </el-row>
    <el-dialog
      title="Remove cart item"
      :visible.sync="removeDialogVisible"
      width="400px"
      center>
      <span >Are you sure you want to remove this item?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="removeDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="removeDialogVisible = false, $emit('delete', item.id)">Remove</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>


<script>
export default {
  props: [ 'item' ],
  data () {
    return {
      removeDialogVisible: false
    }
  }
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
  .item-padding-align{
    padding-left: 20px;
    text-align: left;
    float: left;
  }
  .item-padding-bottom{
    padding-bottom: 15px;
  }
  .image{
    max-width: 200px;
    max-height: 155px;
  }
  .item-font-size-10pt{
    font-size: 10pt;
  }
  .item-grey-color{
    color: grey;
  }
  .quantity{
    text-align: right;
    padding-right: 3%;
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
  .item-name{
    font-size: 13pt;
    padding-bottom: 15px;
    text-align: justify;
  }
  @media (max-width: 768px) {
    .image{
      max-width: 150px;
      max-height: 200px;
      padding-bottom: 5px;
      margin-left: 20%;
    }
  }
</style>
