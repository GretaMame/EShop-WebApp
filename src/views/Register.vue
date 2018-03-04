<template>
  <div>
    <b-form @submit="onSubmit">
      <b-row align-h="center">
        <b-col cols="3" align-v="start" align-h="center">
          <b-img class="m-2" md="auto" src="https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F440563522632552448%2FivG2Cb9-.png&f=1" fluid alt="Cat" />
        </b-col>
        <b-col cols="8" md="auto" class="m-2" align-h="start" align-v="center">
          <b-form-group label="Email address:" class="m-2">
            <b-form-input type="email"
                          required
                          v-model="email"
                          placeholder="example@example.com">
            </b-form-input>
          </b-form-group>
          <b-form-group label="Enter password:" class="m-2">
            <b-form-input id="passwInput"
                          type="password"
                          v-model="password"
                          required>
            </b-form-input>
          </b-form-group>
          <b-form-group label="Repeat password:" class="m-2">
            <b-form-input type="password"
                          v-model="passwordRepeat"
                          :state="passwordsMatch"
                          required>
            </b-form-input>
          </b-form-group>
          <b-button class="my-2" :disabled="!passwordsMatch" type="submit">Register</b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  computed: {
    passwordsMatch () {
      return this.password === this.passwordRepeat
    }
  },
  data () {
    return {
      email: '',
      password: '',
      passwordRepeat: ''
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert('Please check your email to very your account!')
    }
  }
}
</script>
