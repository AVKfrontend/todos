<template>
  <div class="modal">
    <div class="modal__body">
      <h3 v-if="isValidTask" class="modal__message">Введить завдання</h3>
      <h3 v-else class="modal__message modal__message--unvalid">Текст занадто короткий</h3>
      <textarea @input="setIsValidTask" ref="task" v-model="taskText" name="task" id="task" cols="30" rows="8"
        class="modal__input"></textarea>
      <div class="todo__controls">
        <button @click="saveTask" class="app-btn modal__btn" type="button">зберегти</button>
        <button @click="cancelEdit" class="app-btn modal__btn" type="button">відмінити</button>
      </div>
    </div>
  </div>
</template>


<script>

export default {

  editorOptions: null,

  data() {
    return {
      taskText: "",
      isValidTask: true
    }
  },

  methods: {
    openEditor(text) {
      if (text) this.taskText = text
      const editor = new Promise((resolve, reject) => {
        this.$options.editorOptions = { resolve, reject }
      })
      return editor
    },
    saveTask() {
      if (this.taskText.length < 4) {
        this.isValidTask = false
        return
      }
      this.$options.editorOptions.resolve(this.taskText)
    },
    cancelEdit() {
      this.$options.editorOptions.resolve(null)
    },
    setIsValidTask() {
      if (this.taskText.length < 4 || this.isValidTask) return
      this.isValidTask = true
    }
  },

  mounted() {
    this.$refs.task.focus()
  }

}
</script>