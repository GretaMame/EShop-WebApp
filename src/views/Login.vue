<template>
  <div>
    <h1 class="m-3">Login</h1>
    <b-form @submit="onSubmit">
      <b-row align-h="center" md="auto">
          <b-form-group id="emailInputGroup"
                        label="Email"
                        for="emailInput">
            <b-form-input id="emailInput"
                          type="email"
                          required>
            </b-form-input>
          </b-form-group>
      </b-row>
      <b-row align-h="center" md="auto">
          <b-form-group id="passwInputGroup"
                        label="Password"
                        for="passwInput">
            <b-form-input id="passwInput"
                          type="password"
                          required>
            </b-form-input>
          </b-form-group>
      </b-row>
      <b-row align-h="center" align-v="center" class="my-2"><b-button id="LoginBtn" type="submit">Login</b-button></b-row>
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
        passw: ''
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
