<style>
@import url("https://fonts.googleapis.com/css2?family=Limelight&family=Trirong:wght@100;300&display=swap");
#home-app .v-card__title .headline {
  font-family: 'Limelight', sans-serif !important;
  word-break: normal;
}

</style>

<template>
  <v-container class="grey lighten-5" id="home-app" >
<!--    <h1>Sunscreens</h1>-->
    <v-row dense align="start">
      <v-col cols="4" v-for="sunscreen in sunscreens" :key="sunscreen._id">
        <v-card>
          <a href="`/sunscreens/${sunscreen._id}`" style="text-decoration: none; color: black">
          <v-card-title primary-title class="text-left">
              <div class="headline">
                {{ sunscreen.name }}
              </div>
          </v-card-title>
          </a>
            <v-card-subtitle class="text-center">
              <span> SPF {{ sunscreen.spf }} ‧
              {{ sunscreen.brand }} ‧ {{
                  sunscreen.currency
                }} {{ parseFloat(sunscreen.price / sunscreen.volume).toFixed(2) }} {{ sunscreen.unit }} </span>
            </v-card-subtitle>
          <v-img
            contain height="250"
            v-bind:src="`http://localhost:8082/api/sunscreens/${sunscreen._id}/image`">
          </v-img>
          <v-btn text color="#CD5C5C">
          <h8 class="card-text">Rate this sunscreen</h8>
          </v-btn>
          <v-card-text class="text-left">
            {{ sunscreen.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from 'axios'

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
