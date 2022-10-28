<template lang="">
    <div class="pa-16">
        <p>Register User</p>
        <v-text-field label="Email address" placeholder="johndoe@gmail.com" type="email" v-model="email">
        </v-text-field>
        <v-text-field label="Password" placeholder="123456" type="input" v-model="password"></v-text-field>
        <v-btn flat color="secondary" @click="register">
            Register
        </v-btn>
        <v-btn flat color="primary" @click="googlesign">
            Sign In with Google
        </v-btn>
        
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
    signInWithPopup(getAuth(), provider).then((result)=>{
        console.log(result.user);
        router.push("/about");
    }).catch((error) => {
        
    });
};

</script>

<style lang="">

</style>