<template>
  <div>
    <dialog-btn :isOpenDialog="isOpenDialog" @is-open-dialog="isOpenDialog = $event">
      Добавить задание
      <template #header>Добавление задачи</template>
      <template #main>
        <input v-model="task.name" placeholder="название" />
        <textarea v-model="task.description" placeholder="описание" />
        <select v-model="task.group" :disabled="groups.length === 1">
          <option v-for="group in groups" :key="`option-group-${group}`" :value="group">{{group}}</option>
        </select>
      </template>
      <template #footer>
        <button :disabled="!task.name" @click="confirm">Добавить</button>
      </template>
    </dialog-btn>
  </div>
</template>

<script>
import DialogBtn from "./DialogBtn";
export default {
  props: ["groups"],
  components: {
    DialogBtn
  },
  data: () => ({
    isOpenDialog: false,
    task: {
      name: null,
      description: null,
      group: "null"
    }
  }),
  methods: {
    confirm() {
      this.$emit("confirm", { ...this.task, isCompleted: false });
      this.isOpenDialog = false;
    }
  },
  updated() {
    this.task.name = null;
    this.task.description = null;
    this.task.group = this.groups[0];
  }
};
</script>

<style scoped>
textarea {
  max-width: initial;
  min-height: 100px
}
</style>