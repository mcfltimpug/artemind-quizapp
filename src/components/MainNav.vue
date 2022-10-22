<template>
    <!-- <nav>
        <v-toolbar app class="py-2 mb" color="black">
            <v-toolbar-title class="pa-9">
                <a href="/"><img src="@/assets/artemind-logo.svg" alt="" height="20"></a>
            </v-toolbar-title>

            <div v-if="windowNav" class="d-flex">
                <v-list-item v-for="item in items" :key="item.title" router :to="item.path">
                    <v-list-item-title class="">{{ item.title }}</v-list-item-title>

                </v-list-item>
            </div>
            <h1 class="" style="display:none;" >{{ type + ": " + width }}</h1>

            <v-menu open-on-hover v-if="mobileNav">
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
                </v-list>

            </v-menu>
        </v-toolbar>
    </nav> -->
    <nav>
        <v-toolbar app class="py-2 mb" color="black">
            <v-toolbar-title class="pa-9">
                <a href="/"><img src="@/assets/am-logo.svg" alt="" height="70"></a>
            </v-toolbar-title>

            <div class="d-flex">
                <v-list-item v-for="item in items" :key="item.title" router :to="item.path" class="hidden-sm-and-down">
                    <v-list-item-title class="">{{ item.title }}</v-list-item-title>

                </v-list-item>
            </div>
            <!-- <h1 class="" style="display:none;" >{{ type + ": " + width }}</h1> -->

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
                </v-list>

            </v-menu>
            </div>
            
        </v-toolbar>
    </nav>
   
</template>

<script setup>
import { ref } from 'vue';

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
        // {
        //     title: 'Quiz',
        //     path: '/quiz'
        // },
        {
            title: 'About',
            path: '/about'
        },
        {
            title: 'Developer',
            path: '/developer'
        },

    ])

    // const mobileNav = ref(false);
    // const windowNav = ref(false);

    // function toggleDrawer() {
    //     return drawer.value = !drawer.value
    // }

    // function useBreakpoints() {
    //     let windowWidth = ref(window.innerWidth)

    //     const onWidthChange = () => windowWidth.value = window.innerWidth
    //     onMounted(() => window.addEventListener('resize', onWidthChange))
    //     onUnmounted(() => window.removeEventListener('resize', onWidthChange))

    //     const type = computed(() => {
    //         if (windowWidth.value < 550) {
    //             mobileNav.value = true;
    //             windowNav.value = false;
    //         }
    //         if (windowWidth.value >= 550 && windowWidth.value < 1200) {
    //             mobileNav.value = false;
    //             windowNav.value = true;
    //         }
    //         if (windowWidth.value >= 1200) {
    //             mobileNav.value = false;
    //             windowNav.value = true;
    //         }
    //         return null;
    //     })

    //     const width = computed(() => windowWidth.value)

    //     return {
    //         width,
    //         type
    //     }
    // }

    // const {
    //     width,
    //     type
    // } = useBreakpoints();

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