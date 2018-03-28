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
        <el-form-item align="center" class="gd_buttons">
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
        form: {
          name: '',
          surname: '',
          phone: ''
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
          phone: [
            {
              pattern: '^[0-9]+$',
              message: 'Please enter a valid phone number',
              trigger: 'blur'
            }
          ]
        },
        editMode: false
      }
    },
    methods: {
      cancelChanges () {
        /* dar reikia kad validatoriaus zinutes panaikintu */
        this.exitEditMode()
      },
      saveChanges () {
        if (this.checkIfValidInputs) {
          if (this.checkIfChangesHaveBeenMade()) {
              this.axios.put('user/updateUser', this.form)
                .then(response => {
                  this.$emit('dataUpdated', this.form)
                  this.$notify.success({
                    title: 'Success!',
                    message: 'Profile successfuly updated'
                  })
                  this.exitEditMode()
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
        }
      },
      enterEditMode () {
        this.editMode = true
        this.form.name = this.initialUserData.name
        this.form.surname = this.initialUserData.surname
        this.form.phone = this.initialUserData.phone
      },
      exitEditMode () {
        this.editMode = false
        this.form.name = ''
        this.form.surname = ''
        this.form.phone = ''
      },
      /* to prevent useless requests to server */
      checkIfChangesHaveBeenMade () {
        if (this.form.name !== this.initialUserData.name) return true
        if (this.form.surname !== this.initialUserData.surname) return true
        if (this.form.phone !== this.initialUserData.phone) return true
        return false
      },
      checkIfValidInputs () {
        var inputsValid
        this.$refs['editUserForm'].validate((valid) => {
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
  form {
    margin: 10px;
    padding: 0px 60px;
  }
  .gd-label {
    font-weight: bold;
    min-width: 120px;
    float: left;
  }
  .gd_buttons {
    margin-top: 20px;
  }
</style>
