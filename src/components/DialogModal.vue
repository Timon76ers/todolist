<template>
  <div class="modal align-center">
    <div class="container card">
      <header class="bar">
        <h2 class="title">
          <slot name="header"></slot>
        </h2>
        <div class="align-center">
          <button @click="close">X</button>
        </div>
      </header>
      <main class="card">
        <slot name="main"></slot>
      </main>
      <footer class="bar">
        <slot name="footer"></slot>
        <button @click="close">Отмена</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit('close')
    }
  }
};
</script>

<style scoped>
.modal {
  z-index: 10001;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.container {
  background-color: #fff;
  min-width: 500px;
  max-width: 500px;
}
</style>