<template>
<div class="wrapper">
  <div class="releases">
    <div class="released" v-for="released in releases" :key="released.id">
      <div class="image">
        <img :src="'/images/movies/'+released.image">
      </div>
      <div class="bottom">
        <div class="info">
          <p>{{released.rating}}</p>
            <hr width="90%" align=center>
          <p>{{released.length}}</p>
            <hr width="90%" align=center>
          <p>{{released.genre}}</p>
          <button class="auto" @click="remove(released)">Remove</button>
        </div>
      </div>
    </div>

    <div class="watched" v-for="watched in watchedlist" :key="watched.id">
      <div class="image">
        <img :src="'/images/movies/'+watched.image">
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'WatchlistList',
  props: {
    releases: Array,
    watchedlist: Array,
  },
  methods : {
     remove : function(released) {
       released.watchlist = "Add to Watchlist";
        this.$root.$data.watchlist.splice(this.$root.$data.watchlist.indexOf(released), 1);
     },
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Verdana, Arial, sans-serif;
}

.releases {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.released {
  margin: 25px;
  background-color: #f6f6f5;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.released img {
  height: 100%;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.released .image {
  display: flex;
  margin-bottom: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  height: 500px;
  width: 340px;
}

.watched {
  margin: 25px;
}

.watched img {
  height: 100%;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.watched .image {
  display: flex;
  margin-bottom: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  height: 400px;
  width: 272px;
}

ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
}

ul > li {
    display: inline-block;
}

.info {
  width: 100%;
  text-align: center;
}

.info h1 {
  font-size: 34px;
}

.info h2 {
  font-size: 21px;
}

button {
  height: 50px;
  background: #e50b14;
  color: white;
  border: none;
  width: 100%;
  outline: none;
}
</style>
