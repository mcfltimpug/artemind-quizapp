<template lang="">
    <div class="screen-bg">
        <div class="d-flex justify-center align-center text-center text-white flex-column">
            <v-col cols="12" sm="9" md="8" lg="7" class="d-flex justify-center flex-column">
                <div class="d-flex justify-center flex-column align-center pa-8">
                    <img src="../assets/artemind-logo.svg" alt="" class="w-50">
                    <p class="text-white text-h5">🌟 Developer</p>
                </div>
                <div class="d-flex justify-center flex-column align-center px-4 px-md-8">
                    <v-card variant="outlined" color="white"
                        class="pa-3 d-flex justify-center align-center flex-column mb-2">
                        <v-img class="bg-white" width="200" aspect-ratio="1"
                            src="https://i.ibb.co/6FgtB9z/developer.jpg" cover></v-img>
                        <p class="text-h5 mt-4">Christine Faith Timpug</p>
                        <p>Technological Institute of the Philippines - Manila</p>

                    </v-card>
                    <v-card variant="tonal" color="white" class="pa-3 text-center mb-2 d-flex">🌟 Technologies Used
                    </v-card>
                    <v-expansion-panels>
                        <v-expansion-panel v-for="tech in techs" :key="techs.title" :title="tech.title"
                            :text="tech.desc" color="black" class="mb-2">
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
    ]);

    const techs = ref([{
            title: 'Vue 3 as Main Framework',
            desc: 'Vue is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS and JavaScript, and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be it simple or complex.'
        },
        {
            title: 'Vuetify as CSS Framework',
            desc: 'Vuetify is a Vue UI Library with beautifully handcrafted Material Components. No design skills required — everything you need to create amazing applications is at your fingertips. '
        },
        {
            title: 'Vite as Running Environment',
            desc: 'Vite is a build tool created by Evan You, the creator of Vue. It allows for faster development thanks to super fast Hot Module Reload (HMR), fast cold start times, and CSS + JSX + TypeScript support out of the box. '
        },
        {
            title: 'Github as Repository',
            desc: 'GitHub is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere.'
        },
        {
            title: 'Azure for Deployment',
            desc: 'Microsoft Azure, formerly known as Windows Azure, is Microsofts public cloud computing platform. It provides a broad range of cloud services, including compute, analytics, storage and networking.'
        },

    ])
</script>
<style scoped>
    .screen-bg {
        /* background: linear-gradient(0deg, rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.10)), url("https://images.summitmedia-digital.com/spotph/images/2019/10/25/van-gogh-alive-9-1572001622.jpg"); */
        background: linear-gradient(0deg, #237E9B, black);
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 100%;
    }
</style>