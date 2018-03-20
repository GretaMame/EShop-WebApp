<template>
  <div>
    <loading-screen v-if="loading" screen-height="400"></loading-screen>
    <b-container v-if="!loading">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="form">
        <b-row>
          <b-col>
            <b-form-group id="firstNameGroup" label="First name:" label-for="firstname">
              <b-form-input id="firstname" type="text" v-model="form.firstname" required placeholder="Enter first name">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="lastNameGroup" label="Last name:" label-for="lastname">
              <b-form-input id="lastname" type="text" v-model="form.lastname" required placeholder="Enter last name">
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group id="emailGroup" label="Email address:" label-for="email" description="We'll never share your email with anyone else.">
              <b-form-input id="email" type="email" v-model="form.email" required placeholder="Enter email">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="emailGroup" label="Email address:" label-for="email" description="We'll never share your email with anyone else.">
              <b-form-input id="email" type="email" v-model="form.email" required placeholder="Enter email">
              </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-container>
  </div>
</template>

<script>
  import LoadingScreen from '@/components/LoadingScreen'
  export default {
    components: {
      LoadingScreen
    },
    data () {
      return {
        form: {
          email: '',
          firstname: '',
          lastname: ''
        },
        show: true,
        initialData: {},
        loading: true
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
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    },
    mounted () {
      loadData()
        .then(response => {
          this.initialData = response
          this.form.email = response.email
          this.form.firstname = response.firstname
          this.form.lastname = response.lastname
          this.loading = false
        })
        .catch(error => {
          console.log(error)
          this.loading = false
        })
    }
  }

  function loadData () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          email: 'lalala@lalala.com',
          firstname: 'Larry',
          lastname: 'Biord'
        })
      }, 5000)
    })
  }

</script>
<style>
  .form {
    margin: 0 32px 0 32px;
  }

</style>
