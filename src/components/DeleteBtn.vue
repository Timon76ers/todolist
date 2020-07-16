<template>
  <div>
    <dialog-btn 
      :isOpenDialog="isOpenDialog" 
      @is-open-dialog="isOpenDialog = $event"
      :color="'#ff6666'">
      {{action}}
      <template #header>Подтвердите действие</template>
      <template #main>
        <p>
          Вы действительно хотите <b>{{action}} "{{name}}"</b>?
        </p>
      </template>
      <template #footer>
        <button @click="confirm">{{action}}</button>
      </template>
    </dialog-btn>
  </div>
</template>

<script>
import DialogBtn from "./DialogBtn";
export default {
  props: ['action', 'name'],
  components: {
    DialogBtn,
  },
  data: () => ({
    isOpenDialog: false
  }),
  methods: {
    confirm() {
      this.$emit('confirm');
      this.isOpenDialog = false;
    }
  }
};
</script>