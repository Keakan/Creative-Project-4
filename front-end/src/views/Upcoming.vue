<template>
<div>
  <hr width="90%" align=center>
  <div class="wrapper">
    <h1>UPCOMING RELEASES:</h1>
  </div>
  <UpcomingList :upcomingMovies="upcomingMovies" />
</div>
</template>

<script>
import UpcomingList from "../components/UpcomingList.vue"
export default {
  name: 'Upcoming',
  components: {
    UpcomingList
  },
  data() {
    return {
      country: '',
    }
  },
  computed: {
    upcomingMovies() {
      return this.$root.$data.upcomingMovies;
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
