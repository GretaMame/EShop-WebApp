<template>
  <el-card class="box-card wrapper" v-loading="loading">
    <h2>Address book</h2>
    <el-card class="box-card gd-address-card" align="start">
      <el-button icon="el-icon-plus" v-if="!editMode" @click="enterAddNewAddressMode()">Add new address</el-button>
      <el-form v-if="editMode" ref="editForm" :model="newAddress" label-width="80px">
        <div class="gd-description" v-if="newAddressMode">
          <h3>Add new address</h3>
          <p>Please enter an address you would like to save and deliver your items to.</p>
        </div>
        <div class="gd-description" v-if="!newAddressMode">
          <h3>Edit address</h3>
          <p>Please update your address details and save the changes.</p>
        </div>
        <el-form-item label="Name" prop="name">
          <el-input v-model="newAddress.newName"></el-input>
        </el-form-item>
        <el-form-item label="Surname" prop="surname">
          <el-input v-model="newAddress.newSurname"></el-input>
        </el-form-item>
        <el-form-item label="Street" prop="street">
          <el-input v-model="newAddress.newStreet"></el-input>
        </el-form-item>
        <el-form-item label="City" prop="city">
          <el-input v-model="newAddress.newCity"></el-input>
        </el-form-item>
        <el-form-item label="Postcode" prop="postcode">
          <el-input v-model="newAddress.newPostcode"></el-input>
        </el-form-item>
        <el-form-item label="Country" prop="country">
          <el-input v-model="newAddress.newCountry"></el-input>
        </el-form-item>
        <el-form-item align="center">
          <el-button v-if="newAddressMode" type="primary" @click="addNewAddress()">Save address</el-button>
          <el-button v-if="!newAddressMode" type="primary" @click="saveAddressChanges(editIndex)">Save changes</el-button>
          <el-button @click="exitEditMode()">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card gd-address-card" v-for="(address, index) in user.addresses" :key="address.city">
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
            <el-button icon="el-icon-edit" @click="editAddress(address, index)"></el-button>
            <el-button icon="el-icon-delete" @click="deleteAddress(index)"></el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </el-card>
</template>

<script>
export default {
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
        newName: '',
        newSurname: '',
        newStreet: '',
        newCity: '',
        newPostcode: '',
        newCountry: ''
      },
      newAddressMode: false,
      editMode: false,
      editIndex: '',
      formName: 'editForm',
      loading: false,
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
      this.newAddressMode = false
    },
    enterEditMode () {
      this.editMode = true
    },
    enterAddNewAddressMode () {
      this.newAddressMode = true
      this.enterEditMode()
    },
    editAddress (address, index) {
      this.editIndex = index
      this.newAddress.newName = address.name
      this.newAddress.newSurname = address.surname
      this.newAddress.newStreet = address.street
      this.newAddress.newCity = address.city
      this.newAddress.newPostcode = address.postcode
      this.newAddress.newCountry = address.country
      this.enterEditMode()
    },
    saveAddressChanges (index) {
        this.$set(this.user.addresses, index, {
          name: this.newAddress.newName,
          surname: this.newAddress.newSurname,
          street: this.newAddress.newStreet,
          city: this.newAddress.newCity,
          postcode: this.newAddress.newPostcode,
          country: this.newAddress.newCountry
      })
      this.exitEditMode()
    },
    addNewAddress () {
      /* if (this.checkFormFields()) { */
        this.user.addresses.push({
          name: this.newAddress.newName,
          surname: this.newAddress.newSurname,
          street: this.newAddress.newStreet,
          city: this.newAddress.newCity,
          postcode: this.newAddress.newPostcode,
          country: this.newAddress.newCountry
        })
        this.clearEditFields()
        this.exitEditMode()
    /* } */
    },
    deleteAddress (index) {
      this.user.addresses.splice(index, 1)
    },
    clearEditFields () {
      this.newAddress.newName = ''
      this.newAddress.newSurname = ''
      this.newAddress.newStreet = ''
      this.newAddress.newCity = ''
      this.newAddress.newPostcode = ''
      this.newAddress.newCountry = ''
    },
    checkFormFields () {
      this.$refs[this.formName].validate((valid) => {
        if (valid) {
          /* cia reikes padaryt ta notificationa */
          alert('submit!')
          return true
        }
        console.log('error submit!!')
        return false
      })
    }
  }
}
</script>

<style scoped>
  .gd-address-card {
    margin: 20px;
  }
  .wrapper {
    margin: auto;
    max-width: 800px;
    margin-top: 40px;
    padding: 10px 50px;
  }
  h2 {
    margin: 20px;
    margin-bottom: 30px;
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

