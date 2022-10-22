<template>
  <v-app>
    <v-main>
      <MainNav />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
  import MainNav from '@/components/MainNav.vue'
  export default {
    name: 'App',

    data: () => ({
      //
    }),

    components: {
      MainNav
    }
  }
</script>
<style>

</style>