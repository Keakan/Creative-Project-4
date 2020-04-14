<template>
<div>
  <hr width="90%" align=center>
  <div class="wrapper">
    <h1>COMMENTS:</h1>
  </div>
  <section class="image-gallery">
    <div class="released" v-for="post in posts" :key="post.id">
      <div class="image">
        <img :src="'/images/movies/'+post.path">
        <div class="info" v-if="!findItem">
          <ul class="title">
            <li><h1>{{post.title}}</h1></li>
            <li><button class="buy" @click="selectItem(post)"> Edit Post </button></li>
            <li><button @click="deleteItem(post)"> Delete Post </button></li>
          </ul>
          <h2><i>Posted by: {{post.author}}</i></h2>
          <p>{{post.comment}}</p>
        </div>

        <div class="info" v-if="findItem">
          <ul class="title">
            <li><h1>{{findItem.title}}</h1></li>
            <li><button @click="editItem(findItem)"> Submit </button></li>
          </ul>
          <ul class="title">
            <li><h2><i>Posted by:</i></h2></li>
            <li><input v-model="findItem.author"></li>
          </ul>
          <textarea id="textarea" v-model="findItem.comment" placeholder="Comment"></textarea>
        </div>

      </div>
    </div>
  </section>
</div>
</template>


<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.releases {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.released {
  margin: 25px;
  width: 100%;
  margin-top: 50px;
  padding: 5px;
  width: 100%;
  flex-wrap: wrap;
  background-color: #f6f6f5;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.released img {
  height: 100%;
  width: 200px;
  object-fit: cover;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.released .image {
  display: flex;
  justify-content: left;
  margin-bottom: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
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

li {
    display: inline-block;
}

.inputs {
    display: inline-block;
    width: 100%;
}

.info {
  padding: 10px 30px;
  width: 100%;
}

.info h1 {
  font-size: 34px;
}

.info h2 {
  font-size: 21px;
}

.info p {
  margin-left: 10px;
  margin-right: 10px;
  vertical-align: middle
}

.bottom {
  display: flex;
}

.price {
  display: flex;
  margin: auto auto auto 15px;
}
.watchButtons {
  margin: auto 5px auto auto;
}

button {
  height: 50px;
  background: #e50b14;
  color: white;
  border: none;
  outline: none;
  margin-left: 15px;
}

.buy {
  margin-left: 10px;
}

.watch {
  margin: 10px;
  background: #000;
}









@media screen and (max-width: 481px){
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Verdana, Arial, sans-serif;
}

.releases {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.released {
  padding: 2vw;
  width: 100%;
  background-color: #f6f6f5;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.released img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.released .image {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
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

.info {
  padding: 1vw 3vw;
  width: 100%;
}

.info h1 {
  font-size: 5vw;
}

.info h2 {
  font-size: 3vw;
}

.info p {
  vertical-align: middle
}

.bottom {
  display: flex;
}

.price {
  display: flex;
  margin: auto auto auto 15px;
}
.watchButtons {
  margin: auto 5px auto auto;
}

button {
  background: #e50b14;
  color: white;
  border: none;
  outline: none;
}

.buy {
  margin-left: 1vw;
}

.watch {
  margin: 1vw;
  background: #000;
}
p {
    display: block;
    margin-block-start: 1vw;
    margin-block-end: 1vw;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
}
input{
  width: inherit;
  margin: 5px;
}


#textarea{
  resize: vertical; /* user can resize vertically, but width is fixed */
  overflow: auto;
  width: 100%;
}
</style>


<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Comments',
  data() {
    return {
     posts: [],

     addItem: null,
     findTitle: "",
     findItem: null,
     findComment: "",
    }
  },
  computed: {
  releases() {
         return this.$root.$data.ReleasedList.releases;
    }
  },
  created() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      try {
        let response = await axios.get("/api/posts");
        this.posts = response.data;
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
selectItem(post) {
     this.findTitle = "";
     this.findItem = post;
     this.findComment = "";
     this.posts = [post];
   },
   async deleteItem(post) {
     try {
       await axios.delete("/api/posts/" + post._id);
       this.findItem = null;
       this.getPosts();
       this.currentComponent = this.Comment;
       return true;
     } catch (error) {
       //console.log(error);
     }
   },
   async editItem(post) {
     try {
       await axios.put("/api/posts/" + post._id, {
         title: this.findItem.title,
         comment: this.findItem.comment,
         author: this.findItem.author,
       });
       this.findItem = null;
       this.getPosts();
       return true;
     } catch (error) {
       //console.log(error);
     }
   },
  }
}
</script>
