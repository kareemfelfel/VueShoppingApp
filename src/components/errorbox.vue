<template>
  <div class="text-center" v-if="this.$store.state.error">
    <v-dialog v-model="this.$store.state.error" width="500">

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Network Error occurred
        </v-card-title>
        <v-card-text>
          Something went wrong... Try again later.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="handleError">
            ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  methods:{
    ...mapActions(["revertError"]),
    handleError(){
      this.revertError();
      this.$router.push({ path: '/' });
    }
  }
};
</script>