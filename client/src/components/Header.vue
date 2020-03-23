<template>
  <div>
      <ul>
          <router-link to='/' tag='li' active-class='active' exact> List </router-link>
          <router-link to='/today' tag='li' active-class='active'> Today</router-link>
          <router-link to='/scheduled' tag='li' active-class='active'> Scheduled </router-link>
      </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: rgb(209, 237, 241);
   text-align: center;
}

li {
  float:left;
}

li {
  display: block;
  color: black;
  font-weight: bold;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
 
}

li .active {
  background-color: rgb(103, 232, 236);
}

.active {
  background-color: rgb(148, 240, 243);
  border-radius: 5px;
  }
</style>