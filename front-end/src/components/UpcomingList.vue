<template>
<div class="wrapper">
  <div class="upcomingMovies">
    <div class="upcoming" v-for="upcoming in upcomingMovies" :key="upcoming.id">
      <div class="image">
        <img :src="'/images/movies/'+upcoming.image">
      </div>
      <div class="bottom">
        <div class="info">
          <p>{{upcoming.genre}}</p>
          <p><i>Release Date: {{upcoming.release}}</i></p>
          <button class="watch" @click="watchList(upcoming)">{{upcoming.watchlist}}</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'UpcomingList',
  props: {
    upcomingMovies: Array
  },
  methods : {
     watchList : function(released) {
        if(released.watchlist === "In Watchlist")
        {
          released.watchlist = "Add to Watchlist";
          this.$root.$data.watchlist.splice(this.$root.$data.watchlist.indexOf(released), 1);
        }
        else
        {
          released.watchlist = "In Watchlist";
          this.$root.$data.watchlist.push(released);
        }
     }
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

.upcomingMovies {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.upcoming {
  margin: 25px;
  background-color: #f6f6f5;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.upcoming img {
  height: 100%;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.upcoming .image {
  display: flex;
  justify-content: left;
  margin-bottom: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  height: 500px;
  width: 340px;
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
