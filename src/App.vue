<template>
  <main>
    <div class="app-wrapper">
      <div class="app-body">

        <StartView v-if="isTodoListEmpty" @start="setFirstTask" />

      </div>

      <footer class="app-footer">
        Criated by Vue on Vite
      </footer>
    </div>
  </main>
</template>

<script>
import StartView from './components/StartView.vue';


export default {
  components: { StartView },
  data() {
    return {
      todoList: []
    };
  },
  computed: {
    isTodoListEmpty() { return !this.todoList.length; }
  },
  methods: {
    setFirstTask() {
      console.log('set task')
    }
  }
}


</script>

