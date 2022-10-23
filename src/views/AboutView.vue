<template lang="">
  <div class="screen-bg">
    <div class="d-flex justify-center align-center text-center text-white flex-column">
      <v-col cols="12" sm="9" md="8" lg="7" class="d-flex justify-center flex-column">
        <div class="d-flex justify-center flex-column align-center pa-8">
          <p class="text-white text-h5">🌟About</p>
          <img src="../assets/artemind-logo.svg" alt="" class="w-50">
        </div>
        <div class="d-flex justify-center flex-column align-center px-4 px-md-8">
          <v-card variant="outlined" color="white"
            class="pa-3 text-center mb-2 d-flex justify-center align-center flex-column flex-sm-row">
            <img src="../assets/am-logo.svg" alt="" class="w-25">
            Artemind is a quiz game that tests your
            knowledge about art. From Impressionism to Post Modernism, the various artists are broken up into categories
            and
            each question taps into those expectations. Test yourself to determine whether you’re a connoisseur or an
            amateur.</v-card>

          <v-card variant="tonal" color="white" class="pa-3 text-center mb-2 d-flex">🌟 Scoring System
          </v-card>

          <div class="d-flex justify-center flex-wrap text-center">
            <v-card class="pa-4 ma-2 d-flex flex-row"  v-for="score in scores" :key="scores.title" width="300" variant="tonal" >
            <v-img :src="score.artist" width="100" :aspect-ratio="1" cover></v-img>
            <div class="d-flex justify-center flex-column pa-2">
              <p class="text-subtitle-1 font-weight-bold">{{score.title}}</p>
            <p class="text-subtitle-2 font-italic">{{score.scoring}}</p>
            </div>
            
          </v-card>
        </div>
          
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
      title: '0-19 points',
      scoring: '“Where the spirit does not work with the hand, there is no art.” -Leonardo da Vinci',
      artist: 'https://www.thefamouspeople.com/profiles/images/leonardo-da-vinci-1.jpg'
    },
    {
      title: '20-40 points',
      scoring: '“Great things are done by a series of small things brought together.” - Vincent Van Gogh',
      artist: 'https://cdn.britannica.com/36/69636-050-81A93193/Self-Portrait-artist-panel-board-Vincent-van-Gogh-1887.jpg'
    },
    {
      title: '41-60 points',
      scoring: '“Every artist was first an amateur.” - Ralph Emerson',
      artist: 'https://cdn.britannica.com/38/201938-050-CDD2DF3F/Ralph-Waldo-Emerson-American-author-engraving.jpg'
    },
    {
      title: '61-80 points',
      scoring: '“There are no mistakes, just happy accidents.” -Bob ross',
      artist: 'https://thefanmail.com/wp-content/uploads/2021/11/bb5.png'
    },
    {
      title: '81-100 points',
      scoring: '“An artist cannot fail; it is a success to be one.” -Charles Cooley',
      artist: 'https://sociologysound.files.wordpress.com/2011/11/cooley.gif?w=625'
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