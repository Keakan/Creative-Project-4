<template>
<div>
  <hr width="90%" align=center>
  <div class="wrapper">
    <div class="search">
      <form class="pure-form">
        <i class="fas fa-search"></i><input v-model="searchText" />
      </form>
    </div>
  </div>
  <div class="pure-menu pure-menu-horizontal">
    <ul class="pure-menu-list">
    <li class="pure-menu-item"><a @click="select('all')" href="#" class="pure-menu-link">All</a></li>
      <li class="pure-menu-item"><a @click="select('Captain America')" href="#" class="pure-menu-link">Captain America</a></li>
      <li class="pure-menu-item"><a @click="select('Iron Man')" href="#" class="pure-menu-link">Iron Man</a></li>
      <li class="pure-menu-item"><a @click="select('Thor')" href="#" class="pure-menu-link">Thor</a></li>
      <li class="pure-menu-item"><a @click="select('Hulk')" href="#" class="pure-menu-link">Hulk</a></li>
      <li class="pure-menu-item"><a @click="select('Spider-Man')" href="#" class="pure-menu-link">Spider-Man</a></li>
      <li class="pure-menu-item"><a @click="select('Ant-Man')" href="#" class="pure-menu-link">Ant-Man</a></li>
      <li class="pure-menu-item"><a @click="select('Black Panther')" href="#" class="pure-menu-link">Black Panther</a></li>
      <li class="pure-menu-item"><a @click="select('Avengers')" href="#" class="pure-menu-link">Avengers</a></li>
      <li class="pure-menu-item"><a @click="select('Captain Marvel')" href="#" class="pure-menu-link">Captain Marvel</a></li>
      <li class="pure-menu-item"><a @click="select('Guardians')" href="#" class="pure-menu-link">Guardians of the Galaxy</a></li>
    </ul>
  </div>
  <ReleasedList :releases="releases" />
</div>
</template>

<script>
import ReleasedList from "../components/ReleasedList.vue"
export default {
  name: 'Released',
  components: {
    ReleasedList
  },
  data() {
   return {
     searchText: '',
     group: 'all',
   }
 },
 computed: {
 releases() {
     if (this.group !== 'all')
        return this.$root.$data.releases.filter(released => released.group === this.group);
     else
        return this.$root.$data.releases.filter(released => released.name.toLowerCase().search(this.searchText) >= 0);
   }
 },
 methods: {
   select(group) {
     this.group = group;
   }
 }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
}

.pure-menu {
  display: flex;
  align-items: center;
  justify-content: center;
}

form {
  display: table;
  width: 100%;
}

i {
  display: table-cell;
  padding-left: 10px;
  width: 1px;
}

input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
}







@media screen and (max-width: 481px){

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
    display: flex;
    flex-wrap: wrap;
}

.search {
  border: 1px solid #ccc;
}

.pure-menu {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pure-menu-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

form {
  display: table;
  width: 100%;
}

i {
  display: table-cell;
}

input {
  display: table-cell;
  border: none !important;
  box-shadow: none !important;
}
}

</style>
