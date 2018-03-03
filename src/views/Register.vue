<template>
  <div>
    <b-form @submit="onSubmit">
      <b-row align-h="center">
        <b-col cols="3" align-v="start" align-h="center">
          <b-img class="m-2" md="auto" src="https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F440563522632552448%2FivG2Cb9-.png&f=1" fluid alt="Cat" />
        </b-col>
        <b-col cols="8" md="auto" class="m-2" align-h="start" align-v="center">
          <b-form-group id="emailInputGroup"
                        label="Email address:"
                        label-for="emailInput"
                        class="m-2">
            <b-form-input id="emailInput"
                        type="email"
                        required
                        placeholder="example@example.com">
            </b-form-input>
          </b-form-group>
          <b-form-group id="passwInputGroup"
                        label="Enter password:"
                        label-for="passwInput"
                        class="m-2">
            <b-form-input id="passwInput"
                          type="text"
                          v-model.trim="passw"
                          required>
            </b-form-input>
          </b-form-group>
          <b-form-group id="passwRepInputGroup"
                        label="Repeat password:"
                        label-for="passwRepInput"
                        class="m-2">
            <b-form-input id="passwRepInput"
                          type="text"
                          v-model.trim="passwRep"
                          :state="passwState"
                          required>
            </b-form-input>
          </b-form-group>
          <b-button class="my-2" id="submitBtn" :disabled="!passwState" type="submit">Register</b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  computed: {
    passwState () {
      return this.passw === this.passwRep
    }
  },
  data () {
    return {
      passw: '',
      passwRep: ''
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
