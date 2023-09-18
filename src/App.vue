<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/nested-example.vue";
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

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
  mounted() {
    // let self = this
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        // 在这里执行你想要触发的操作
        console.log("ESC键被按下了！");
        // self.$alert('ni')
      }
    });
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
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}

.border-animation {
  animation: blink 1s 2;
}

@keyframes blink {
  0% {
    border: 2px solid #000;
  }
  50% {
    border: 2px solid #ff0000;
  }
  100% {
    border: 2px solid #000;
  }
}
img {
  object-fit: cover;
}
</style>
