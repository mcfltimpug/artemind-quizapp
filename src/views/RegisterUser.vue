<template lang="">
     <div class="screen-bg">
        <div class="d-flex justify-start align-center text-center text-white flex-column h-screen pt-sm-5 ">
            <v-col cols="12" sm="9" md="8" lg="7" class="d-flex justify-center flex-column">
                <v-card variant="outlined" class="pa-sm-4 pa-2">
                    <v-card variant="outlined" class="bg-black">
                        <v-img
                            src="https://assets-metrostyle.abs-cbn.com/prod/metrostyle/attachments/33d245f3-98d0-4ea9-b129-98db9a053429_vangoghalive-article-banner%20image.jpg"
                            height="150px" cover>
                            <div class="d-flex flex-column justify-center align-center h-100">
                                <img src="@/assets/artemind-logo.svg" alt="" class="w-50">
                                <h1 class="text-center text-sm-subtitle-2  text-caption font-weight-black">THERE IS ONLY
                                    ONE ART,
                                    KNOWLEDGE.
                                </h1>
                            </div>

                        </v-img>
                        <div class="ma-5">
                            <p class="text-sm-h5  text-subtitle-1 font-weight-bold "> 🌟 Player Register 🌟</p>
                        </div>
                        <div class="mx-sm-12 mx-4">
                            <v-form ref="signForm" v-model="valid" lazy-validation>
                                <v-text-field label="Email address" placeholder="johndoe@gmail.com" type="email"
                                    v-model="email"
                                    :rules="[v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid',]"
                                    required>
                                </v-text-field>
                                <v-text-field label="Password" placeholder="123456" type="password" v-model="password"
                                    :rules="[v => !!v || 'Password is required', v => (v && v.length >= 6) || 'Password must be greater than 6 characters']"
                                    required>
                                </v-text-field>
                            </v-form>

                        </div>
                       
                        <div class="mx-auto mb-5">
                            <v-btn color="white" @click="register" size="large" variant="outlined" :disabled="!valid">
                                Register
                            </v-btn>
                            <v-divider class="mt-5 mb-1 mx-sm-12 mx-5" color="yellow"></v-divider>
                            <p class="text-caption text-sm-subtitle-2">Already have an account? <a href="/signin"
                                    class="text-decoration-none text-yellow"><span>Sign In</span></a></p>
                            <p class="my-3">OR</p>
                            <v-btn color="cyan" @click="googlesign" prepend-icon="mdi-google" variant="outlined">
                                Sign In with Google
                            </v-btn>
                        </div>
                    </v-card>
              </v-card>
            </v-col>
        </div>
    </div>
</template>
<script setup>

import {ref} from 'vue';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
    collection,
    addDoc,doc, setDoc
  } from "firebase/firestore";
  import db from '@/firebase';
import { useRouter } from 'vue-router';
import router from '@/router';

const email = ref('');
const password = ref('');
const valid = ref(true);

const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value).then(async (userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("Successfully Registered User: " + user.uid);

    await setDoc(doc(db, "users", user.uid), {
            email: user.email,
        })
    router.push('/')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode + ' ' + errorMessage);
    // ..
  });
};

const googlesign = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(getAuth(), provider).then((result) => {
            console.log(result.user);
            router.push("/signin");
        }).catch((error) => {

        });
    };

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