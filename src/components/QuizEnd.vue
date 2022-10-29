<template>
  <v-overlay v-model="overlay" persistent class="d-flex justify-center align-center">

    <v-snackbar v-model="snackbar" :timeout="timeout" top color="primary" outlined rounded="pill">
      You've been Added!
      <template v-slot:action="{ attrs2 }">

        <v-spacer></v-spacer>
        <v-btn color="primary" text v-bind="attrs2" @click="snackbar = false">
          Dismiss
        </v-btn>
      </template>
    </v-snackbar>

    <v-card class="w-100 d-flex justify-center flex-column" max-width="700" color="black">
      <v-img
        src="https://th-thumbnailer.cdn-si-edu.com/1G_5HsjRKwBpgSTymPMALv4-r_Q=/1000x750/filters:no_upscale():focal(2409x1653:2410x1654)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/f3/fa/f3fa8097-4f45-4555-96de-a6cc736e6587/van_gogh_angle1_starry_night_300dpi.jpg"
        cover height="200"></v-img>

      <div class="pa-5 d-flex justify-center text-center">
        <v-card color="cyan" variant="outlined" class="pa-5 w-100">

          <p class="text-h3 text-sm-h3">You Got <span class="font-weight-bold">
              {{ percent }}
            </span>!</p>
          <p class="text-md-h5 mt-3 text-white font-italic">{{text}}</p>


          <v-card-actions class="justify-center mt-5">
            <a href="/" class="text-decoration-none text-black">
              <v-btn class="pa-20 text-white mr-3">Done </v-btn>
            </a>
            <!-- <v-btn class="pa-20 text-yellow">Save Record</v-btn> -->
            <v-dialog v-model="dialog" persistent max-width="700">
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="pa-20 text-yellow" v-bind="attrs" @click.stop="dialog = true">Save Record</v-btn>
              </template>
              <v-card color="yellow" variant="outlined">
                <v-card variant="outlined" class="pa-4 ma-2 bg-black" color="cyan">
                  <v-card-title class="text-h5 text-center text-white">
                    Player Information
                  </v-card-title>
                  <v-card-text>
                    <form ref="formX">
                      <v-text-field label="What is your Name?" solo dense class="text-white" v-model="players.name"
                        variant="filled"></v-text-field>
                    </form>

                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="white" text @click="dialog = false">
                      Cancel
                    </v-btn>
                    <v-btn color="yellow" text @click="savePlayer">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>

              </v-card>
            </v-dialog>
            <v-btn @click="$emit('restartQuiz')" class="pa-20 text-cyan">Play Again</v-btn>

          </v-card-actions>

        </v-card>

      </div>

    </v-card>

  </v-overlay>

</template>
<script>
  import {
    collection,
    addDoc,
  } from "firebase/firestore";
  import db from '@/firebase';
  export default {
    props: ['percent'],
    data: () => ({
      overlay: true,
      card: true,
      text: '',
      dialog: false,

      players: {
        name: '',
        score: '',
      },

      //snackbar
      snackbar: false,
      timeout: 3000,


    }),
    watch: {
      overlay(val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 2000)
      },
    },
    created() {
      if (this.percent >= 81 && this.percent <= 100) {
        this.text = '“An artist cannot fail; it is a success to be one.” -Charles Cooley';
      } else if (this.percent >= 61 && this.percent <= 80) {
        this.text = '“There are no mistakes, just happy accidents.” -Bob ross';
      } else if (this.percent >= 41 && this.percent <= 60) {
        this.text = '“Every artist was first an amateur.” - Ralph Emerson';
      } else if (this.percent >= 20 && this.percent <= 40) {
        this.text = '“Great things are done by a series of small things brought together.” - Vincent Van Gogh';
      } else if (this.percent >= 0 && this.percent <= 19) {
        this.text = '“Where the spirit does not work with the hand, there is no art.” -Leonardo da Vinci';
      }
      this.players.score = this.percent;
    },
    methods: {
      async savePlayer() {
        await addDoc(collection(db, "players"), {
          name: this.players.name,
          score: this.players.score
        })

        this.$refs.formX.reset();
        this.dialog = false;
        console.log("Success");
        //this.$router.push('/rankings')
        this.snackbar = true;
      },
    }
  }
</script>
<style>

</style>