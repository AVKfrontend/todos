<template>
  <main :inert="isEditing" :class="{ 'noscroll': isEditing }">
    <div class="app-wrapper">
      <div class="app-body">

        <StartView v-if="isTodoListEmpty" @start="setTask" />
        <TodoList v-else :todoList="todoList" @delete-task="deleteTask" @mark-done="markDone" @create-task="createTask"
          @edit-task="editTask" />

      </div>

      <footer class="app-footer">
        Criated by Vue on Vite
      </footer>
    </div>
  </main>

  <TaskEditor ref="editor" v-if="isEditing" />
</template>

<script>
import StartView from './components/StartView.vue';
import TaskEditor from './components/TaskEditor.vue';
import TodoList from './components/TodoList.vue';


export default {
  components: { StartView, TodoList, TaskEditor },
  data() {
    return {
      todoList: [],
      isEditing: false,
      _idCount: 0
    };
  },
  computed: {
    isTodoListEmpty() { return !this.todoList.length; }
  },
  methods: {
    async setTask() {
      const text = await this.getTaskText()
      if (text) this.saveTask(text)
    },
    saveTask(text) {
      const task = {
        _id: ++(this._idCount),
        text: text,
        done: false,
        get id() {
          return this._id
        }
      }
      this.todoList.push(task)
    },
    async getTaskText(text) {
      this.isEditing = true
      await this.$nextTick()
      const result = await this.$refs.editor.openEditor(text)
      this.isEditing = false
      return result
    },
    deleteTask(task) {
      this.todoList = this.todoList.filter(el => el !== task)
    },
    markDone(task) {
      task.done = true
    },
    createTask() {
      this.setTask()
    },
    async editTask(id) {
      const taskToEdit = this.todoList.find(el => (el.id === id))
      const text = await this.getTaskText(taskToEdit.text)
      if (text) taskToEdit.text = text

    }
  },
  watch: {
    todoList(v) {
      console.log(v)

    }
  }
}


</script>

