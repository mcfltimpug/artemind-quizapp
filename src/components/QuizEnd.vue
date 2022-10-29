<template>
  <v-overlay v-model="overlay" persistent class="d-flex justify-center align-center">

    <v-snackbar v-model="snackbar" :timeout="timeout" top color="cyan" outlined rounded="pill">
      <v-icon>mdi-check</v-icon>
      Score Successfully Updated!
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
          <p>Recorded Score: {{ dbScore }}</p>
          <p class="text-md-h5 mt-3 text-white font-italic">{{text}}</p>

          <v-card-actions class="justify-center mt-5">
            <a href="/" class="text-decoration-none text-black">
              <v-btn class="pa-20 text-white mr-3">Done </v-btn>
            </a>
            <v-btn class="pa-20 text-yellow" @click="saveRecord">Save Record</v-btn>
            <v-btn @click="$emit('restartQuiz')" class="pa-20 text-cyan">Play Again</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-card>
  </v-overlay>

</template>
<script>
  import {
    doc,
    getDoc,
    updateDoc
  } from "firebase/firestore";
  import db from '@/firebase';
  import {
    getAuth,
    onAuthStateChanged
  } from '@firebase/auth';
  import {
    ref
  } from 'vue'

  const userid = ref('');

  export default {
    props: ['percent'],
    data: () => ({
      overlay: true,
      card: true,
      text: '',

      players: {
        name: '',
        score: '',
      },

      //snackbar
      snackbar: false,
      timeout: 3000,

      dbScore: 0,


    }),
    watch: {
      overlay(val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 2000)
      },
    },
    created() {
      this.initialize();

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
      async initialize() {
        let auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            userid.value = user.uid;

            //console.log(userid.value)
            const docRef = doc(db, "users", userid.value);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              // console.log("Document data:", docSnap.data().score);
              this.dbScore = docSnap.data().score;
              console.log("Database Score:" + this.dbScore)
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }

          }
        });
      },
      async saveRecord() {
        await updateDoc(doc(db, "users", userid.value), {
          score: this.players.score
        })
  
        console.log("Successfully Saved!");
        this.snackbar = true;
      },
    }
  }
</script>
<style>

</style>