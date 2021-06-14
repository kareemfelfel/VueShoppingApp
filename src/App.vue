<template>
		<main>
			<div class="app-container">

        <nav class="navbar navbar-inverse">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="#">Shopping List</a>
            </div>
            <ul class="nav navbar-nav">
              <li :class="{ active: activeTab === 'List' }" v-on:click="changeTab('List')">
                  <router-link to="/"><span class="glyphicon glyphicon-list"></span> List</router-link>
              </li>
              <li :class="{ active: activeTab === 'AddItem' }" v-on:click="changeTab('AddItem')">
                <router-link to="/addForm"><span class="glyphicon glyphicon-plus"></span>Add Item</router-link>
              </li>
            </ul>
            <form class="navbar-form navbar-right">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Search" name="search" v-on:keyup="filter" v-model="searchText">
              </div>
            </form>
          </div>
        </nav>


        <div class="card overflow-hidden">

          <div id="scrolling-techniques-3" class="overflow-y-auto" max-height="600">
            <!-- Extra space for the app bar -->
            <div style="height: 40px;">
            </div>
            <!-- Actual application -->
            <router-view @changeTab="changeTab"></router-view>
          </div>
        </div>

        <!-- Loading bar that loads based on the property of loading in the store.
        It loads when the store is processing a server request -->
        <loading-bar :dialog="this.$store.state.loading"></loading-bar>
        <!-- Error box that displays an error when it occurs in the server -->
        <error-box></error-box>
			</div>
		</main>
</template>


<script>
import { mapActions } from 'vuex';
import Loading from "@/components/loading";
import ErrorBox from "@/components/errorbox";
export default {
  name: "App",
  data() {
    return {
      searchText: "",
      activeTab: "",
    };
  },
  components:{
    loadingBar: Loading,
    errorBox: ErrorBox
  },
  computed: {
  },
  methods: {
    ...mapActions(["filterItems"]),
    filter(){
      this.$store.dispatch("filterItems", this.searchText)
    },
    changeTab(text){
      this.activeTab= text;
    }
  }
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto");

/*brown and mint*/
/*dark brown 32292F
light mint 99E1D9
bisque F0F7F4
dark mint 70ABAF
light brown 705D56*/
.router-link-exact-active {
}
*,
*:before,
*:after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

main {
  padding: 40px;
  font-family: "Roboto", "sans-serif";
  background: #fff;
  background-repeat: no-repeat;
  background-size: auto;
  background: fixed;
  color: #444;
  background-image: url("https://i.pinimg.com/originals/d7/59/b5/d759b559ad669f9e199f1aaaa381a8ab.jpg");
}

h1,
p {
  margin: 0 0 1em 0;
}

img {
  max-width: 100%;
  display: block;
  margin: 0 auto;
}

.app-container {
  border-radius: 25px;
  max-width: 1020px;
  margin: 0 auto;
  background-color: #fff;
}

.app-container > * {
  border-radius: 5px;
  font-size: 150%;
  margin-bottom: 10px;
}

.wrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: minmax(150px, auto);
}

.wrapper > * {
  padding: 15px;
  border-radius: 5px;
}

.panel {
  /* needed for the flex layout*/
  margin-left: 5px;
  margin-right: 5px;
  flex: 1 1 200px;
}

.tall-panel {
  grid-row-end: span 2;
}

/* We need to set the margin used on flex items to 0 as we have gaps in grid.  */
@supports (display: grid) {
  .wrapper > * {
    margin: 0;
  }
}
</style>

