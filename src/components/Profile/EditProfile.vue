<template>
  <el-card class="box-card gd_wrapper" v-loading="loading">
    <div v-if="!editMode">
      <h2>My details</h2>
      <el-card class="box-card gd_info_card" align="left">
        <div slot="header">
          <span class="gd_title">Personal information</span>
        </div>
        <span class="gd_label">Name:</span>
        <span> {{initialUserData.name}}<br></span>
        <span class="gd_label">Surname:</span>
        <span> {{initialUserData.surname}}<br></span>
        <span class="gd_label">Phone:</span>
        <span> {{initialUserData.phone}}<br></span>
      </el-card>
      <el-card class="box-card gd_info_card" align="left">
        <div slot="header">
          <span class="gd_title">Delivery address</span>
        </div>
        <div class="gd-address-wrapper">
          <span>{{initialUserData.address.name}} {{initialUserData.address.surname}}<br></span>
          <span>{{initialUserData.address.street}}<br></span>
          <span>{{initialUserData.address.city}} {{initialUserData.address.postcode}}<br></span>
          <span>{{initialUserData.address.country}}<br></span>
        </div>
      </el-card>
      <div class="gd_buttons">
        <el-button type="primary" @click="enterEditMode()">Edit info</el-button>
      </div>
    </div>
    <div v-if="editMode">
      <div>
        <h2>Edit profile</h2>
        <p>Please update your personal details and save the changes.</p>
      </div>
      <el-form
        ref="editUserForm"
        :model="form"
        :rules="rules"
        label-width="80px">
        <el-card class="box-card gd_info_card" align="left">
          <div slot="header">
            <span class="gd_title">Personal information</span>
          </div>
          <el-form-item label="Name" prop="name">
            <el-input v-model="form.name" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item label="Surname" prop="surname">
            <el-input v-model="form.surname"></el-input>
          </el-form-item>
          <el-form-item label="Phone" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
        </el-card>
        <el-card class="box-card gd_info_card" align="left">
          <div slot="header">
            <span class="gd_title">Delivery address</span>
          </div>
          <el-form-item label="Name" prop="addressName">
            <el-input v-model="form.addressName"></el-input>
          </el-form-item>
          <el-form-item label="Surname" prop="addressSurname">
            <el-input v-model="form.addressSurname"></el-input>
          </el-form-item>
          <el-form-item label="Street" prop="street">
            <el-input v-model="form.street"></el-input>
          </el-form-item>
          <el-form-item label="City" prop="city">
            <el-input v-model="form.city"></el-input>
          </el-form-item>
          <el-form-item label="Postcode" prop="postcode">
            <el-input v-model="form.postcode"></el-input>
          </el-form-item>
          <el-form-item label="Country" prop="country">
            <el-input v-model="form.country" @keyup.enter.native="saveChanges()"></el-input>
          </el-form-item>
        </el-card>
      </el-form>
      <div class="gd_buttons">
        <el-button type="primary" @click="saveChanges()">Save changes</el-button>
        <el-button @click="exitEditMode()">Cancel</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
  export default {
    data () {
      return {
        initialUserData: {
          address: {}
        },
        loading: '',
        form: {
          name: '',
          surname: '',
          phone: '',
          addressName: '',
          addressSurname: '',
          street: '',
          city: '',
          country: '',
          postcode: ''
        },
        updatedUser: {
          address: {}
        },
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
          phone: [
            {
              pattern: '^[0-9]+$',
              message: 'Please enter a valid phone number',
              trigger: 'blur'
            },
            {
              required: true,
              message: 'Please enter a phone number',
              trigger: 'blur'
            }
          ],
          addressName: [
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
          addressSurname: [
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
        },
        editMode: false
      }
    },
    mounted () {
      this.loadUserInfo()
    },
    methods: {
      loadUserInfo () {
        this.loading = true
        this.axios.get('user/profile')
          .then(response => {
            this.setValues(response.data, this.initialUserData)
            this.loading = false
          })
          .catch(err => {
            console.log(err)
            this.$notify.error({
              title: 'Error',
              message: 'Ups! Something bad happened.'
            })
            this.loading = false
          })
      },
      saveChanges () {
        if (this.checkIfValidInputs('editUserForm')) {
          if (this.checkIfChangesHaveBeenMade()) {
              this.loading = true
              this.prepareUserToUpdate()
              this.axios.put('user/updateUser', this.updatedUser)
                .then(response => {
                  this.setValues(this.updatedUser, this.initialUserData)
                  this.$notify.success({
                    title: 'Success!',
                    message: 'Profile successfuly updated'
                  })
                  this.exitEditMode()
                  this.loading = false
                })
                .catch(err => {
                  console.log(err)
                  this.$notify.error({
                    title: 'Error!',
                    message: 'Profile could not be updated'
                  })
                  this.exitEditMode()
                  this.loading = false
                })
          } else {
            this.$notify.success({
              title: 'Success!',
              message: 'Profile successfuly updated'
            })
            this.exitEditMode()
          }
        }
      },
      enterEditMode () {
        this.editMode = true
        this.form.name = this.initialUserData.name
        this.form.surname = this.initialUserData.surname
        this.form.phone = this.initialUserData.phone
        this.form.addressName = this.initialUserData.address.name
        this.form.addressSurname = this.initialUserData.address.surname
        this.form.street = this.initialUserData.address.street
        this.form.city = this.initialUserData.address.city
        this.form.country = this.initialUserData.address.country
        this.form.postcode = this.initialUserData.address.postcode
      },
      setValues (fromObject, toObject) {
        toObject.email = fromObject.email
        toObject.name = fromObject.name !== null ? fromObject.name : ''
        toObject.surname = fromObject.surname !== null ? fromObject.surname : ''
        toObject.phone = fromObject.phone !== null ? fromObject.phone : ''
        toObject.address = fromObject.address !== null ? fromObject.address : {}
      },
      prepareUserToUpdate () {
        this.updatedUser.address.id = this.initialUserData.address.id
        this.updatedUser.name = this.form.name
        this.updatedUser.surname = this.form.surname
        this.updatedUser.phone = this.form.phone
        this.updatedUser.address.name = this.form.addressName
        this.updatedUser.address.surname = this.form.addressSurname
        this.updatedUser.address.street = this.form.street
        this.updatedUser.address.city = this.form.city
        this.updatedUser.address.country = this.form.country
        this.updatedUser.address.postcode = this.form.postcode
      },
      exitEditMode () {
        this.editMode = false
        this.$refs['editUserForm'].resetFields()
      },
      checkIfChangesHaveBeenMade () {
        if (this.form.name !== this.initialUserData.name) return true
        if (this.form.surname !== this.initialUserData.surname) return true
        if (this.form.phone !== this.initialUserData.phone) return true
        if (this.form.addressName !== this.initialUserData.address.name) return true
        if (this.form.addressSurname !== this.initialUserData.address.surname) return true
        if (this.form.street !== this.initialUserData.address.street) return true
        if (this.form.city !== this.initialUserData.address.city) return true
        if (this.form.country !== this.initialUserData.address.country) return true
        if (this.form.postcode !== this.initialUserData.address.postcode) return true
        return false
      },
      checkIfValidInputs (refName) {
        var inputsValid
        this.$refs[refName].validate((valid) => {
          if (valid) {
            inputsValid = true
          } else {
            inputsValid = false
          }
        })
        return inputsValid
      }
    }
  }
</script>

<style scoped>
  .gd_label {
    font-weight: bold;
    min-width: 90px;
    float: left;
  }
  .gd_title {
    font-weight: bold;
  }
  .gd_buttons {
    margin-top: 20px;
  }
  .gd_wrapper {
    margin: auto;
    max-width: 700px;
    margin-top: 40px;
    padding: 10px 50px;
  }
  h2 {
    margin: 20px;
  }
  .gd_info_card {
    margin-top: 20px;
  }
</style>
