<template>
    <nav>
        <v-toolbar app class="py-2 mb" color="black">
            <v-toolbar-title class="pa-9">
                <a href="/"><img src="@/assets/am-logo.svg" alt="" height="70"></a>
            </v-toolbar-title>

            <div class="d-flex">
                <v-list-item v-for="item in items" :key="item.title" router :to="item.path" class="hidden-sm-and-down">
                    <v-list-item-title class="">{{ item.title }}</v-list-item-title>

                </v-list-item>
                <v-list-item  class="hidden-sm-and-down">
                    <v-btn  color="yellow" @click="goToSignIn">Sign In</v-btn>
                </v-list-item>
                <v-list-item v-if="isLoggedIn" class="hidden-sm-and-down">
                    <v-btn @click="signOutz">Sign Out</v-btn>
                </v-list-item>
            </div>

            <div class="hidden-md-and-up">
<v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                    <v-btn color="cyan" x-large v-bind="props">
                        <v-spacer></v-spacer>
                        <v-icon large color="cyan">
                            mdi-arrow-down-bold-box-outline
                        </v-icon>
                    </v-btn>
                </template>

                <v-list class="bg-black hover:black">

                    <v-list-item v-for="(item, index) in items" :key="index" router :to="item.path"
                        :prepend-icon="item.icon">
                        <v-list-item-title class="">{{ item.title }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="!isLoggedIn" >
                    <v-btn  @click="goToSignIn" color="yellow">Sign In</v-btn>
                    </v-list-item>
                    <v-list-item v-if="isLoggedIn" >
                    <v-btn @click="signOutz" color="cyan">Sign Out</v-btn>
                    </v-list-item>
                </v-list>

            </v-menu>
            </div>
            
        </v-toolbar>
    </nav>
   
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import router from '@/router';

const isLoggedIn = ref(false);


    // import {
    //     computed,
    //     onMounted,
    //     onUnmounted,
    //     ref
    // } from "vue";

    // const toggleMenu = ref(false);

    // const drawer = ref(false)
    const items = ref([{
            title: 'Home',
            path: '/'
        },
        {
            title: 'Rankings',
            path: '/rankings'
        },
        {
            title: 'About',
            path: '/about'
        },
        {
            title: 'Developer',
            path: '/developer'
        },

    ]);

    let auth;
    onMounted(() => {
        auth = getAuth();
        onAuthStateChanged(auth, (user) =>{
            if(user){
                isLoggedIn.value = true;
            }else{
                isLoggedIn.value = false;
            }
        });
    });

    const signOutz = () => {
        signOut(auth).then(() => {
            router.push("/signin")
        });
    }

    const goToSignIn = () => {
        router.push("/signin")
    }
</script>

<style scoped>
    .bg-screen {
        /* From https://css.glass */
        background: rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.3);
    }

    @media only screen and (max-width: 767px) {
        .mobileNav {
            display: none;
        }
    }
</style>