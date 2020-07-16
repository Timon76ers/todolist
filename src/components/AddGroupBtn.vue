<template>
  <div>
    <dialog-btn :isOpenDialog="isOpenDialog" @is-open-dialog="isOpenDialog = $event">
      добавить группу
      <template #header>Добавление группы</template>
      <template #main>
        <input v-model="name" placeholder="название" />
      </template>
      <template #footer>
        <button :disabled="!name" @click="confirm">Добавить</button>
      </template>
    </dialog-btn>
  </div>
</template>

<script>
import DialogBtn from "./DialogBtn";
export default {
  components: {
    DialogBtn
  },
  data: () => ({
    isOpenDialog: false,
    name: null
  }),
  methods: {
    confirm() {
      this.$emit("confirm", this.name);
      this.isOpenDialog = false;
    }
  },
  updated() {
    this.name = null;
  }
};
</script>