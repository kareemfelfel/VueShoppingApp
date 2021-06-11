<template>
  <!--
  <div class="panel panel-default" style="width:250px;">
    <div class="panel-heading">
      <img v-bind:src="item.img" height="170px">
    </div>
    <div class="panel-body">
      <h3 style="float: left">{{ item.name }} <span class="font-weight-light">({{ item.order}})</span></h3>
      <br>
    </div>
    <div class="panel-footer text-center">
      this button is disabled if an item is complete
      <btn style="margin:5px;" class="btn btn-default btn-success" v-on:click="$emit('completeItem', item)" v-if="!item.complete"><span class="glyphicon glyphicon-ok" color="green"></span></btn>
      <btn style="margin:5px;" class="btn btn-default btn-warning" :to="{ name: 'editForm', params: {id: item.id } }"><span class="glyphicon glyphicon-edit"></span></btn>
      <btn style="margin:5px;" class="btn btn-default btn-danger" v-on:click="$emit('deleteItem', item)"><span class="glyphicon glyphicon-trash"></span></btn>
    </div>
  </div>
  -->
  <div class="myCard">
    <div v-if="item.img != ''" style="">
      <img v-bind:src="item.img" height="170px" style="width:100%;">
    </div>
    <div v-else style="background-color: #c8c8c8; min-height: 170px;" >&nbsp;</div>
    <div class="myContainer">
      <h4>{{ item.name }}<span class="font-weight-light">({{ item.order}})</span></h4>
      <p></p>
      <p class="text-center">
        <btn style="margin:5px;" class="btn btn-default btn-success" v-on:click="$emit('completeItem', item)" v-if="!item.complete"><span class="glyphicon glyphicon-ok" color="green"></span></btn>
        <btn style="margin:5px;" class="btn btn-default" :to="{ name: 'editForm', params: {id: item.id } }"><span class="glyphicon glyphicon-edit"></span></btn>
        <btn style="margin:5px;" class="btn btn-default btn-danger" v-on:click="$emit('deleteItem', item)"><span class="glyphicon glyphicon-trash"></span></btn>
      </p>
    </div>
  </div>
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
<style>
.myCard {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 20px;
}

/* On mouse-over, add a deeper shadow */
.myCard:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.6);
}

/* Add some padding inside the card container */
.myContainer {
  padding: 2px 16px;
}
</style>

