<template>
  <div class="main-div">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="2">
            <router-link :to="{name:'adminDiscount'}">
              <el-button><i class="el-icon-arrow-left"></i></el-button>
            </router-link>
          </el-col>
          <el-col :span="18"><h1>Add new discount</h1></el-col>
          <el-col :span="2">
            <el-button @click="resetForm('newDiscountForm')" round>Reset</el-button>
          </el-col>
          <el-col :span="2">
            <el-button @click="submitForm('newDiscountForm')" type="success" round>Save</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-form ref="newDiscountForm" :model="newDiscountForm" :rules="rules">
          <el-card>
              <el-row class="main-row">
                <el-col>
                  <el-form-item label="Discount description" prop="description">
                    <el-input placeholder="Description" v-model="newDiscountForm.description"></el-input>
                  </el-form-item>
                  <el-row>
                    <el-col :span="5">
                      <el-form-item label="Choose" prop="choose">
                        <el-select class="gd-width-190" v-model="newDiscountForm.choose" placeholder="Select">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :push="1" :span="6">
                      <el-form-item label="Category" prop="categoryid">
                        <el-select class="gd-width-220" v-model="newDiscountForm.categoryid" placeholder="Categories">
                          <el-option
                            v-for="category in categories"
                            :key="category.value"
                            :label="category.label"
                            :value="category.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col v-if="newDiscountForm.choose == '2' || newDiscountForm.choose == '3'" :push="1" :span="6">
                      <el-form-item label="Subcategory" prop="subcategory">
                        <el-select class="gd-width-220" v-model="subcategory" placeholder="Subcategories">
                          <el-option
                            v-for="subcategory in subcategories"
                            :key="subcategory.value"
                            :label="subcategory.label"
                            :value="subcategory.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col v-if="newDiscountForm.choose == '3'" :push="1" :span="6">
                      <el-form-item label="Item" prop="item">
                        <el-select class="gd-width-220" v-model="item" placeholder="Items">
                          <el-option
                            v-for="item in items"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="Discount" prop="discount">
                        <el-input-number :min="0" v-model="newDiscountForm.discount"></el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item>
                        <el-radio-group v-model="newDiscountForm.resource">
                          <el-radio label="Percentage"></el-radio>
                          <el-radio label="Euros"></el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="Valid until" prop="date">
                        <el-date-picker type="date" placeholder="Pick a date" v-model="newDiscountForm.date"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
          </el-card>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
<script>

export default {
  data () {
    return {
      options: [{
          value: '1',
          label: 'Category'
        }, {
          value: '2',
          label: 'SubCategory'
        }, {
          value: '3',
          label: 'Item'
      }],
      value: '1',
      categories: [{
        value: 'Category',
        label: 'Jewerly'
      }],
      category: '',
      subcategories: [{
        value: 'Subcategory',
        label: 'Earings'
      }],
      subcategory: '',
      items: [{
        value: 'Item',
        label: 'Ponio batas'
      }],
      item: '',
      disount: 0,
      newDiscountForm: {
        description: '',
        resource: 'Percentage',
        choose: '1',
        categoryid: null,
        discount: 0,
        date: null
      },
      rules: {
        description: [{
            required: true,
            type: 'string',
            message: 'Please enter a discount description',
            trigger: 'blur'
        },
        {
          max: 150,
          trigger: 'blur',
          message: 'Sescription must be up to 150 characters in length'
        }],
        choose: [{
            required: true,
            type: 'string',
            message: 'Please choose the option',
            trigger: 'blur'
        }],
        categoryid: [{
            required: true,
            type: 'number',
            message: 'Please select a category',
            trigger: 'blur'
        }],
        discount: [{
            required: true,
            type: 'number',
            message: 'Please enter the discount value',
            trigger: 'blur'
        }],
        date: [{
            required: true,
            type: 'date',
            message: 'Please enter the date when discount will expire',
            trigger: 'blur'
        }]
      },
      money: {
        decimal: '.',
        thousands: '',
        prefix: '€ ',
        suffix: '',
        precision: 2
      }
    }
  },
  mounted () {
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addDiscount()
          }
      })
    },
    addDiscount () {
      this.posting = true
      let formCopy = JSON.parse(JSON.stringify(this.newDiscountForm))
      formCopy.price = parseFloat(formCopy.price.split(' ')[1])
      this.axios.post('admin/discount/create', formCopy).then(response => {
        this.resetForm('newDiscountForm')
        this.$notify.success({
          title: 'Success',
          message: 'Succesfully added Discount'
        })
      }).catch(err => {
        this.$notify.error({
          title: 'Error',
          message: 'There was a problem while getting the category: ' + err
        })
      })
    }
  }
}
</script>
<style scoped>
  .main-div{
    padding: 16px 8px 0 0
  }
  .main-row{
    height: 75vh
  }
  .small-input-fix{
    float: left;
    margin-left: 8px
  }
  .gd-width-220{
    width: 220px;
  }
  .gd-width-190{
    width: 190px;
  }
</style>

