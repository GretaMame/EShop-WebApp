<template>
  <div class="main-div">
    <el-container v-loading="posting">
      <el-header>
        <el-row>
          <el-col :span="2">
            <router-link :to="{name:'adminItems'}">
              <el-button>
                <i class="el-icon-arrow-left"></i>
              </el-button>
            </router-link>
          </el-col>
          <el-col :span="18">
            <h1>Add new item</h1>
          </el-col>
          <el-col :span="2">
            <el-button @click="resetForm('newItemForm')" round>Reset</el-button>
          </el-col>
          <el-col :span="2">
            <el-button @click="submitForm('newItemForm')" type="success" round>Save</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-form ref="newItemForm" :model="newItemForm" :rules="rules">
          <el-card>
            <el-row class="main-row">
              <el-col :span="11">
                <el-form-item label="Name" prop="name">
                  <el-input placeholder="Name" v-model="newItemForm.name"></el-input>
                </el-form-item>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="Category" prop="category">
                      <el-select class="small-input-fix" v-loading="categoriesLoading" placeholder="Category" v-model="selectedCategoryId" @change="fetchSubcategories">
                        <el-option v-for="category in categories" :key="category.id" :label="category.name" :value="category.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="Subcategory" prop="categoryid">
                      <el-select class="small-input-fix" v-loading="subcategoriesLoading" placeholder="Subcategory" v-model="newItemForm.categoryid">
                        <el-option v-for="subcategory in subcategories" :key="subcategory.id" :label="subcategory.name" :value="subcategory.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="SKU" prop="sku">
                  <el-input placeholder="SKU" v-model="newItemForm.sku"></el-input>
                </el-form-item>
                <el-form-item label="Description" prop="description">
                  <el-input type="textarea" v-model="newItemForm.description"></el-input>
                </el-form-item>
                <el-form-item label="Price" prop="price">
                  <el-input v-if="!reloadMoney" class="small-input-fix" :controls="false" placeholder="Price" v-model.lazy="newItemForm.price"
                    v-money="money"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="attributes-photos-container" :span="13">
                <el-tabs v-model="activeManagerName">
                  <el-tab-pane label="Attributes" name="first">
                    <attributes-manager ref="attributesManager" v-on:attributes-changed="(atts) => attributes = atts" class="attributes-manager"></attributes-manager>
                  </el-tab-pane>
                  <el-tab-pane label="Pictures" name="second">
                    <photos-manager ref="photosManager" v-on:pictures-changed="(pics) => pictures = pics" class="photos-manager"></photos-manager>
                  </el-tab-pane>
                </el-tabs>
              </el-col>
            </el-row>
          </el-card>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import {
    VMoney
  } from 'v-money'
  import AttributesManager from '@/components/admin/AttributesManager'
  import PhotosManager from '@/components/admin/PhotosManager'
  export default {
    components: {
      AttributesManager,
      PhotosManager
    },
    directives: {
      money: VMoney
    },
    data () {
      return {
        posting: false,
        newItemForm: {
          name: '',
          sku: '',
          description: '',
          price: 0.00,
          categoryid: null
        },
        pictures: [],
        attributes: [],
        selectedCategoryId: null,
        categories: [],
        subcategories: [],
        categoriesLoading: true,
        subcategoriesLoading: false,
        rules: {
          name: [{
              required: true,
              type: 'string',
              message: 'Please enter a name',
              trigger: 'blur'
            },
            {
              max: 150,
              trigger: 'blur',
              message: 'Name must be up to 150 characters in length'
            }
          ],
          sku: [{
              required: true,
              type: 'string',
              message: 'Please enter a SKU',
              trigger: 'blur'
            },
            {
              max: 10,
              trigger: 'blur',
              message: 'SKU must be up to 10 characters in length'
            }
          ],
          description: [{
              required: true,
              type: 'string',
              message: 'Please enter a description',
              trigger: 'blur'
            },
            {
              max: 5000,
              trigger: 'blur',
              message: 'Description must be up to 5000 characters in length'
            }
          ],
          price: [{
            required: true,
            pattern: '^(?!€ (0.00))',
            message: 'Please enter a price larger than 0,00',
            trigger: 'blur'
          }],
          categoryid: [{
            required: true,
            type: 'number',
            message: 'Please select a child category',
            trigger: 'blur'
          }]
        },
        money: {
          decimal: '.',
          thousands: '',
          prefix: '€ ',
          suffix: '',
          precision: 2
        },
        activeManagerName: 'first',
        reloadMoney: false
      }
    },
    created () {
      this.fetchCategories()
    },
    methods: {
      resetForm (formName) {
        this.$refs['attributesManager'].reset()
        this.$refs['photosManager'].reset()
        this.$refs[formName].resetFields()
        this.selectedCategoryId = null
        this.reloadMoney = true
        this.$nextTick(() => {
          this.newItemForm.price = 0.00
          this.reloadMoney = false
        })
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addItem()
          }
        })
      },
      fetchCategories () {
        this.categoriesLoading = true
        this.axios.get('admin/categories/parent').then(response => {
          this.categories = response.data
          this.categoriesLoading = false
        }).catch(err => {
          console.log(err)
          this.$notify.error({
            title: 'Error',
            message: 'There was a problem while getting parent categories.'
          })
          this.categoriesLoading = false
        })
      },
      fetchSubcategories (parentCategoryId) {
        this.newItemForm.categoryid = null
        this.subcategoriesLoading = true
        this.axios.get(`admin/categories/${parentCategoryId}`).then(response => {
          this.subcategories = response.data
          this.subcategoriesLoading = false
        }).catch(err => {
          console.log(err)
          this.$notify.error({
            title: 'Error',
            message: 'There was a problem while getting children categories.'
          })
          this.subcategoriesLoading = false
        })
      },
      addItem () {
        this.posting = true

        var uploadForm = new FormData()
        for (let key in this.newItemForm) {
          uploadForm.append(key, this.newItemForm[key])
        }
        uploadForm.set('price', parseFloat(this.newItemForm.price.split(' ')[1]))

        this.attributes
          .forEach((attribute, index) => {
            uploadForm.append(`attributes[${index}].attributeId`, attribute.id)
            uploadForm.append(`attributes[${index}].value`, attribute.value)
            uploadForm.append(`attributes[${index}].key`, attribute.key)
          })

        this.pictures.filter(x => !x.isFile).map(x => x.url)
          .forEach(picture => uploadForm.append('pictureUrls', picture))

        this.pictures.filter(x => x.isFile).map(x => x.file)
          .forEach(picture => uploadForm.append('pictureFiles', picture))

        this.axios.post('admin/items/create', uploadForm).then(response => {
          this.posting = false
          this.resetForm('newItemForm')
          this.$notify.success({
            title: 'Success',
            message: 'Succesfully added item'
          })
        }).catch(err => {
          this.posting = false
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
  .main-div {
    padding: 16px 8px 0 0
  }

  .main-row {
    height: 75vh
  }

  .small-input-fix {
    float: left;
  }

  .attributes-photos-container {
    height: 100%;
    padding-bottom: 8px;
    padding-left: 8px;
  }

  .attributes-photos-container .attributes-manager {
    height: 40%;
  }

  .attributes-photos-container .photos-manager {
    height: 60%;
  }

</style>
