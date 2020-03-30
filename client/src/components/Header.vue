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
  /* background-color: rgb(209, 237, 241); */
  background-color: lightgrey;
  text-align: center;
}

li {
  display: block;
  color: black;
  font-weight: bold;
  text-align: center;
  /* padding: 14px 16px; */
  padding: 0.8rem;
  text-decoration: none;
  float:left;
}

li .active {
  /* background-color: rgb(103, 232, 236); */
  background-color: gray;
}

.active {
  /* background-color: rgb(148, 240, 243); */
  background-color:#80808057;
  border-radius: 5px;
  }
</style>