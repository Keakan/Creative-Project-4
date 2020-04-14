<template>
<div id="app">
  <div id="menu">
    <div id="brand">
      <router-link to="/">
        <img src="/images/logo.png">
      </router-link>
    </div>

    <div id="side">
      <router-link to="/upcoming">
        <div class="menu-item">
          <h1>Upcoming</h1>
        </div>
      </router-link>
      <router-link to="/">
        <div class="menu-item">
          <h1>Released</h1>
        </div>
      </router-link>
      <router-link to="/watchlist">
        <div class="menu-item">
          <h1>Watchlist</h1>
        </div>
      </router-link>

      <router-link to="/comments">
        <div class="menu-item">
          <h1>Comments</h1>
        </div>
      </router-link>
    </div>

  </div>
  <router-view />
</div>
</template>

<script>
export default {
  name: 'App',
 computed: {
 numberOfItems() {
   return this.$root.$data.shoppingCartItems;
   }
 },
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 50px 100px;
}

#menu a {
  color: black;
  text-decoration: none;
}

#brand {
  grid-area: brand;
  display: flex;
  justify-content: center;
}

#brand img {
  height: 200px;
}

#side {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

#side h1 {
  font-size: 35px;
}

.menu-item {
  margin-left: 35px;
  margin-right: 35px;
  display: flex;
  flex-direction: column;
}

.menu-item p {
  margin: 0px;
}




@media screen and (max-width: 481px){
* {
  box-sizing: border-box;
}

body {
  margin: 10vw 20vw;
}

#menu a {
  color: black;
  text-decoration: none;
}

#brand {
  grid-area: brand;
  display: flex;
  justify-content: center;
}

#brand img {
  height: 20vw;
}

#side {
  display: flex;
  justify-content: center;
}

#side h1 {
  font-size: 7vw;
}

.menu-item {
  margin-left: 5vw;
  margin-right: 5vw;
  display: flex;
  flex-direction: column;
}

.menu-item p {
  margin: 0px;
}
}
</style>
