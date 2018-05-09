<template>
  <el-card class="gd_step_body">
    <div v-if="!changeAddressMode" v-loading="loading">
      <div class="gd_address_wrapper">
        <h3>{{addressTitle}}</h3>
        <el-row class="gd-text-align-left">
          <el-row class="gd_margin">
            <el-col :span="10" class="gd_label">Name: </el-col>
            <el-col :span="14">{{address.name}} {{address.surname}}</el-col>
          </el-row>
          <el-row class="gd_margin">
            <el-col :span="10" class="gd_label">Street: </el-col>
            <el-col :span="14">{{address.street}}</el-col>
          </el-row>
          <el-row class="gd_margin">
            <el-col :span="10" class="gd_label">Postcode: </el-col>
            <el-col :span="14">{{address.postcode}}</el-col>
          </el-row>
          <el-row class="gd_margin">
            <el-col :span="10" class="gd_label">City: </el-col>
            <el-col :span="14">{{address.city}}, {{address.country}}</el-col>
          </el-row>
        </el-row>
      </div>
      <el-button class="gd_buttons" @click="enterChangeAddressMode">Change delivery address</el-button>
    </div>
    <div v-if="changeAddressMode" align="center">
      <h3>{{changeAddressTitle}}</h3>
      <el-form :model="form" :rules="rules" :ref="formName">
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
            <el-input
              v-model="form.country"
              placeholder="Country"
              @keyup.enter.native="saveChanges()">
            </el-input>
          </el-form-item>
          <el-form-item class="gd_buttons">
            <el-button @click="cancelChanges()">Cancel</el-button>
            <el-button @click="clearForm()">Clear fields</el-button>
          </el-form-item>
      </el-form>
    </div>
      <div class="gd_step_buttons">
        <el-button @click="$emit('previousStep')">Previous</el-button>
        <el-button type="primary" @click="saveChanges()" :disabled="!addressProvided">Next</el-button>
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
      formName: 'ChangeAddressForm',
      addressTitle: 'Delivery Address',
      changeAddressTitle: 'Change delivery address',
      addressProvided: false,
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
  mounted () {
    this.checkIfEmptyAddress()
  },
  methods: {
    checkIfEmptyAddress () {
      if (!this.address.name) {
        this.enterChangeAddressMode
        this.addressProvided = false
      } else {
        this.changeAddressMode = false
        this.addressProvided = true
      }
    },
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
      if (!this.changeAddressMode) {
        this.$emit('nextStep')
      } else {
        this.$refs[this.formName].validate((valid) => {
          if (valid) {
            this.changeAddressMode = false
            this.addressProvided = true
            this.$emit('updateAddress', this.form)
            this.$emit('nextStep')
          }
        })
      }
    },
    cancelChanges () {
      this.changeAddressMode = false
    },
    clearForm () {
      this.$refs[this.formName].resetFields()
      this.form = {}
    }
  }
}
</script>

<style scoped>
  .gd_address_line {
    margin-bottom: 10px;
    text-align: left;
  }
  .gd_address_wrapper {
    margin: 0px auto;
    max-width: 250px;
  }
  h3 {
    margin-top: 20px;
    margin-bottom: 40px;
  }
  .gd_margin {
    margin-bottom: 20px;
  }
  form {
    max-width: 500px;
  }
  .gd_buttons {
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .gd_label {
    font-weight: bold;
  }
</style>
