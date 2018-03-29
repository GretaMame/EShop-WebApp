<template>
  <el-card class="box-card gd_wrapper" :v-loading="loading">
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
        ref="editForm"
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
          <el-input v-model="newAddress.Name"></el-input>
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
          <el-button @click="exitEditMode()">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- key is city for now -->
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
            <el-button icon="el-icon-delete" @click="deleteAddress(index)"></el-button>
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
      user: {
        email: 'laiswoOroDirektoriuz@laikinas.com',
        firstname: 'Verslas',
        lastname: 'NuoNulio',
        phoneNumber: '86xxxxxxx',
        addresses: [
          {
            name: 'Greta',
            surname: 'Grietine',
            street: 'Aukstakalnio 74-1',
            city: 'UtenaXD',
            postcode: '28176',
            country: 'Lietuva'
          },
          {
            name: 'Rita',
            surname: 'Margarita',
            street: 'Makaronu g. 4',
            city: 'Pasta',
            postcode: '12346',
            country: 'Italia'
          }
        ]
      },
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
      rules: {
        name: [
          {
            required: true,
            message: 'Please enter a name',
            trigger: 'blur'
          }
        ],
        surname: [
          {
            required: true,
            message: 'Please enter a surname',
            trigger: 'blur'
          }
        ],
        street: [
          {
            required: true,
            message: 'Please enter the street',
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
        postcode: [
          {
            required: true,
            message: 'Please enter a postcode',
            trigger: 'blur'
          }
        ],
        country: [
          {
            required: true,
            message: 'Please enter a country',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    exitEditMode () {
      this.clearEditFields()
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
    },
    saveAddressChanges () {
      /* check if form inputs valid */
      /* axios PUT */
     /* if (this.checkIfValidFields()) { */
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
              })
              .catch(err => {
                console.log(err)
                this.$notify.error({
                  title: 'Error!',
                  message: 'Address could not be updated'
                })
                this.exitEditMode()
              })
      /* } */
    },
    addNewAddress () {
      /* axios POST */
      /* if (this.checkIfValidFields()) { */
        this.axios.post('user/addAddress', this.newAddress)
          .then(response => {
            console.log('Success')
            console.log(response)
            this.$notify.success({
              title: 'Success!',
              message: 'Address successfuly updated'
            })
          })
          .catch(err => {
            console.log(err)
                this.$notify.error({
                  title: 'Error!',
                  message: 'Address could not be added'
            })
          })
        /* this.user.addresses.push({
          name: this.newAddress.newName,
          surname: this.newAddress.newSurname,
          street: this.newAddress.newStreet,
          city: this.newAddress.newCity,
          postcode: this.newAddress.newPostcode,
          country: this.newAddress.newCountry
        })
        this.clearEditFields()
        this.exitEditMode() */
    },
    deleteAddress (index) {
      /* AXIOS DELETE */
      this.user.addresses.splice(index, 1)
    },
    clearEditFields () {
      this.newAddress.Name = ''
      this.newAddress.Surname = ''
      this.newAddress.Street = ''
      this.newAddress.City = ''
      this.newAddress.Postcode = ''
      this.newAddress.Country = ''
    },
    checkIfValidFields () {
      var inputsValid
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          inputsValid = true
        }
        inputsValid = false
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

