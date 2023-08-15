<template>
  <main :inert="isEditing">
    <div class="app-wrapper">
      <div class="app-body">

        <StartView v-if="isTodoListEmpty" @start="firstTask" />
        <TodoList v-else :todoList="todoList" @delete-task="deleteTask" @mark-done="markDone" @create-task="setTask"
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
import { saveInStorage, restoreFromStorage } from './assets/storageManipulation.js'


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
      this.todoList = this.todoList.concat(task)
    },
    async getTaskText(text) {
      this.isEditing = true
      document.body.classList.add('noscroll')
      await this.$nextTick()
      const result = await this.$refs.editor.openEditor(text)
      this.isEditing = false
      document.body.classList.remove('noscroll')
      return result
    },
    deleteTask(task) {
      this.todoList = this.todoList.filter(el => el !== task)
    },
    markDone(task) {
      task.done = true
      saveInStorage(this.todoList)
    },
    async editTask(id) {
      const taskToEdit = this.todoList.find(el => (el.id === id))
      const text = await this.getTaskText(taskToEdit.text)
      if (text) {
        taskToEdit.text = text
        saveInStorage(this.todoList)
      }
    },
    restoreTasksList() {
      const { savedTodoList, idCount } = restoreFromStorage()
      if (!idCount) return
      this.todoList = savedTodoList
      this._idCount = idCount
    },
    firstTask() {
      this._idCount = 0
      this.setTask()
    }
  },

  watch: {
    todoList(v) {
      saveInStorage(v)
    }
  },

  created() {
    this.restoreTasksList()
  }
}
</script>

