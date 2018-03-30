<template>
  <el-card class="box-card gd_wrapper" v-loading="loading">
    <h2>Address book</h2>
    <el-card class="box-card gd-address-card" align="start">
      <!-- if we are not in edit mode display button -->
      <el-button
        v-if="!editMode"
        icon="el-icon-plus"
        @click="enterAddNewAddressMode()">
         Add new address
      </el-button>
      <!-- if we enter edit mode display form -->
      <el-form
        v-if="editMode"
        :model="newAddress"
        label-width="80px">
        <!-- show different description for adding new address and editing existing eddress -->
        <div class="gd-description" v-if="newAddressMode">
          <h3>Add new address</h3>
          <p>Please enter an address you would like to save and deliver your items to.</p>
        </div>
        <div class="gd-description" v-if="!newAddressMode">
          <h3>Edit address</h3>
          <p>Please update your address details and save the changes.</p>
        </div>
        <el-form-item label="Name" prop="name">
          <el-input v-model="newAddress.Name" :autofocus="focus"></el-input>
        </el-form-item>
        <el-form-item label="Surname" prop="surname">
          <el-input v-model="newAddress.Surname"></el-input>
        </el-form-item>
        <el-form-item label="Street" prop="street">
          <el-input v-model="newAddress.Street"></el-input>
        </el-form-item>
        <el-form-item label="City" prop="city">
          <el-input v-model="newAddress.City"></el-input>
        </el-form-item>
        <el-form-item label="Postcode" prop="postcode">
          <el-input v-model="newAddress.Postcode"></el-input>
        </el-form-item>
        <el-form-item label="Country" prop="country">
          <el-input v-model="newAddress.Country"></el-input>
        </el-form-item>
        <el-form-item align="center">
          <el-button v-if="newAddressMode" type="primary" @click="addNewAddress()">Save address</el-button>
          <el-button v-if="!newAddressMode" type="primary" @click="saveAddressChanges()">Save changes</el-button>
          <el-button @click="exitEditMode('addressForm')">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card gd-address-card" v-for="(address) in initialUserData.addresses" :key="address.id">
      <el-row>
        <el-col :span="18">
          <div class="gd-address-wrapper">
            <span>{{address.name}} {{address.surname}}<br></span>
            <span>{{address.street}}<br></span>
            <span>{{address.city}} {{address.postcode}}<br></span>
            <span>{{address.country}}<br></span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="gd-address-buttons">
            <el-button icon="el-icon-edit" @click="editAddress(address)"></el-button>
            <el-button icon="el-icon-delete" @click="deleteAddress(address.id)"></el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </el-card>
</template>

<script>
export default {
  props: {
    initialUserData: {type: Object},
    loading: {type: Boolean}
  },
  data () {
    return {
      newAddress: {
        Id: '',
        Name: '',
        Surname: '',
        Street: '',
        City: '',
        Country: '',
        Postcode: ''
      },
      newAddressMode: false,
      editMode: false,
      focus: '',
      rules: {
        name: [
          {
            required: true,
            message: 'Please enter a name',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    exitEditMode (formName) {
      /* this.refs[formName].resetFields(formName) */
      this.editMode = false
    },
    enterAddNewAddressMode () {
      this.newAddress.Id = 1
      this.newAddressMode = true
      this.editMode = true
    },
    editAddress (address) {
      this.newAddress.Id = address.id
      this.newAddress.Name = address.name
      this.newAddress.Surname = address.surname
      this.newAddress.Street = address.street
      this.newAddress.City = address.city
      this.newAddress.Postcode = address.postcode
      this.newAddress.Country = address.country
      this.newAddressMode = false
      this.editMode = true
      this.focus = true
    },
    saveAddressChanges () {
      /* check if form inputs valid */
     /* if (this.checkIfValidFields('addressForm')) { */
        this.$emit('changeLoading', true)
        this.axios.put('user/updateAddress', this.newAddress)
              .then(response => {
                console.log(this.newAddress)
                console.log('Success')
                console.log(response)
                this.$emit('dataUpdated', this.newAddress)
                this.$notify.success({
                  title: 'Success!',
                  message: 'Address successfuly updated'
                })
                this.exitEditMode()
                this.$emit('changeLoading', false)
              })
              .catch(err => {
                console.log(err)
                this.$notify.error({
                  title: 'Error!',
                  message: 'Address could not be updated'
                })
                this.exitEditMode()
                this.$emit('changeLoading', false)
              })
      /* } */
    },
    addNewAddress () {
     /* if (this.checkIfValidFields()) { */
        this.$emit('changeLoading', true)
        this.axios.post('user/addAddress', this.newAddress)
          .then(response => {
            console.log('Success')
            console.log(response)
            /* still need to emit event to parent */
            /* change newAddress id */
            this.$emit('addressAdded', this.newAddress)
            /* bus blogas ID */
            this.$notify.success({
              title: 'Success!',
              message: 'Address successfuly updated'
            })
            this.exitEditMode()
            this.$emit('changeLoading', false)
          })
          .catch(err => {
            console.log(err)
                this.$notify.error({
                  title: 'Error!',
                  message: 'Address could not be added'
            })
            this.exitEditMode()
            this.$emit('changeLoading', false)
          })
      /* } else {
        console.log('Inputs not valid')
      } */
    },
    deleteAddress (id) {
      this.$confirm('This will permanentely delete the address. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$emit('changeLoading', true)
        this.axios.delete('user/deleteAddress/' + id)
          .then(response => {
            console.log('Success')
            console.log(response)
            this.$emit('addressDeleted', id)
            this.$notify.success({
              title: 'Success!',
              message: 'Address deleted'
            })
            this.$emit('changeLoading', false)
          })
          .catch(err => {
            console.log(err)
                  this.$notify.error({
                    title: 'Error!',
                    message: 'Address could not be deleted'
              })
              this.$emit('changeLoading', false)
          })
      }).catch(() => {
        this.$notify({
            type: 'info',
            message: 'Delete canceled'
          })
      })
    },
    checkIfValidFields (formName) {
      var inputsValid
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('inputs valid')
          inputsValid = true
        } else {
          console.log('inputs invalid')
          inputsValid = false
        }
      })
      return inputsValid
    }
  }
}
</script>

<style scoped>
  .gd-address-card {
    margin: 20px;
  }
  .gd-address-wrapper {
    text-align: left;
  }
  .gd-address-buttons {
    text-align: right;
  }
  h3 {
    font-size: 1.5em;
  }
  .gd-description {
    margin:10px 20px 30px 20px;
  }
</style>

