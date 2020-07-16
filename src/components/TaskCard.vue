<template>
  <div class="card task" @mousedown="mouseDown">
    <header @click.self="toggle" :class="['bar', {['drop-down']: !isShort, opened: isOpened}]">
      <div class="align-center">
        <input v-model="task.isCompleted" type="checkbox" />
        <h3 :class="['title', {through: status}]">{{task.name}}</h3>
      </div>
      <div class="align-center">
        <DeleteBtn :action="'удалить'" :name="task.name" @confirm="$emit('delete-task', task)" />
      </div>
    </header>
    <main v-if="!!task.description">
      <p>{{description}}</p>
    </main>
  </div>
</template>

<script>
import DeleteBtn from "./DeleteBtn";
export default {
  components: { DeleteBtn },
  props: ["task"],
  data: () => ({
    isOpened: false,
    targetGroup: null
  }),
  computed: {
    status: {
      get() {
        return this.task.isCompleted;
      },
      set(val) {
        this.$emit("change-status", {
          name: this.task.name,
          group: this.task.group,
          isCompleted: val
        });
      }
    },
    isShort() {
      return this.task.description ? this.task.description.length < 150 : true;
    },
    description() {
      if (this.task.description && (this.isShort || this.isOpened)) return this.task.description;
      return this.task.description.substr(0, 150) + '...'
    }
  },
  methods: {
    toggle() {
      if (!this.isShort) this.isOpened = !this.isOpened
    },
    mouseDown(event) {
      const target = event.target.closest('.task');
      const el = target.cloneNode(true)
      el.style.position = 'absolute';
      el.style.zIndex = 1000;

      this.moveAt(el, event)

      const moveMouse = event => {
        if (!target.mouseout) target.onmouseout = () => {
          document.body.appendChild(el)
          target.onmouseup = null;
          target.onmouseout = null;
        }
        this.moveAt(el, event)
      }

      target.onmouseup = () => {
        document.removeEventListener('mousemove', moveMouse);
        target.onmouseup = null;
        target.onmouseout = null;
        el.remove();    
      }

      document.addEventListener('mousemove', moveMouse);

      el.onmouseup = () => {
        el.remove();
        el.onmouseup = null;
        target.onmouseup = null;
        target.onmouseout = null;
        document.removeEventListener('mousemove', moveMouse);
        if (this.targetGroup && this.targetGroup !== this.task.group) this.$emit('change-task-group', {newGroup: this.targetGroup, ...this.task})
      };
    },
    moveAt(el, {pageX, pageY}) {
      const groupEl = document.elementsFromPoint(pageX, pageY).find(target => target.classList.contains('group'));
      if (groupEl) this.targetGroup = groupEl.getAttribute('data-group-name');
      
      el.style.left = pageX - el.offsetWidth / 2 + 'px';
      el.style.top = pageY - el.offsetHeight / 2 + 'px';
    }
  }
};
</script>

<style scoped>
header {
  background-color: #ddd;
  padding-right: 50px
}
.task {
  background-color: #eee
}
.through {
  text-decoration: line-through;
}
</style>
