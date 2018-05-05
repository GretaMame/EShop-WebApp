<template>
<div>
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

        <el-table>
      <el-table-column
        label="Order no.">

      </el-table-column>
      <el-table-column
        label="Date">
      </el-table-column>
      <el-table-column
        label="Status">

      </el-table-column>
    </el-table>

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
        <el-row class="gd_line_bottom_margin">
          <el-col :span="18">
          <span class="gd_label">Total: </span>
          {{order.totalPrice.toFixed(2)}} €
          </el-col>
          <el-col :span="6">
            <el-button size="small">
              Add all items to cart
            </el-button>
          </el-col>
        </el-row>
        <el-collapse>
          <el-collapse-item title="Items">
            <div v-for="item in order.items" :key="item.SKU" :item="item">

            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
</template>
