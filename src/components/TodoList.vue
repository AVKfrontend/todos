<template>
  <div class="container">
    <div class="todo">
      <h1 class="app-title todo__title">Список завдань</h1>
      <ul class="todo__list">
        <li v-for="task of todoList" :key="task.id" :class="{ 'todo__item--done': task.done }" class="todo__item ">
          <h2>
            #{{ task.id }}
            <img v-if="task.done" width="15" height="15" src="done.png" alt="Done">
          </h2>
          <h3 class="todo__text">{{ task.text }}</h3>
          <div class="todo__controls">
            <button @click="editCurrentTask(task.id)" class="app-btn todo__done-btn" type="button">змінити</button>
            <button @click="deleteCurrentTask(task)" class="app-btn" type="button">видалити</button>
            <button @click="markTaskDone(task)" class="app-btn todo__done-btn app-btn--status"
              type="button">статус<span>відмітити як "виконано"</span></button>
          </div>
        </li>
      </ul>
      <button @click="createNewTask" class="app-btn todo__add-btn" type="button">додати завдання</button>
    </div>
  </div>
</template>

<script>

export default {

  props: {
    todoList: Array
  },
  emits: {
    'delete-task': null,
    markDone: null,
    createTask: null,
    editTask: null
  },

  data() {
    return {
    }
  },

  methods: {
    markTaskDone(task) {
      this.$emit('markDone', task)
    },
    deleteCurrentTask(task) {
      this.$emit('delete-task', task)
    },
    createNewTask() {
      this.$emit('createTask')
    },
    editCurrentTask(id) {
      this.$emit('editTask', id)
    }
  },

}

</script>