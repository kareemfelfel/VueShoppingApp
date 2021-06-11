<template>
	<v-app>
		<main>
			<div class="app-container">
        <v-card class="overflow-hidden">
          <v-app-bar absolute color="#6A76AB" dark shrink-on-scroll prominent src="https://st.hzcdn.com/simgs/pictures/kitchens/kitchens-michael-alan-kaskel-img~0d511d8e0e77ab3a_14-3280-1-7aacee2.jpg" fade-img-on-scroll scroll-target="#scrolling-techniques-3">
            <template v-slot:img="{ props }">
              <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
            </template>
            <v-app-bar-title>My Shopping List</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-toolbar floating light max-width="25%" rounded collapse dense>
              <v-text-field hide-details prepend-icon="search" v-on:keyup="filter" v-model="searchText"></v-text-field>
            </v-toolbar>
            <template v-slot:extension>
              <v-tabs align-with-title>
                <v-tab to="/" icon><v-icon>list</v-icon> List</v-tab>
                <v-tab to="/addForm" icon><v-icon>add</v-icon> Add Item</v-tab>
              </v-tabs>
            </template>
          </v-app-bar>
          <v-sheet id="scrolling-techniques-3" class="overflow-y-auto" max-height="600">
            <!-- Extra space for the app bar -->
            <v-container style="height: 250px;">
            </v-container>
            <!-- Actual application -->
            <router-view></router-view>
          </v-sheet>
        </v-card>

        <!-- Loading bar that loads based on the property of loading in the store.
        It loads when the store is processing a server request -->
        <loading-bar :dialog="this.$store.state.loading"></loading-bar>
        <!-- Error box that displays an error when it occurs in the server -->
        <error-box></error-box>
			</div>
		</main>
	</v-app>
</template>


<script>
import { mapActions } from 'vuex';
import Loading from "@/components/loading";
import ErrorBox from "@/components/errorbox";
export default {
  name: "App",
  data() {
    return {
      searchText: ""
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

