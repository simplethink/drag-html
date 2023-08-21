<template>
  <div id="app">
     <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/nested-example.vue";
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
  
Vue.use(ElementUI);

 export default {
  name: "App",
  data() {
    return {
      enabled: true,
      list: [
        { name: "John", id: 0 },
        { name: "Joao", id: 1 },
        { name: "Jean", id: 2 },
      ],
      dragging: false,
    };
  },
  methods: {
    checkMove: function (e) {
      window.console.log("Future index: " + e.draggedContext.futureIndex);
    },
  },
  components: {
     HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
