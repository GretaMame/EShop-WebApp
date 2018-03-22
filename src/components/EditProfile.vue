<template>
  <el-card class="box-card" v-loading="loading">
     <h2>My details</h2>
      <el-form :model="form" ref="form" size="medium" align="left">
        <el-form-item prop="name">
          <span class="gd-label">Name:</span>
          <span v-if="!editMode">{{initialUserData.name}}</span>
          <el-input v-if="editMode" v-model="form.name" class="gd-input" placeholder="Enter your surname"></el-input>
        </el-form-item>
        <el-form-item prop="surname">
          <span class="gd-label">Surname:</span>
          <span v-if="!editMode">{{initialUserData.surname}}</span>
          <el-input v-if="editMode" v-model="form.surname" class="gd-input" placeholder="Enter your surname"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <span class="gd-label">Email:</span>
          <span v-if="!editMode">{{initialUserData.email}}</span>
          <el-input v-if="editMode" v-model="form.email" class="gd-input" placeholder="Enter your email"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <span class="gd-label">Phone number:</span>
          <span v-if="!editMode">{{initialUserData.phone}}</span>
          <el-input v-if="editMode" v-model="form.phone" class="gd-input" placeholder="Enter your phone number"></el-input>
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
    data () {
      return {
        form: {
          name: '',
          surname: '',
          phone: '',
          email: ''
        },
        rules: {
          name: [
            {
              pattern: '^[A-Z]*[a-z]+$',
              message: 'Please enter a name',
              trigger: 'blur'
            }
          ],
          surname: [
            {
              pattern: '^[A-Z]*[a-z]+$',
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
        initialUserData: {},
        show: true,
        loading: '',
        editMode: false
      }
    },
    methods: {
      cancelChanges () {
        this.exitEditMode()
      },
      saveChanges () {
        this.axios.put('account/update', this.form)
          .then(response => {
            console.log('Success')
            console.log(response)
            this.loadUserInfo()
            this.exitEditMode()
            this.$notify.success({
              title: 'Success!',
              message: 'Profile successfuly updated'
            })
          })
          .catch(err => {
            console.log(err)
            this.$notify.err({
              title: 'Error!',
              message: 'Profile could not be updated'
            })
          })
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
      loadUserInfo () {
        this.loading = true
        this.axios.get('account/profile')
          .then(response => {
            console.log(response)
            this.initialUserData = response.data
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
      checkIfChangesHaveBeenMade () {
        /* detect if any changes have been made at all */
        /* we can use watchers */
      },
      stringifyForm () {
        return JSON.stringify(this.form)
      },
      checkIfValidInputs () {
        this.$refs['form'].validate((valid) => {
          if (valid) return true
          else return false
        })
      }
    },
    mounted () {
      this.loadUserInfo()
    }
  }

</script>

<style scoped>
  .box-card {
    margin: auto;
    max-width: 800px;
    margin-top: 40px;
    padding: 40px 60px 0px 60px;
  }
  form {
    margin: 10px;
    margin-top: 30px;
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
