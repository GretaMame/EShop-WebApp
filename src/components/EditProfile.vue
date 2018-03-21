<template>
  <el-card class="box-card" v-loading="loading" :model="form">
     <h2>My details</h2>
      <el-form size="medium" label-position="left" align="left" label-width="120px">
        <el-row>
        <el-form-item label="Name:">
          <span v-if="!editMode">{{form.name}}</span>
          <el-input v-if="editMode" v-model="form.name" placeholder="Enter your surname"></el-input>
        </el-form-item>
        </el-row>
        <el-form-item label="Surname:">
          <span v-if="!editMode">{{form.surname}}</span>
          <el-input v-if="editMode" v-model="form.surname" placeholder="Enter your surname"></el-input>
        </el-form-item>
        <el-form-item label="Email:">
          <span v-if="!editMode">{{form.email}}</span>
          <el-input v-if="editMode" v-model="form.email" placeholder="Enter your email"></el-input>
        </el-form-item>
        <el-form-item label="Phone number:">
          <span v-if="!editMode">{{form.phone}}</span>
          <el-input v-if="editMode" v-model="form.phone" placeholder="Enter your phone number"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button class="gd-buttons" v-if="!editMode" type="primary" @click="enterEditMode()">Edit info</el-button>
          <el-button class="gd-buttons" v-if="editMode" type="primary" @click="exitEditMode()">Save changes</el-button>
          <el-button class="gd-buttons" v-if="editMode" @click="exitEditMode()">Cancel</el-button>
        </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          email: 'laiswoOroDirektoriuz@laikinas.com',
          name: 'Verslas',
          surname: 'NuoNulio',
          phone: '86xxxxxxx'
        },
        show: true,
        initialData: {},
        loading: false,
        editMode: false
      }
    },
    methods: {
      onSubmit (evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset (evt) {
        evt.preventDefault()
        /* Reset our form values */
        this.form.email = ''
        this.form.firstname = ''
        this.form.lastname = ''
        /* Trick to reset/clear native browser form validation state */
        /* this.show = false
        this.$nextTick(() => {
          this.show = true
        }) */
      },
      enterEditMode () {
        this.editMode = true
      },
      exitEditMode () {
        this.editMode = false
      }
    },
    mounted () {
      loadData()
        /* .then(response => {
          this.initialData = response
          this.form.email = response.email
          this.form.firstname = response.firstname
          this.form.lastname = response.lastname
          this.loading = false
        })
        .catch(error => {
          console.log(error)
          this.loading = false
        }) */
    }
  }
  function loadData () {
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          email: 'lalala@lalala.com',
          firstname: 'Larry',
          lastname: 'Biord'
        })
      }, 5000)
    }) */

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
  .el-form-item {
    margin-bottom: 12px;
  }
  .el-form-item__label {
    font-weight: bold;
  }
  .el-form-item__content {
    margin-left: 0px;
    align-self: center;
  }
</style>
