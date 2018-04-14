<template>
  <el-card class="gd_step_body">
    <div v-if="!changeAddressMode" v-loading="loading">
      <div class="gd_address_wrapper">
        <h2>Delivery address</h2>
        <p class="gd_address_line">{{address.name}} {{address.surname}}</p>
        <p class="gd_address_line">{{address.street}}</p>
        <p class="gd_address_line">{{address.city}}</p>
        <p class="gd_address_line">{{address.country}} {{address.postcode}}</p>
      </div>
      <el-button class="gd_buttons" @click="enterChangeAddressMode">Change delivery address</el-button>
    </div>
    <div v-if="changeAddressMode" align="center">
      <h2>Change delivery address</h2>
      <el-form :model="form" :rules="rules" ref="changeAddressForm">
        <el-form-item>
          <el-col :span="11">
            <el-form-item prop="name">
                <el-input v-model="form.name" placeholder="Name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="1">
            <el-form-item prop="surname">
                <el-input v-model="form.surname" placeholder="Surname"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
          <el-form-item prop="street">
            <el-input v-model="form.street" placeholder="Street"></el-input>
          </el-form-item>
          <el-form-item>
          <el-col :span="12">
            <el-form-item prop="city">
                <el-input v-model="form.city" placeholder="City"></el-input>
            </el-form-item>
           </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item prop="postcode">
                <el-input v-model="form.postcode" placeholder="Postcode"></el-input>
            </el-form-item>
           </el-col>
          </el-form-item>
          <el-form-item prop="country">
            <el-input v-model="form.country" placeholder="Country"></el-input>
          </el-form-item>
          <el-form-item class="gd_buttons">
            <el-button type="primary" @click="saveChanges()">Save</el-button>
            <el-button @click="cancelChanges()">Cancel</el-button>
            <el-button @click="clearForm()">Clear fields</el-button>
          </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    address: { type: Object },
    loading: { type: Boolean }
  },
  data () {
    return {
      changeAddressMode: false,
      form: {},
      rules: {
        name: [
            {
              pattern: '^[A-Za-z]+$',
              message: 'Name can only contain letters',
              trigger: 'blur'
            },
            {
              required: true,
              message: 'Please enter a name',
              trigger: 'blur'
            }
          ],
          surname: [
            {
              pattern: '^[A-Za-z]+$',
              message: 'Surname can only contain letters',
              trigger: 'blur'
            },
            {
              required: true,
              message: 'Please enter a surname',
              trigger: 'blur'
            }
          ],
          street: [
            {
              required: true,
              message: 'Please enter street name and house/apartment number',
              trigger: 'blur'
            }
          ],
          city: [
            {
              required: true,
              message: 'Please enter a city',
              trigger: 'blur'
            }
          ],
          country: [
            {
              required: true,
              message: 'Please enter a country',
              trigger: 'blur'
            }
          ],
          postcode: [
            {
              required: true,
              message: 'Please enter a postcode',
              trigger: 'blur'
            }
          ]
      }
    }
  },
  methods: {
    enterChangeAddressMode () {
      this.changeAddressMode = true
      this.setFields(this.address, this.form)
    },
    setFields (from, to) {
      to.name = from.name
      to.surname = from.surname
      to.street = from.street
      to.city = from.city
      to.country = from.country
      to.postcode = from.postcode
    },
    saveChanges () {
      this.$refs['changeAddressForm'].validate((valid) => {
        if (valid) {
          this.changeAddressMode = false
          this.$emit('updateAddress', this.form)
        }
      })
    },
    cancelChanges () {
      this.changeAddressMode = false
    },
    clearForm () {
      this.form = {}
    }
  }
}
</script>

<style scoped>
  .gd_address_line {
    text-align: left;
  }
  .gd_address_wrapper {
    margin: 0px auto;
    max-width: 240px;
  }
  h2 {
    margin-top: 20px;
    margin-bottom: 50px;
  }
  form {
    max-width: 500px;
  }
  .gd_buttons {
    margin-top: 30px;
    margin-bottom: 20px;
  }
</style>
