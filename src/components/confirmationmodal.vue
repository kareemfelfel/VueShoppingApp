<template>
  <div class="text-center" v-if="deleteTrigger">
    <div class="modal fade show in" id="myModal" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="$emit('cancelDelete')">&times;</button>
            <h4 class="modal-title">Confirmation</h4>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete this item?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" data-dismiss="modal" @click="$emit('confirmDelete')">Yes</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="$emit('cancelDelete')">No</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    deleteTrigger: {
      type: Boolean
    }
  },
  name: "ConfirmationModal"
}
</script>

<style scoped>

</style>