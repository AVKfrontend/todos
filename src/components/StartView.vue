<template>
  <h1 class="app-title">Планування</h1>
  <button @click="$emit('start')" class="app-btn app-btn--start" type="button">почати</button>
</template>

<script>
export default {
  emits: {
    start: null
  }
}
</script>