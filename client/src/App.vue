<template>
  <div id="app" class="app-container">
    <main-header />
		<list :showList="showList"/>
  </div>
</template>

<script>
import Header from './components/layout/Header'
import List from './components/list/List'

export default {
  name: 'App',
	data(){
		return {
      showList: true ,
		}
	},
  components: {
    'main-header': Header ,
    'list': List,
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

.app-container {
  max-width: 680px;
  margin:0 auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
