<template>
  <v-form v-model="valid" ref="form" lazy-validation>
  <v-text-field
    label="Product Name"
    v-model="name"
    :rules="nameRules"
    required
  ></v-text-field>
    <v-textarea
      name="input-7-1"
      label="Product Description"
      v-model="description"
      auto-grow
    ></v-textarea>
    <v-select
      label="SPF Factor"
      v-model="spf_factor"
      :items="factors"
    ></v-select>
    <v-text-field
      label="Brand"
      ></v-text-field>
    <v-btn
      @click="submit"
      :disabled="!valid">
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: '',
    description: '',
    spf_factor: '',
    brand: '',
    nameRules: [
      v => !!v || 'Product name is required'
    ],
    select: null,
    factors: [
      '10', '15', '20', '25', '30', '35',
      '40', '45', '50', '55', '60', '65',
      '70', '75', '80', '85', '90', '95',
      '100'
    ]
  }),
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Perform next actio
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
