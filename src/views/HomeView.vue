<template>
  <div class="screen-bg">

    <div class="d-flex justify-start align-center text-center text-white flex-column pt-md-16 h-screen pt-16">
      <v-col cols="12" sm="9" md="8" lg="7"
        class="d-flex justify-md-center justify-start pt-16 justify-sm-center pt-md-16 flex-column ">
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

        <!-- upload photo -->
        <!-- <v-card-text class="d-flex justify-center">
          <v-avatar rounded size="120" class="me-6">
            <v-img :src="itemImage"></v-img>

          </v-avatar>

          <div>
            <v-btn color="primary" class="me-3 mt-5" @click="$refs.refInputEl.click();">
              <span class="d-none d-sm-block">{{ uploadBtnText }}</span>
            </v-btn>

            <input ref="refInputEl" @change="uploadItemImage" type="file" accept=".jpeg,.png,.jpg,GIF" :hidden="true" />

            <p class="text-sm mt-5">
              Allowed JPG, GIF or PNG. Max size of 1MB
            </p>
          </div>
        </v-card-text> -->

        <!-- <v-text-field label="Player Name" solo dense class="" v-model="players.playerName"></v-text-field>
        <v-text-field label="Player Score" solo dense class="" v-model="players.playerScore"></v-text-field>
        <v-btn @click="addPlayers" variant="tonal" size="large">Save Player</v-btn> -->

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
                <v-card v-for="mech in mechs" :key="mechs.desc" height="200" color="black"
                  class=" text-h5 pa-2 pa-md-5 ma-2 d-flex align-center justify-center flex-column">
                  <v-card variant="outlined" color="cyan"
                    class="d-flex align-center justify-center flex-column pa-md-4 text-center pa-2">
                    <v-icon :icon="mech.icon" size="x-large" color="white"></v-icon>
                    <p>{{ mech.desc }}</p>
                  </v-card>

                </v-card>
              </div>
            </v-card>
          </v-dialog>
        </div>

        <!-- <v-table fixed-header height="300px" color="black">
          <thead>
            <tr>
              <th class="text-center">
                Avatar
              </th>
              <th class="text-center">
                Nickname
              </th>
              <th class="text-center">
                Score
              </th>
              <th class="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="">
            <tr v-for="player in players" :key="player.playerName">
              <td>
                <v-img :src="player.playerAvatar" width="50"></v-img>
              </td>
              <td>{{ player.playerName }}</td>
              <td>{{ player.playerScore }}</td>
              <td>
              <v-btn color="primary" class="mr-2">Edit</v-btn>
                <v-btn color="error">Delete</v-btn> 
                <v-dialog v-model="editDialog" persistent max-width="700">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" @click="editPlayer(player)">
                      Edit
                    </v-btn>
                  </template>
                  <v-card>
                    <p>Edit Player</p>
                    <v-card-text class="d-flex justify-center">
                      <v-avatar rounded size="120" class="me-6">
                        <v-img :src="itemImage"></v-img>

                      </v-avatar>

                      <div>
                        <v-btn color="primary" class="me-3 mt-5" @click="$refs.refInputEl.$refs.refInputEl2.click();">
                          <span class="d-none d-sm-block">{{ uploadBtnText }}</span>
                        </v-btn>

                        <input ref="refInputEl2" @change="uploadItemImage" type="file" accept=".jpeg,.png,.jpg,GIF"
                          :hidden="true" />

                        <p class="text-sm mt-5">
                          Allowed JPG, GIF or PNG. Max size of 1MB
                        </p>
                      </div>
                    </v-card-text>
                    <v-text-field label="Player Name" solo dense class="" v-model="players.playerName"></v-text-field>
                    <v-text-field label="Player Score" solo dense class="" v-model="players.playerScore"></v-text-field>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="editDialog = false">
                        Cancel
                      </v-btn>
                      <v-btn color="green darken-1" text @click="editDialog = false">
                        Save and Play
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </td>
            </tr>

          </tbody>
        </v-table> -->


      </v-col>
    </div>
  </div>
</template>

<script setup>
  import {
    ref,
    reactive,
    onMounted
  } from 'vue';

  import {
    useRouter,
    useRoute
  } from 'vue-router';

  // import {
  //   collection,
  //   addDoc,
  //   getDocs,
  //   onSnapshot,
  //   doc
  // } from "firebase/firestore";
  // import db from '@/firebase';
  // import {
  //   getStorage,
  //   uploadBytes,
  //   ref as ref_storage,
  //   uploadBytesResumable,
  //   getDownloadURL
  // } from "firebase/storage";
  // const itemImage = ref('https://assumptaclinic.com/wp-content/uploads/2022/10/default-assumpta.jpg');

  const loading = ref([]);
  const router = useRouter();
  const dialog = ref(false);
  //const editDialog = ref(false);
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


  //store 
  // const players = ref({
  //   playerAvatar: itemImage.value,
  //   playerName: 'Tintin',
  //   playerScore: 5,
  // })

  //  uploadLoading: false,
  //uploadBtnText: "Upload new photo",

  const uploadLoading = ref(false);
  const uploadBtnText = ref('Upload Avatar');



  function load(i) {
    loading.value[i] = true;
    setTimeout(() => {
      loading.value[i] = false;
      router.push('/quiz');
    }, 3000);
  }


  // async function addPlayers() {

  //   await addDoc(collection(db, "players"), {
  //     playerAvatar: itemImage.value,
  //     playerName: players.value.playerName,
  //     playerScore: players.value.playerScore
  //   })
  //   console.log("Success")
  // }

  // async function showPlayers() {
  //   onSnapshot(collection(db, "players"), (snapshot) => {
  //     let playerz = []
  //     snapshot.forEach((doc) => {
  //       playerz.push({
  //         ...doc.data(),
  //         id: doc.id
  //       })
  //     });
  //     players.value = playerz;
  //     //console.log(players.value)
  //   })
  // }

  // onMounted(() => {
  //   showPlayers()
  // })

  // function uploadItemImage(e) {
  //   let file = e.target.files[0];
  //   const storage = getStorage();
  //   const storageRef = ref_storage(storage, 'avatars/' + file.name);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   uploadTask.on('state_changed',
  //     (snapshot) => {
  //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       //this.uploadBtnText = "Uploading: " + progress.toFixed(0) + '%';
  //       uploadBtnText.value = "Uploading: " + progress.toFixed(0) + '%';
  //       //uploadBtnTextMobile.value = 'mdiProgressDownload';
  //       //this.uploadBtnTextMobile = "Uploading: " + progress.toFixed(0) + '%';

  //       switch (snapshot.state) {
  //         case 'paused':
  //           console.log('Upload is paused');
  //           break;
  //         case 'running':
  //           console.log('Upload is running');
  //           break;
  //       }
  //     },
  //     (error) => {

  //     },
  //     () => {
  //       uploadBtnText.value = 'Uploaded Successfully';

  //       //uploadBtnTextMobile.value = 'mdiCheckCircle';
  //       //this.uploadBtnTextMobile = 'Photo Uploaded';
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         console.log('File available at', downloadURL);
  //         itemImage.value = downloadURL;
  //       });


  //     }
  //   );
  // }

  // const docRef = ref(null);
  // async function editPlayer(player){
  //   players.value = Object.assign({}, player);
  //   const playerID = this.players.id;
  //   docRef.value = doc(collection(db, "players"), playerID);
  //   editDialog.value = true;
  // }
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