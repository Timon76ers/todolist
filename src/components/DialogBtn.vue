<template>
  <div>
    <button @click="isOpen = true" :style="{backgroundColor: color}">
      <slot></slot>
    </button>
    <DialogModal v-if="isOpen" @close="isOpen = false">
      <template #header>
        <slot name="header"></slot>
      </template>
      <template #main>
        <slot name="main"></slot>
      </template>
      <template #footer>
        <slot name="footer"></slot>
      </template>
    </DialogModal>
  </div>
</template>

<script>
import DialogModal from "./DialogModal"
export default {
  props: ['isOpenDialog', 'color'],
  components: {
    DialogModal
  },
  computed: {
    isOpen: {
      get() {
        return this.isOpenDialog;
      },
      set(val) {
        this.$emit('is-open-dialog', val)
      }
    }
  }
}
</script>