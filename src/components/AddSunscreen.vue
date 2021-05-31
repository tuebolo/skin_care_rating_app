<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field
      label="Product Name"
      v-model="name"
      :rules="nameRules"
      required
    ></v-text-field>

    <v-text-field
      label="Brand"
      required
      v-model="brand"
      :rules="brandRules"
    ></v-text-field>

    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs6>
          <v-textarea
            name="input-7-1"
            label="Description"
            v-model="description"
            auto-grow
          ></v-textarea>
        </v-flex>
        <v-flex xs6>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <input type="file" @change="uploadFile" multiple>
              <button class="btn btn-success btn-block btn-lg"></button>
            </div>
          </form>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs6>
          <v-text-field
            label="Price"
            v-model="price"
            required
            :rules="priceRules"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-select
            label="Currency"
            v-model="currency"
            reqired
            :items="currencies"
            :rules="currencyRules"
          ></v-select>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs6>
          <v-text-field
            label="Volume"
            v-model="volume"
            required
            :rules="volumeRules"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-select
            label="Units"
            v-model="unit"
            reqired
            :items="units"
            :rules="unitRules"
          ></v-select>
        </v-flex>
      </v-layout>
    </v-container>

    <v-select
      label="SPF"
      v-model="spf"
      required
      :rules="spfRules"
      :items="spfs"
    ></v-select>

    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs2>
          <v-select
            label="White Cast"
            v-model="whitecast"
            reqired
            :items="five_factors"
            :rules="fiveRules"
          ></v-select>
        </v-flex>
        <v-flex xs2>
          <v-select
            label="Shine"
            v-model="shine"
            reqired
            :items="five_factors"
            :rules="fiveRules"
          ></v-select>
        </v-flex>
        <v-flex xs2>
          <v-select
            label="Compatibility"
            v-model="compatibility"
            reqired
            :items="five_factors"
            :rules="fiveRules"
          ></v-select>
        </v-flex>
        <v-flex xs2>
          <v-select
            label="Strong Scent"
            v-model="strongscent"
            reqired
            :items="five_factors"
            :rules="fiveRules"
          ></v-select>
        </v-flex>
        <v-flex xs2>
          <v-select
            label="Irritation"
            v-model="irritation"
            reqired
            :items="five_factors"
            :rules="fiveRules"
          ></v-select>
        </v-flex>
        <v-flex xs2>
          <v-select
            label="Ickiness"
            v-model="ickiness"
            reqired
            :items="five_factors"
            :rules="fiveRules"
          ></v-select>
        </v-flex>
      </v-layout>
    </v-container>

    <v-btn
      @click="submit"
      :disabled="!valid"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    valid: true,
    name: '',
    description: '',
    brand: '',
    price: '',
    volume: '',
    unit: '',
    currency: '',
    spf: '',
    whitecast: '',
    shine: '',
    compatibility: '',
    strongscent: '',
    irritation: '',
    ickiness: '',

    nameRules: [
      v => !!v || 'Product name is required'
    ],
    brandRules: [
      v => !!v || 'Brand name is required',
      v => (v && v.length <= 80) || 'Brand name must be less than 80 characters.'
    ],
    priceRules: [
      v => !!v || 'Price of product is required'
    ],
    volumeRules: [
      v => !!v || 'Product volume is required'
    ],
    spfRules: [
      v => !!v || 'SPF factor is required'
    ],
    currencyRules: [
      v => !!v || 'Currency required'
    ],
    unitRules: [
      v => !!v || 'Units required'
    ],
    fiveRules: [
      v => !!v || 'Selection required'
    ],
    select: null,
    spfs: [
      '10', '15', '20', '25', '30', '35',
      '40', '45', '50', '55', '60', '65',
      '70', '75', '80', '85', '90', '95',
      '100'
    ],
    currencies: [
      'US$',
      '€'
    ],
    units: [
      'FL OZ',
      'mL'
    ],
    five_factors: [
      1, 2, 3, 4, 5
    ]
  }),
  methods: {
    uploadFile (event) {
      this.files = event.target.files
    },
    handleSubmit () {
      const formData = new FormData()
      for (const i of Object.keys(this.files)) {
        formData.append('files', this.files[i])
      }
      axios.post('http://localhost:8082/sunscreens', formData, {}).then((res) => {
        console.log(res)
      })
    },
    submit () {
      if (this.$refs.form.validate()) {
        const data = {
          name: this.name,
          description: this.description,
          spf: this.spf,
          brand: this.brand,
          price: this.price,
          unit: this.unit,
          volume: this.volume,
          currency: this.currency,
          whitecast: this.whitecast,
          shine: this.shine,
          compatibility: this.compatibility,
          strongscent: this.strongscent,
          irritation: this.irritation,
          ickiness: this.ickiness
        }
        const formData = new FormData()
        const blob = new Blob([JSON.stringify(data)], {type: 'application/json'})
        formData.append('data', blob)
        formData.append('files', this.files[0])
        return axios({
          url: 'http://localhost:8082/sunscreensdata',
          method: 'post',
          // headers: {
          //   'Content-Type': 'application/json'
          // }
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(() => {
            this.$swal(
              'Great!',
              'Product successfully added!',
              'success'
            )
            // this.$router.push({name: 'Home'})
            this.$refs.form.reset()
          })
          .catch(() => {
            this.$swal(
              'Uh oh!',
              'Product was not added!',
              'error'
            )
          })
      }
      return true
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
