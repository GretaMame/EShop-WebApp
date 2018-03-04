<template>
  <div>
    <h1 class="m-3">Login</h1>
    <b-form @submit="onSubmit">
      <b-row align-h="center" md="auto">
          <b-form-group label="Email">
            <b-form-input type="email"
                          v-model="form.email"
                          required>
            </b-form-input>
          </b-form-group>
      </b-row>
      <b-row align-h="center" md="auto">
          <b-form-group   label="Password">
            <b-form-input type="password"
                          v-model="form.password"
                          required>
            </b-form-input>
          </b-form-group>
      </b-row>
      <b-row align-h="center" align-v="center" class="my-2"><b-button type="submit">Login</b-button></b-row>
      <b-row align-h="center" align-v="center"><b-link href="forgotPassword">Forgot password?</b-link></b-row>
    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    }
  }
}
</script>
