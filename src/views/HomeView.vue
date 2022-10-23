<template>
  <div class="screen-bg">

    <div class="d-flex justify-start align-center text-center text-white flex-column pt-md-16 h-screen pt-16">
      <v-col cols="12" sm="9" md="8" lg="7" class="d-flex justify-md-center justify-start pt-16 justify-sm-center pt-md-16 flex-column ">
        <p class="font-italic text-cyan">"Go out and paint the stars." <span
            class="text-caption font-weight-thin">-Vincent Van
            Gogh 🌟</span></p>
        <p class="text-h3 font-weight-black mb-5">There's only one art, knowledge.</p>
        <p class="text-sm-subtitle-1 text-caption"> Test your art knowledge and prove how cultured you are by taking
          <img src="../assets/artemind-logo.svg" alt="" class="">. Test yourself on a range of subjects from music to
          visual arts to its artists. And best of all; get ready for an amazing art knowledge experience. Are you a
          connoisseur? or are you just not sure?</p>
        <p class="text-subtitle-2 mt-5 font-italic text-cyan">Be sure to read the '<span class="text-white">more
            info</span>' before playing!</p>
        <div class="d-flex justify-center mt-2 flex-column flex-sm-row">

          <v-btn prepend-icon="mdi-palette" variant="outlined" size="x-large" class="mr-sm-4 mb-3" :loading="loading[1]"
            :disabled="loading[1]" @click="load(1)">
            Play Now
          </v-btn>

          <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" @click.stop="dialog = true" prepend-icon="mdi-information" variant="tonal"
                size="x-large" color="white">
                More Info
              </v-btn>
            </template>
            <v-card variant="tonal" color="black" class="">
              <v-toolbar color="black">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>🌟 More Information</v-toolbar-title>
              </v-toolbar>
              <div class="d-flex justify-center align-center h-screen flex-wrap overflow-auto">
                <v-card v-for="mech in mechs" :key="mechs.desc"  height="200" color="black"
                  class=" text-h5 pa-2 pa-md-5 ma-2 d-flex align-center justify-center flex-column" >
                  <v-card variant="outlined" color="cyan" class="d-flex align-center justify-center flex-column pa-md-4 text-center pa-2">
                    <v-icon :icon="mech.icon" size="x-large" color="white"></v-icon>
                  <p>{{ mech.desc }}</p>
                  </v-card>
                  
                </v-card>
              </div>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
    </div>
  </div>
</template>

<script setup>
  import {
    ref,
    onMounted
  } from 'vue';

  import {
    useRouter,
    useRoute
  } from 'vue-router'
  const loading = ref([]);
  const router = useRouter();
  const dialog = ref(false);
  const mechs = ref([{
      desc: 'Everything about Art',
      icon: 'mdi-palette'
    },
    {
      desc: '10 Randomly Generated Questions',
      icon: 'mdi-chat-question'
    },
    {
      desc: 'Easy, Medium, Hard',
      icon: 'mdi-gamepad-circle'
    },
    {
      desc: '10 Seconds per Question',
      icon: 'mdi-clock-time-eight'
    },
    {
      desc: 'Quiz will end if not answered within time frame',
      icon: 'mdi-lastpass'
    },
    {
      desc: 'Scores will only add up on correct answers',
      icon: 'mdi-checkbox-marked-circle'
    },
    {
      desc: 'If correct, the question box will light green. Otherwise, it will be red.',
      icon: 'mdi-checkbox-marked-circle'
    },


  ])

  function load(i) {
    loading.value[i] = true;
    setTimeout(() => {
      loading.value[i] = false;
      router.push('/quiz');
    }, 3000);

  }
</script>

<style scoped>
  .screen-bg {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.10)), url("https://assets-metrostyle.abs-cbn.com/prod/metrostyle/attachments/33d245f3-98d0-4ea9-b129-98db9a053429_vangoghalive-article-banner%20image.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
  }
</style>