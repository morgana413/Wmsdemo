<template>
  <div id="app">
  <index></index>
  </div>
</template>

<script>


import Index from "@/components/index.vue";

export default {
  name: 'App',
  components: {
    Index
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
