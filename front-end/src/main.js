import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mock from './mock-data.js'
import upcoming from './upcoming-data.js'

Vue.config.productionTip = false

let data = {
  releases: mock,
  upcomingMovies: upcoming,
  watchlist: [],
  watchedlist: [],
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
