<template>
  <draggable
    class="dragArea"
    :tag="($attrs.item && $attrs.item.tag) || 'div'"
    chosen-class="chosen"
    :list="tasks"
    :group="{ name: 'g1' }"
  >
    {{ $attrs.text }}
    <nested-draggable
      :item="el"
      :tasks="el.tasks"
      :src="require('../assets/ab.png')"
      v-for="el in tasks"
      :key="el.id"
      :class="'c' + el.id"
      :text="el.name"
      :style="el.css"
      @click.native.stop="selOne(el.id)"
      @dblclick.native.stop="handleDBC(el)"
      @contextmenu.native.prevent.stop="handleContextMenu($event, el)"
    >
    </nested-draggable>
  </draggable>
</template>
<script>
import util from "../util";
import draggable from "vuedraggable";
import myDialog from "./myDialog";

// import img from "../assets/aa.png";
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
  data() {
    return {
      cssVal: "",
      txtVal: "",
      item: {},
      dialogVisible: false,
    };
  },
  components: {
    draggable,
  },
  methods: {
    selOne(val) {
      this.dialogVisible = false;
      util.eventbus.$emit("selOne", val);
    },
    handleDBC(el) {
      myDialog.open(el);
    },
    handleContextMenu(...event) {
      // event.preventDefault(); // 阻止默认的右键菜单弹出
      console.log(event, "Right-click event triggered");
      util.eventbus.$emit("复制", event[1].id);
    },
  },
  name: "nested-draggable",
};
</script>
<style>
#col-8 > .dragArea {
  height: fit-content;
}
.dragArea {
  /* height: 50px; */
  outline: 1px dashed;
  box-sizing: border-box;
}
.dragArea::before {
  /* content:'正' */
}
.task {
  margin-top: 1em;
  border: solid 1px transparent !important;
  width: 40px;
  /* height: 10px; */
}

.chosen {
  border: solid 2px #3089dc !important;
  transition-delay: 0.5s;
}
</style>
