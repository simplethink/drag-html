<template>
  <draggable
    class="dragArea"
    tag="div"
    chosen-class="chosen"
    :list="tasks"
    :group="{ name: 'g1' }"
  >
    {{ $attrs.text }}
    <nested-draggable
      :tasks="el.tasks"
      v-for="el in tasks"
      :key="el.id"
      :class="el.name"
      :text="el.name"
      :style="el.css"
      @click.native.stop="selOne(el.id)"
      @dblclick.native.stop="handleDBC(el)"
      @contextmenu.native.prevent.stop="handleContextMenu($event, el)"
    >
    </nested-draggable>
    <el-dialog
      title="提示"
      append-to-body
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-input v-model="txtVal" placeholder="输入文本"></el-input>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 14 }"
        v-model="cssVal"
        placeholder=""
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delItem">删 除</el-button>
        <el-button type="primary" @click="cmtCss">确 定</el-button>
      </span>
    </el-dialog>
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
  data() {
    return {
      cssVal: "",
      txtVal:"",
      item: {},
      dialogVisible: false,
    };
  },
  components: {
    draggable,
  },
  methods: {
    selOne(val) {
      util.eventbus.$emit("selOne", val);
    },
    delItem() {
      this.dialogVisible = false;
      util.eventbus.$emit("delItem", { id: this.item.id });
    },
    cmtCss() {
      this.dialogVisible = false;
      let target = util.objectToStyleString({
        // ...util.cssToJs(this.item.css),
        ...util.cssToJs(this.cssVal),
      });
      util.eventbus.$emit("commit", { id: this.item.id, css: target,name:this.txtVal });
    },
    handleDBC(el) {
      this.dialogVisible = true;
      this.cssVal = el.css;
      this.txtVal = el.name;
      
      this.item = el;
      // this.$prompt("请输入css", el.name, { inputValue: el.css }).then(
      //   ({ value }) => {
      //     console.log(value);
      //     let target = util.objectToStyleString({
      //       ...util.cssToJs(el.css),
      //       ...util.cssToJs(value),
      //     });
      //     util.eventbus.$emit("commit", { id: el.id, css: target });
      //   }
      // );
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
  height: 50px;
  outline: 1px dashed;
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
