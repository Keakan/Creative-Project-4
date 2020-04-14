<template>
<div class="wrapper">
  <div class="releases">
    <div class="released" v-for="released in releases" :key="released.id">

      <div class="image">
        <img :src="'/images/movies/'+released.image">
        <div class="info">
          <ul class="title">
            <li><h1>{{released.name}}</h1></li>
            <li><p>(<i>{{released.year}}</i>)</p></li>
          </ul>
          <p>Star Rating: {{released.stars}}</p>
            <ul class="details">
                <li><p>{{released.rating}}</p></li>
                <span class="ghost">|</span>
                <li><p>{{released.length}}</p></li>
                <span class="ghost">|</span>
                <li><p>{{released.genre}}</p></li>
            </ul>
            <h2>{{released.info}}</h2>
        </div>
      </div>
      <div class="bottom">
        <div class="price">
          <p>Price: {{released.price}}</p>
          <button class="buy" @click="buy(released)"> Buy Now </button>
        </div>
        <div class="watchButtons">
          <button class="watch" @click="watched(released)">{{released.watched}}</button>
          <button class="watch" @click="watchList(released)">{{released.watchlist}}</button>
        </div>
      </div>
        <ul class="details">
            <li><input v-model="author" placeholder="Author"></li>
            <span class="ghost">  |  </span>
            <li><p>Writing Comment for: {{released.name}}</p></li>
            <span class="ghost">  |  </span>
            <button id="postBtn" @click="upload(released)">Post Comment</button>
        </ul>
        <textarea id="textarea" v-model="comment" placeholder="Comment"></textarea>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ReleasedList',
  props: {
    releases: Array
  },
  data() {
      return {
        title: "",
        comment: "",
        author: "",

        addItem: null,
        posts: [],
        findTitle: "",
        findItem: null,
        findComment: "",
      }
    },
    computed: {
    suggestions() {
      let posts = this.posts.filter(post => post.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return posts.sort((a, b) => a.title > b.title);
    }
  },
    created() {
    this.getItems();
  },
    methods: {
      async upload(released) {
       try {
         let r2 = await axios.post('/api/posts', {
           title: released.name,
           path: released.image,
           comment: this.comment,
           author: this.author,
         });
         this.addItem = r2.data;
         this.title = "";
         this.comment = "";
         this.author = "";

       } catch (error) {
         //console.log(error);
       }
     },
     async getItems() {
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
    },
    async deleteItem(post) {
      try {
        await axios.delete("/api/posts/" + post._id);
        this.findItem = null;
        this.getItems();
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
        this.getItems();
        return true;
      } catch (error) {
        //console.log(error);
      }
    },



     buy: function(released) {
          var url = released.amazonurl + '?parameter=value';
          window.open(url, 'windowname');
        },
     watched : function(released) {
        if(released.watched === "Watched")
        {
          released.watched = "Mark as Watched";
          this.$root.$data.watchedlist.splice(this.$root.$data.watchedlist.indexOf(released), 1);
        }
        else
        {
          released.watched = "Watched";
          this.$root.$data.watchedlist.push(released);
        }
     },
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
.boxsizingBorder {
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;
}
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
  justify-content: space-around;
}

.released {
  margin: 25px;
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

ul > li {
    display: inline-block;
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
  padding: 15px;
  float: right;
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
  margin-top: 10vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.released {
  margin: 10vw;
  margin-top: 15vw;
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

ul > li {
    display: inline-block;
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




.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

#textarea{
  resize: vertical; /* user can resize vertically, but width is fixed */
  overflow: auto;
  width: 100%;
}

.formSection
{
  display: inline-block;
}

#postBtn{
  margin: 10px;
  margin-right: 15px;
}

</style>
