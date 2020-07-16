<template>
  <div id="app">
    <header>
      <h1 class="title">Список заданий</h1>
      <hr />
      <div class="bar">
        <input v-model.trim="filter.name" placeholder="фильровать по названию" />
        <select v-model="filter.status">
          <option value="0">все</option>
          <option value="1">выполненные</option>
          <option value="2">невыполненные</option>
        </select>
        <AddTaskBtn :groups="groups" @confirm="addTask" />
        <AddGroupBtn @confirm="addGroup" />
      </div>
    </header>
    <main>
      <ul>
        <li v-for="(group, index) in taskByGroup" :key="`group-${index}`">
          <CardGroup
            :group="group"
            @delete-group="deleteGroup"
            @add-task="addTask"
            @delete-task="deleteTask"
            @change-status="changeStatus"
            @change-task-group="changeTaskGroup"
          />
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import CardGroup from "./components/CardGroup.vue";
import AddTaskBtn from "./components/AddTaskBtn";
import AddGroupBtn from "./components/AddGroupBtn";

export default {
  name: "todo-app",
  components: {
    CardGroup,
    AddTaskBtn,
    AddGroupBtn
  },
  data: () => ({
    modal: false,
    groups: ["без группы", "group 1", "rRRR"],
    tasks: [
      {
        name: "dsa",
        description: "dsadsadsa",
        isCompleted: true,
        group: "без группы"
      },
      {
        name: "asd",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        isCompleted: false,
        group: "group 1"
      }
    ],
    filter: {
      name: null,
      status: "0"
    }
  }),
  computed: {
    filterTasks() {
      return this.tasks
        .filter(item =>
          this.filter.name
            ? item.name.toLowerCase().includes(this.filter.name.toLowerCase())
            : item
        )
        .filter(item =>
          this.filter.status == 0
            ? item
            : this.filter.status == 1
            ? item.isCompleted === true
            : item.isCompleted === false
        );
    },
    taskByGroup() {
      return this.groups.map(group => ({
        name: group,
        tasks: this.filterTasks.filter(task => task.group === group)
      }));
    }
  },
  methods: {
    addGroup(name) {
      this.groups.push(name);
    },
    deleteGroup(name) {
      this.groups.splice(this.groups.indexOf(name), 1); // TODO: надо удалить еще и задачи этой группы
    },
    addTask(task) {
      this.tasks.push(task);
    },
    deleteTask(task) {
      this.tasks.splice(
        this.tasks.findIndex(
          item => task.name === item.name && task.group === item.group
        ),
        1
      );
    },
    changeStatus(task) {
      this.tasks.find(
        item => task.name === item.name && task.group === item.group
      ).isCompleted = task.isCompleted;
    },
    changeTaskGroup(task) {
      this.tasks.find(
        item => task.name === item.name && task.group === item.group
      ).group = task.newGroup;
    }
  }
};
</script>

<style>
body {
  margin: 0 10px 0 10px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  text-align: center;
  color: #2c3e50;
  margin: auto;
  max-width: 1280px;
  font-size: 1em;
}
header,
footer {
  border-radius: inherit;
}
main {
  padding: 5px 5px 5px 5px;
}
ul {
  list-style: none;
  padding: 0 0 0 20px;
}
.bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #eee;
  flex-wrap: wrap;
}
.title {
  margin: 0;
  text-align: center;
}
.element,
button {
  text-transform: lowercase;
  margin: 0 10px 0 10px;
  padding: 5px;
  font-size: 1em;
  border: 1px 1px 1px 1px;
  border-color: #999;
  border-radius: 5px;
}
.card {
  position: relative;
  margin: 5px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
}
.align-center {
  display: flex;
  align-items: center;
}
p {
  margin: 0;
  text-align: start;
  padding-left: 10px;
}
input,
textarea,
select {
  margin: 10px 5px;
  padding: 5px;
  font-size: 1.1em;
  border-radius: 5px;
}
.drop-down:after {
    content: "";
    border-right: 3px solid #999;
    border-top: 3px solid #999;
    position: absolute;
    display: block;
    right: 15px;
    width: 20px;
    height: 20px;
    transform: rotate(135deg);
    transition: all 0.3s;
}
.drop-down:hover {
    box-shadow: 0 0 0 128px rgba(128,128,128,.1) inset;
}
.opened:after {
    transform: rotate(45deg);
    transition: all 0.3s;
}
</style>
