<template>
  <div id="app" class="app-container">
    <h2> {{ getVheader }} </h2>
    <hr>
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
    computed: {
    ...mapGetters(['getVheader']),
   },
  components: {
     appHeader: Header,
  }
}
</script>

<style>
#app {
  font-family:  Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 5rem;
  font-size:1rem;
}
* {
  box-sizing: border-box;
}
.app-container {
  max-width: 680px;
  margin:0 auto;
}
</style>
