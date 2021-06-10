<template>
  <div class="form-wrapper">
    <!-- Display item when it is submitted -->
    <v-container class="text-xs-center" v-if="!this.$store.state.error && submitted" v-model="submitted">
      <h2>Make sure you don't forget anything!</h2>
      <div class="details text-xs-left">
        <h3 class="blue-grey--text">Item details</h3>
        <img :src="Form.img" height="250" width="250" style="border-radius: 30px;">
        <p><strong>Name:</strong> {{Form.name}}</p>
        <p><strong>quantity:</strong> {{Form.order}}</p>
      </div>
      <v-btn to="/" color="success">Go to homepage</v-btn>
    </v-container>
    <v-form v-else v-model="valid">
      <!--Text fields for input name and image url-->
      <v-text-field label="Name" required :rules="nameRules" v-model="Form.name"></v-text-field>
      <v-text-field label="Image url" v-model="Form.img" append-icon="attach_file"><v-icon>image</v-icon> upload a Picture</v-text-field>
      <!-- Field for choosing quantity-->
      <br>
      <v-slider v-model="Form.order" label="Quantity: " :rules="sliderRules" step="1" :min="1" :max="20" thumb-label="always" ticks></v-slider>
      <br>
      <v-btn @click="submit" :disabled="!valid" color="success">Submit</v-btn>
    </v-form>
    <loading-bar :dialog="this.$store.state.loading"></loading-bar>
    <error-box></error-box>
  </div>
</template>


<script>
import Loading from '../components/loading.vue';
import ErrorBox from '../components/errorbox.vue';
import { mask } from 'vue-the-mask';
import { mapActions } from 'vuex';
export default {
  components:{
    loadingBar: Loading,
    errorBox: ErrorBox
  },
  name: "Form",
  directives: {
    mask,
  },
  data: () => {
    return {
      //current form values
      Form:{
        name: "",
        order: Number,
        complete: false,
        img: ""
      },
      submitted: false,
      valid: true,
      loading: false,
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
  }
};
</script>

<style scoped>
.form-wrapper {
  padding: 40px;
  text-align: center;
}
.details {
  padding-top: 30px;
}
h3 {
  padding-bottom: 20px;
}
</style>