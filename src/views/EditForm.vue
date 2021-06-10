<template>
  <div class="form-wrapper">
    <!-- Display item when it is submitted -->
    <div class="text-xs-center" v-if="edited">
      <h2><v-icon color="green">done_all</v-icon> Your item has been updated!</h2>
      <div class="details text-xs-left">
        <h3 class="blue-grey--text">Item details</h3>
        <img :src="item.img" height="250" width="250" style="border-radius: 30px;">
        <p><strong>Name:</strong> {{item.name}}</p>
        <p><strong>quantity:</strong> {{item.order}}</p>
      </div>
      <v-btn to="/" color="success">Go to homepage</v-btn>
    </div>
    <v-form v-else v-model="valid">
      <!--Text fields for input name and image url-->
      <img :src="item.img" height="250" width="250" style="border-radius: 30px;">
      <v-text-field label="Name" :placeholder="item.name" required :rules="nameRules" v-model="item.name"></v-text-field>
      <v-text-field label="Image url" :placeholder="item.img" v-model="item.img" append-icon="attach_file"><v-icon>image</v-icon> upload a Picture</v-text-field>
      <!-- Field for choosing quantity-->
      <br>
      <v-slider v-model="item.order" value="2" label="Quantity: " :rules="sliderRules" step="1" :min="1" :max="20" thumb-label="always" ticks></v-slider>
      <br>
      <v-btn @click="submit" :disabled="!valid" color="success">Edit</v-btn>
    </v-form>
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
    ...mapActions(["revertCallState"]),
    ...mapActions(["getItem"]),
    ...mapActions(["editItem"])
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