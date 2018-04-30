<template>
  <el-card class="gd_step_body" v-loading="loading">
    <h3>Payment details</h3>
    <div v-if="!editMode" class="gd_payment_details" align="center">
      <div align="left">
        <span class="gd_label">Card number: </span>
        <span class="gd_payment_details_data">{{cardDetails.number}}<br></span>
        <span class="gd_label">Card holder: </span>
        <span class="gd_payment_details_data">{{cardDetails.holder}}<br></span>
        <span class="gd_label">Expiration date: </span>
        <span class="gd_payment_details_data">{{cardDetails.exp_year}}/{{cardDetails.exp_month}}<br></span>
        <span class="gd_label">CVV: </span>
        <span class="gd_payment_details_data">{{cardDetails.cvv}}<br></span>
      </div>
        <el-button class="gd_buttons" @click="editPaymentDetails()">Change card details</el-button>
    </div>
    <div class="gd_form_wrapper" v-if="editMode" align="center">
      <el-form :model="form" :rules="rules" :ref="formName">
        <el-form-item prop="number">
          <el-input
            v-model="form.number"
            placeholder="Card number"
            @input="formatCardInput"
            :maxlength="19">
          </el-input>
        </el-form-item>
        <el-form-item prop="holder">
          <el-input v-model="form.holder" placeholder="Name on card"></el-input>
        </el-form-item>
        <div align="left"><label>Expiration date:</label></div>
        <el-form-item >
          <el-col :span="10">
            <el-form-item prop="exp_year">
              <el-date-picker
                v-model="form.exp_year"
                type="year"
                placeholder="Exp. year"
                :picker-options="pickerOptions"
                value-format="yyyy">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-form-item prop="exp_month">
              <el-select v-model="form.exp_month" placeholder="Exp. month">
                <el-option label="January" value="1"></el-option>
                <el-option label="February" value="2"></el-option>
                <el-option label="March" value="3"></el-option>
                <el-option label="April" value="4"></el-option>
                <el-option label="May" value="5"></el-option>
                <el-option label="June" value="6"></el-option>
                <el-option label="July" value="7"></el-option>
                <el-option label="August" value="8"></el-option>
                <el-option label="September" value="9"></el-option>
                <el-option label="October" value="10"></el-option>
                <el-option label="November" value="11"></el-option>
                <el-option label="December" value="12"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="4">
            <el-form-item prop="cvv">
              <el-input v-model="form.cvv" placeholder="CVV" :maxlength="3"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <div class="gd_buttons" align="center">
          <el-form-item>
            <el-button  @click="clearForm()">Clear fields</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="gd_step_buttons">
            <el-button @click="$emit('previousStep')">Previous</el-button>
            <el-button type="primary" @click="submitCard()">Next</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
   props: {
    cardDetails: { type: Object },
    loading: { type: Boolean }
  },
  data () {
    return {
      editMode: true,
      formName: 'CardDetailsForm',
      cardDetailsProvided: false,
      form: {
        number: '',
        holder: '',
        exp_year: '',
        exp_month: '',
        cvv: ''
      },
      rules: {
        number: [
          {
            required: true,
            message: 'Please enter your card number',
            trigger: 'blur'
          },
          {
            /* TODO: pasiziuret, kas ten per Luhn algoritmas, kuri turi tenktinti */
            pattern: '^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$',
            message: 'Please enter a valid card number',
            trigger: 'blur'
          }
        ],
        holder: [
          {
            required: true,
            message: 'Please enter the name on card',
            trigger: 'blur'
          },
          {
            pattern: '^[a-zA-Z ]*$',
            message: 'Name can only contain letters',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 32,
            message: 'Length should be 2 to 32 characters',
            trigger: 'blur'
          }
        ],
        cvv: [
          {
            required: true,
            pattern: '^[0-9]{3}$',
            message: 'Please enter the CVV written on the back-side of your card',
            trigger: 'blur'
          }
        ],
        exp_month: [
          {
            required: true,
            message: 'Please select expiration month',
            trigger: 'change'
          }
        ],
        exp_year: [
          {
            required: true,
            message: 'Please select expiration year',
            trigger: 'blur'
          }
        ]
      },
      pickerOptions: {
          disabledDate (time) {
            return time.getTime() <= 1970
          }
      }
    }
  },
  mounted () {
   this.fetchCardDetails()
  },
  methods: {
    fetchCardDetails () {
      if (!this.cardDetails.number) {
        this.editMode = true
        this.cardDetailsProvided = false
      } else {
        this.editMode = false
        this.cardDetailsProvided = true
      }
    },
    formatCardInput () {
      this.form.number = this.form.number.split(' ').join('')
      var split = 4
      var chunk = []
      for (var i = 0, len = this.form.number.length; i < len; i += split) {
        chunk.push(this.form.number.substr(i, split))
      }
      this.form.number = chunk.join(' ')
    },
    editPaymentDetails () {
      this.editMode = true
      this.setFields(this.cardDetails, this.form)
    },
    submitCard () {
      if (!this.editMode) {
        this.$emit('nextStep')
      } else {
        this.$refs[this.formName].validate((valid) => {
          if (valid) {
            this.editMode = false
            this.cardDetailsProvided = true
            this.$emit('updatePaymentDetails', this.form)
            this.$emit('nextStep')
          }
        })
      }
    },
    clearForm () {
      this.$refs[this.formName].resetFields()
      this.form = {}
    },
    setFields (from, to) {
      to.number = from.number
      to.holder = from.holder
      to.exp_year = from.exp_year
      to.exp_month = from.exp_month
      to.cvv = from.cvv
    }
  }
}
</script>

<style scoped>
  h3 {
    margin-bottom: 30px;
  }
  .gd_buttons {
    margin-top: 30px;
    margin-bottom: 22px;
  }
  .gd_label {
    font-weight: bold;
    min-width: 130px;
    margin: 10px 0;
    display: inline-block;
  }
  form {
    max-width: 500px;
  }
  .gd_payment_details {
    max-width: 400px;
    margin: 0 auto;
  }
  .gd_payment_details_data {
    margin: 20px 0;
  }
</style>
