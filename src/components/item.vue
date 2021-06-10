<template> 
  <v-card color="grey lighten-2">
    <v-img v-bind:src="item.img" height="170px"></v-img>
    <v-card-title>
      <div>
        <h3 style="float: left">{{ item.name }} <span class="font-weight-light">({{ item.order}})</span></h3>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <!-- this button is disabled if an item is complete -->
      <v-btn icon v-on:click="$emit('completeItem', item)" v-if="!item.complete"><v-icon color="green">done</v-icon></v-btn>
      <v-btn icon :to="{ name: 'editForm', params: {id: item.id } }"><v-icon>edit</v-icon></v-btn>
      <v-btn icon v-on:click="$emit('deleteItem', item)"><v-icon color="red">delete</v-icon></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  }
};
</script>

