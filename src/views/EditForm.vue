<template>
  <div class="form-wrapper">
    <!-- Display item when it is submitted and there is no error in the server request -->
    <div class="text-center" v-if="edited && !this.$store.state.error">
      <h2><span class="glyphicon glyphicon-check" style="color: green;"></span> Your item has been updated!</h2>
      <div class="details">
        <h4>Item details</h4>
        <img :src="item.img" height="250" width="250" style="border-radius: 30px;">
        <p><strong>Name:</strong> {{item.name}}</p>
        <p><strong>quantity:</strong> {{item.order}}</p>
      </div>
      <router-link to="/">
      <btn class="btn btn-success">Go to homepage</btn>
      </router-link>
    </div>

    <form v-else>
      <!--Text fields for input name and image url-->
      <img :src="item.img" height="250" width="250" style="border-radius: 30px;">
      <div class="form-group" style="text-align: center;">
        <label for="name">Name: <span style="color: red;">*</span></label>
        <input class="form-control myInput" id="name" label="Name" :placeholder="item.name" required v-model="item.name" style="max-width: 400px;" v-on:keyup="checkAll">
      </div>
      <div class="form-group" style="text-align: center;">
        <label for="img"><span class="glyphicon glyphicon-link"></span> Image URl: </label>
        <input class="form-control myInput" id="img" label="Image url" :placeholder="item.img" v-model="item.img" style="max-width: 400px;" v-on:keyup="checkAll">
      </div>
        <!-- Field for choosing quantity-->
      <div class="form-group" style="text-align: center;">
        <label for="quant">Quantity: <span style="color: red;">*</span></label>
        <div class="input-group" id="quant">
          <input type="button" value="-" class="btn btn-default" data-field="quantity" v-on:click="decrementQuantity">
          <input type="text" step="1" max="50" value="1" name="quantity" id="quantField" v-model="item.order" v-on:keyup="checkAll">
          <input type="button" value="+" class="btn btn-default" data-field="quantity" v-on:click="incrementQuantity">
        </div>
      </div>

      <br>
      <btn @click="submit" :disabled="!valid" class="btn btn-success myInput">Submit</btn>
    </form>
    <br><br>
  </div>
</template>


<script>
import { mask } from 'vue-the-mask';
import { mapActions } from 'vuex';
export default {
  name: "Form",
  directives: {
    mask,
  },
  data: () => {
    return {
      //current form values
      edited: false,
      valid: true,
      //check if name is not empty and if it is type name is required
      nameRules: [
        (name) => !!name || 'Name is required',
        (name) => name.length > 2 || 'Name must be longer than 2 characters',
      ],
      sliderRules: [
        v => v <= 10 || "you can't afford more than 10!",
      ],

    };
  },
  methods: {
    //on submit function
    submit() {
      this.editItem(this.item);
      this.edited = true;
    },
    ...mapActions(["addToItems"]),
    ...mapActions(["getItem"]),
    ...mapActions(["editItem"]),
    decrementQuantity(){
      if(!isNaN(this.item.order) && this.item.order > 1 ) {
        this.item.order = Number(this.item.order) - 1;
      }
      this.checkAll();
    },
    incrementQuantity(){
      if(!isNaN(this.item.order)) {
        this.item.order = Number(this.item.order) + 1;
      }
      this.checkAll();
    },
    checkAll(){
      if(!isNaN(this.item.order) && this.item.order >= 1 && this.item.name != "" && this.item.name.length >= 3){
        this.valid = true;
      }
      else{
        this.valid = false;
      }
    }

  },
  created(){
    //get the specific requested item in route from the store
    this.getItem(this.$route.params.id);
  },
  computed: {
    item(){
      return this.$store.state.Item;
    }
  }

};
</script>

<style scoped>
.form-wrapper {
  padding: 30px;
}
.details {
  padding-top: 20px;
}
h4 {
  padding-bottom: 20px;
  color: #6699cc;
}
.myInput{
  margin: 0 auto;
  display: block;
}
#quantField{
  max-width: 50px;
  text-align: center;
  border-radius: 5px;
}
#quantField:focus{
  box-shadow: none;
  border: none;
}
.input-group {
  clear: both;
  margin: 15px 0;
  position: relative;
  display: block;
}

.input-group input[type='button'] {
  min-width: 35px;
  width: auto;
  transition: all 300ms ease;
}

input[type="number"] {
  -moz-appearance: textfield;
  -webkit-appearance: none;
}

</style>