<template>
<div>
  <hr align="center" width="80%">
  <div class="wrapper">
    <h1>{{watchListMovies}}</h1>
  </div>
  <WatchlistList :releases="releases" />
  <hr width="90%" align=center>
  <div class="wrapper">
    <h1>{{watchedMovies}}</h1>
  </div>
  <WatchlistList :watchedlist="watchedlist" />
</div>
</template>

<script>
import WatchlistList from "../components/WatchlistList.vue"
export default {
  name: 'Wishlist',
  components: {
    WatchlistList
  },
 computed: {
 watchListMovies() {
    if (this.$root.$data.watchlist.length > 0)
      return 'YOUR WATCHLIST:';
    else
      return 'THERE IS NOTHING IN YOUR WATCHLIST';
   },
 watchedMovies() {
    if (this.$root.$data.watchedlist.length > 0)
      return 'WATCH AGAIN';
    else
      return 'YOU HAVE NOT WATCHED ANYTHING';
   },
 releases() {
      return this.$root.$data.watchlist.filter(movie => movie.name.toLowerCase().search(this.searchText) >= 0);
   },
 watchedlist() {
      return this.$root.$data.watchedlist.filter(movie => movie.name.toLowerCase().search(this.searchText) >= 0);
   }
 },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
hr{
 margin: 0;
}
</style>
