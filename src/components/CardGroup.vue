<template>
  <div class="card group" :data-group-name="group.name">
    <header @click.self="toggle" :class="['bar', {['drop-down']: !!group.tasks.length, opened: isOpened}]" v-if="group.name !== 'без группы'">
      <h2 class="title">{{group.name}}</h2>
      <div class="align-center">
        <AddTaskBtn :groups="[group.name]" @confirm="$emit('add-task', $event)" />
        <DeleteBtn
          :action="'удалить'"
          :name="group.name"
          @confirm="$emit('delete-group', group.name)"
        />
      </div>
    </header>
    <main>
      <ul v-if="isOpened">
        <li v-for="(task, index) in group.tasks" :key="`group-${index}-task-${task}`">
          <TaskCard
            :task="task"
            @delete-task="$emit('delete-task', $event)"
            @change-status="$emit('change-status', $event)"
            @change-task-group="$emit('change-task-group', $event)"
          />
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import TaskCard from "./TaskCard";
import AddTaskBtn from "./AddTaskBtn";
import DeleteBtn from "./DeleteBtn";
export default {
  props: ["group"],
  components: {
    TaskCard,
    AddTaskBtn,
    DeleteBtn
  },
  data: () => ({
    isOpened: true
  }),
  methods: {
    toggle() {
      if (this.group.tasks.length) this.isOpened = !this.isOpened
    }
  }
};
</script>

<style scoped>
.group {
  margin: 20px 0 20px 0;
}
header {
  background-color: #ccc;
  padding-right: 60px;
  cursor: pointer;

}
ul {
  list-style: decimal;
}
</style>
