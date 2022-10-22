<template lang="">
  <div class="screen-bg">
    <div class="d-flex justify-center align-center text-center text-white flex-column">
      <v-col cols="12" sm="9" md="8" lg="7" class="d-flex justify-center flex-column">
  <div class="d-flex justify-center flex-column align-center pa-8">
      <p class="text-white text-h5">🌟About</p>
      <img src="../assets/artemind-logo.svg" alt="" class="w-50">
    </div>
    <div class="d-flex justify-center flex-column align-center px-4 px-md-8">
      <v-card variant="outlined" color="white" class="pa-3 text-center mb-2 d-flex justify-center align-center flex-column flex-md-row">
        <img src="../assets/am-logo.svg" alt="" class="w-25">
        Artemind is a quiz game that tests your
        knowledge about art. From Impressionism to Post Modernism, the various artists are broken up into categories and
        each question taps into those expectations. Test yourself to determine whether you’re a connoisseur or an
        amateur.</v-card>
        

        
        
      <v-card variant="tonal" color="white" class="pa-3 text-center mb-2 d-flex">🌟 Scoring System 
      </v-card>
      
      <v-expansion-panels>
        <v-expansion-panel v-for="score in scores" :key="scores.title" :title="score.title" :text="score.scoring"
          color="cyan" class="mb-2">
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
      </v-col>
    </div>


    

  </div>
</template>
<script setup>
  import {
    ref
  } from 'vue';

  const scores = ref([{
      title: '0-25 points',
      scoring: 'Where the spirit does not work with the hand, there is no art. -Leonardo da Vinci'
    },
    {
      title: '26-50 points',
      scoring: 'Every artist was first an amateur - Ralph Emerson'
    },
    {
      title: '51-75 points',
      scoring: 'There are no mistakes, just happy accidents. -Bob ross'
    },
    {
      title: '76-100 points',
      scoring: 'An artist cannot fail; it is a success to be one. -Charles Cooley'
    },
  ])
</script>
<style scoped>
  .screen-bg {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.60)), url("https://themarketherald.com.au/fancy/wp-content/uploads/2022/04/vangoghalive-supplied2-1920x1080-1.jpeg");
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
  }
</style>