<template>
  <div class="container-fluid">
    <p style="float: left">Incomplete Items:</p>
    <br>
    <hr>
    <br>
    <div class="container-fluid text-center">
      <div class="col-xs-12 col-sm-4 col-md-3" v-for="item in incompleteItems" :key="item.id">
        <app-item :item="item" @completeItem="completeItem" @deleteItem="removeItem"></app-item>
      </div>
    </div>
    <br>
    <p>complete Items:</p>
    <hr>
    <br>
    <div class="container-fluid text-center">
      <div class="col-xs-12 col-sm-4 col-md-3" v-for="item in completeItems" :key="item.id">
        <app-item :item="item" @completeThisItem="completeItem" @deleteItem="removeItem" style="margin-bottom: 25px;"></app-item>
      </div>
    </div>
  </div>
</template>
<script>
import Item from '../components/item.vue';
import axios from 'axios';
//base URL that we'll be calling
axios.defaults.baseURL = 'http://localhost:3000';
import { mapActions } from 'vuex';
export default {
  components: {
    appItem: Item,
  },
  data() {
    return {
    };
  },
  created() {
    this.loadAllItems();
    this.$emit("changeTab", "List");
  },
  computed: {
    //all items
    items() {
      return this.$store.state.Items;
    },
    //returns a copy of the incomplete items in the store
    incompleteItems(){
      return this.$store.state.Items.filter(item => item.complete == false);
    },
    //returns a copy of the complete items in the store
    completeItems(){
      return this.$store.state.Items.filter(item => item.complete == true);
    }
  },
  methods: {
    ...mapActions(["completeItem"]),
    ...mapActions(["clearItems"]),
    ...mapActions(["removeItem"]),
    ...mapActions(["loadAllItems"]),
    ...mapActions(["revertCallState"]),
  }

};
</script>

<style scoped>
p {
  margin: 0;
}
</style>