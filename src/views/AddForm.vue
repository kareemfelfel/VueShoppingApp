<template>
  <div class="form-wrapper">
    <!-- Display item when it is submitted and there is no error in the server request-->
    <div class="text-center" v-if="!this.$store.state.error && submitted">
      <h2>Make sure you don't forget anything!</h2>
      <div class="details">
        <h4>Item details</h4>
        <img :src="Form.img" height="250" width="250" style="border-radius: 30px;">
        <p><strong>Name:</strong> {{Form.name}}</p>
        <p><strong>quantity:</strong> {{Form.order}}</p>
      </div>
      <router-link to="/">
      <btn class="btn btn-success" >Go to homepage</btn>
      </router-link>
    </div>
    <form v-else>
      <div class="form-group">
        <label for="name">Name: <span style="color: red;">*</span></label>
        <input id="name" class="form-control" required v-model="Form.name" style="max-width: 400px;" v-on:keyup="checkAll">
      </div>
      <div class="form-group">
        <label for="img"><span class="glyphicon glyphicon-link"></span> Image URl: </label>
        <input class="form-control" id="img" label="Image url" v-model="Form.img" style="max-width: 400px;" v-on:keyup="checkAll">
      </div>
      <!-- Field for choosing quantity-->
      <div class="form-group">
        <label for="quant">Quantity: <span style="color: red;">*</span></label>
        <div class="input-group" id="quant">
          <input type="button" value="-" class="btn-primary" data-field="quantity" v-on:click="decrementQuantity" style="border-radius: 5px 0px 0px 5px;">
          <input type="text" step="1" max="50" value="1" name="quantity" id="quantField" v-model="Form.order" v-on:keyup="checkNan">
          <input type="button" value="+" class=" btn-primary" data-field="quantity" v-on:click="incrementQuantity" style="border-radius: 0px 5px 5px 0px;">
        </div>
      </div>
      <!--<v-slider v-model="Form.order" label="Quantity: " :rules="sliderRules" step="1" :min="1" :max="20" thumb-label="always" ticks></v-slider>-->
      <br>
      <btn @click="submit" :disabled="!valid" class="btn btn-success">Submit</btn>
    </form>
    <br><br>
  </div>
</template>


<script>
import { mapActions } from 'vuex';
export default {
  name: "Form",
  data: () => {
    return {
      //current form values
      Form:{
        name: "",
        order: 1,
        complete: false,
        img: ""
      },
      submitted: false,
      valid: false,
      loading: false,
    };
  },
  methods: {
    //on submit function
    submit() {
      let formData = new FormData();
      Object.keys(this.Form).forEach((key) => {
        formData.append(key, this.Form[key])
      });
      //if the form is submitted will return true, else false.
      //push the item to the API and to the store
      this.addToItems(this.Form);
      //check if the item is submitted
      this.submitted = true;
      //if so, call revertCall to set it back to false
    },
    ...mapActions(["addToItems"]),
    decrementQuantity(){
      if(!isNaN(this.Form.order) && this.Form.order > 1 ) {
        this.Form.order = Number(this.Form.order) - 1;
      }
      this.checkAll();
    },
    incrementQuantity(){
      if(!isNaN(this.Form.order)) {
        this.Form.order = Number(this.Form.order) + 1;
      }
      this.checkAll();
    },
    checkNan(){
      if(isNaN(this.Form.order)){
        this.Form.order = 0;
      }
      this.checkAll();
    },
    checkAll(){
      this.valid = !isNaN(this.Form.order) &&
          this.Form.order >= 1 && this.Form.name != "" &&
          this.Form.name.length >= 3;
    }
  },
  created() {
    this.$emit("changeTab", "AddItem");
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