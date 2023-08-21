<template>
  <draggable
    class="dragArea"
    tag="div"
    chosen-class="chosen"
    :list="tasks"
    :group="{ name: 'g1' }"
  >
    <div
      v-for="el in tasks"
      :key="el.name"
      :class="el.name"
      :style="el.css"
      @click.stop="selOne(el.id)"
      @dblclick.stop="handleDBC(el)"
      @contextmenu.prevent.stop="handleContextMenu($event, el)"
    >
      <p>{{ el.name }}</p>
      <nested-draggable :tasks="el.tasks" />
    </div>
  </draggable>
</template>
<script>
import util from "../util";
import draggable from "vuedraggable";
// 引入eleuif
// 把右键菜单搞出来，要有复制，新增，填写css
// 换掉ul=>div
// 两种模式，flex和default
// 常用的padding和margin，border，圆角
// 左侧菜单栏，扩展vantui
export default {
  props: {
    tasks: {
      required: true,
      type: Array,
    },
  },
  components: {
    draggable,
  },
  methods: {
    selOne(val) {
      util.eventbus.$emit("selOne", val);
    },
    handleDBC(el) {
      this.$prompt("请输入css", el.name, { inputValue: el.css }).then(
        ({ value }) => {
          console.log(value);
          let target = util.objectToStyleString({
            ...el.css,
            ...util.cssToJs(value),
          });
          util.eventbus.$emit("commit", { id: el.id, css: target });
        }
      );
    },
    handleContextMenu(...event) {
      // event.preventDefault(); // 阻止默认的右键菜单弹出
      console.log(event, "Right-click event triggered");
      this.$alert(event[1].name, "标题", {
        confirmButtonText: "确定",
        callback: (action) => {
          // 点击确定按钮后的回调函数
          console.log(action);
        },
      });
    },
  },
  name: "nested-draggable",
};
</script>
<style scoped>
.dragArea {
  min-height: 50px;
  outline: 1px dashed;
}
.task {
}

.chosen {
  border: solid 2px #3089dc !important;
  transition-delay: 0.5s;
}
</style>
