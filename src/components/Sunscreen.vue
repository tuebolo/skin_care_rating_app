<template>
  <v-layout row wrap>
    <v-flex xs4>
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class = "headline"> {{ sunscreen.name }} </div>
            <span class="grey--text"> SPF {{ sunscreen.spf}} ‧
              {{ sunscreen.brand }} ‧ {{ sunscreen.currency }} {{ parseFloat(sunscreen.price / sunscreen.volume).toFixed(2) }} {{ sunscreen.unit }}
            </span>
          </div>
        </v-card-title>
        <h6 class="card-title" v-if="current_user" @click="rate"> Rate this Sunscreen </h6>
        <v-card-text>
          {{ sunscreen.description }}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import StarRating from 'vue-star-rating'

const wrapper = document.createElement('div')
// shared state
const state = {
  note: 0
}
// create component to content
const RatingComponent = Vue.extend({
  data () {
    return { rating: 0 }
  },
  watch: {
    rating (newVal) { state.note = newVal }
  },
  template: `<div class="rating">
  How was your experience getting help with this issues?
  <star-rating v-model="rating" :show-rating="false"></star-rating>
</div>`,
  components: { 'star-rating': StarRating }
})

const component = new RatingComponent().$mount(wrapper)

export default {
  name: 'Sunscreens',
  data () {
    return {
      sunscreens: []
    }
  },
  mounted () {
    this.fetchSunscreens()
  },
  methods: {
    async rate () {
      this.$swal({
        content: component.$el,
        buttons: {
          confirm: {
            value: 0
          }
        }
      }).then(() => {
        const sunscreenId = this.$route.params.id
        return axios({
          method: 'post',
          data: {
            rate: state.note
          },
          url: `http://localhost:8081/sunscreens/rate/${sunscreenId}`,
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(() => {
          this.$swal(`Thank you for rating! ${state.note}`, 'success')
        })
          .catch((error) => {
            const message = error.response.data.message
            this.$swal('Uh oh!', `${message}`, 'error')
          })
      })
    },
    async fetchSunscreens () {
      return axios({
        method: 'get',
        url: 'http://localhost:8082/sunscreens'
      })
        .then((response) => {
          this.sunscreens = response.data.sunscreens
        })
        .catch(() => {
        })
    }
  }
}
</script>
