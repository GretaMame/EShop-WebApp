<template>
  <el-card class="box-card gd_wrapper" :v-loading="loading">
     <h2>My details</h2>
      <el-form
        :model="form"
        ref="editUserForm"
        :rules="rules"
        size="medium"
        align="left">
        <el-form-item prop="name">
          <span class="gd-label">Name:</span>
          <span v-if="!editMode">{{initialUserData.name}}</span>
          <el-input
            v-if="editMode"
            v-model="form.name"
            class="gd-input"
            placeholder="Enter your surname">
          </el-input>
        </el-form-item>
        <el-form-item prop="surname">
          <span class="gd-label">Surname:</span>
          <span v-if="!editMode">{{initialUserData.surname}}</span>
          <el-input
            v-if="editMode"
            v-model="form.surname"
            class="gd-input"
            placeholder="Enter your surname">
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <span class="gd-label">Email:</span>
          <span v-if="!editMode">{{initialUserData.email}}</span>
          <el-input
            v-if="editMode"
            v-model="form.email"
            class="gd-input"
            placeholder="Enter your email">
          </el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <span class="gd-label">Phone number:</span>
          <span v-if="!editMode">{{initialUserData.phone}}</span>
          <el-input
            v-if="editMode"
            v-model="form.phone"
            class="gd-input"
            placeholder="Enter your phone number">
          </el-input>
        </el-form-item>
        <el-form-item align="center">
          <el-button v-if="!editMode" type="primary" @click="enterEditMode()">Edit info</el-button>
          <el-button v-if="editMode" type="primary" @click="saveChanges()">Save changes</el-button>
          <el-button v-if="editMode" @click="cancelChanges()">Cancel</el-button>
        </el-form-item>
      </el-form>
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
        formName: 'editUserForm',
        form: {
          name: '',
          surname: '',
          phone: '',
          email: ''
        },
        rules: {
          name: [
            {
              pattern: '^[A-Za-z]+$',
              message: 'Please enter a name',
              trigger: 'blur'
            }
          ],
          surname: [
            {
              pattern: '^[A-Za-z]+$',
              message: 'Please enter a name',
              trigger: 'blur'
            }
          ],
          email: [
            {
              required: true,
              message: 'Please enter an email',
              trigger: 'blur'
            },
            {
              type: 'email',
              message: 'Please enter a valid email',
              trigger: 'blur'
            }
          ],
          phone: [
            {
              pattern: '^[0-9]+$',
              message: 'Please enter a valid phone number',
              trigger: 'blur'
            }
          ]
        },
        editMode: false,
        inputsValid: undefined
      }
    },
    methods: {
      cancelChanges () {
        this.exitEditMode()
      },
      saveChanges () {
        this.checkIfValidInputs()
        if (this.inputsValid) {
          if (this.checkIfChangesHaveBeenMade()) {
              this.axios.put('account/update', this.form)
                .then(response => {
                  console.log('Success')
                  console.log(response)
                  this.exitEditMode()
                  this.$emit('dataUpdated')
                  this.$notify.success({
                    title: 'Success!',
                    message: 'Profile successfuly updated'
                  })
                })
                .catch(err => {
                  console.log(err)
                  this.$notify.error({
                    title: 'Error!',
                    message: 'Profile could not be updated'
                  })
                })
          } else {
            this.exitEditMode()
          }
        } else {
          console.log('Inputs not valid')
        }
      },
      enterEditMode () {
        this.editMode = true
        this.form.name = this.initialUserData.name
        this.form.surname = this.initialUserData.surname
        this.form.email = this.initialUserData.email
        this.form.phone = this.initialUserData.phone
      },
      exitEditMode () {
        this.editMode = false
        this.form.name = ''
        this.form.surname = ''
        this.form.email = ''
        this.form.phone = ''
      },
      /* ment to prevent useless request sends */
      checkIfChangesHaveBeenMade () {
        if (this.form.name !== this.initialUserData.name) return true
        if (this.form.surname !== this.initialUserData.surname) return true
        if (this.form.email !== this.initialUserData.email) return true
        if (this.form.phone !== this.initialUserData.phone) return true
        return false
      },
      checkIfValidInputs () {
        this.$refs[this.formName].validate((valid) => {
          if (valid) {
            console.log('inputs valid in validator')
            this.inputsValid = true
          } else {
            console.log('inputs invalid in validator')
            this.inputsValid = false
          }
        })
      }
    }
  }
</script>

<style scoped>
  form {
    margin: 10px;
    padding: 0px 60px;
  }
  .gd-label {
    font-weight: bold;
    min-width: 120px;
    float: left;
  }
  .gd-input {
    width: 75%;
  }
</style>
