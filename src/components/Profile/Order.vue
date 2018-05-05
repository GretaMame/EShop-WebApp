<template>
  <el-card
      class="gd_order"
      v-for="order in orders"
      :key="order.orderNumber"
      v-loading="loading"
      shadow="hover">
        <div slot="header" class="gd_order_header" align="left">
          <el-row>
            <el-col :span="8">
              <el-row>
                <span class="gd_label">Order no.:</span>
              </el-row>
              <el-row>
                {{order.orderNumber}}
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row>
                <span class="gd_label">Order date:</span>
              </el-row>
              <el-row>
                {{order.createDate}}
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row>
              <span class="gd_label">Order status:</span>
              </el-row>
              <el-row>
                {{order.status}}
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div v-for="item in order.items" :key="item.SKU" :item="item">
          <el-button @click="viewItem()">View item</el-button>
        </div>
    </el-card>
</template>
