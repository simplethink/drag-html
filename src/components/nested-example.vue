<template>
  <div class="row">
    <!-- 按钮组 -->
    <el-button-group class="save">
      <el-button @click="save" type="primary">保存</el-button>
      <el-button
        @click="list = [{ name: 'new', id: 0, css: '', tasks: [] }]"
        type="primary"
        >清空</el-button
      >
      <el-button @click="undo" type="primary">撤销</el-button>
      <el-dropdown split-button type="primary" @click="input">
        输入
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(i, key) in m"
            :key="key"
            @click.native="list = i"
            >{{ toDate(key) }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <el-button class="save output" @click="output" type="primary"
        >导出</el-button
      >
    </el-button-group>
    <!-- 预览preview -->
    <div class="col-8" id="col-8">
      <h3>Nested draggable</h3>
      <nested-draggable
        :tasks="list"
        style="
          width: 375px;
          position: relative;
          margin: auto;
          border: 3px solid black;
        "
      />
    </div>
    <!-- 右侧工具栏 -->
    <div class="col-9">
      <!-- 导航菜单 -->
      <div>
        <el-button type="" @click="showMenu = !showMenu"> 展开/收起 </el-button>
        <el-menu
          v-if="showMenu"
          :default-active="'0'"
          @select="menuSelect"
          @close="menuSelect"
        >
          <mymenu :item="i" v-for="(i, key) in list" :key="key"></mymenu>
        </el-menu>
      </div>
      <!-- 样式表 -->
      <myform @changeForm="changeForm" :selTask="selTask"></myform>
    </div>
  </div>
</template>

<script>
import util from "../util";
import nestedDraggable from "./nested.vue";
import myform from "./myform.vue";
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "../store/index";
import { list } from "../assets/js/defaultList";
import Mymenu from "./mymenu.vue";
export default {
  name: "nested-example",
  display: "Nested",
  order: 15,
  components: {
    myform,
    nestedDraggable,
    Mymenu,
  },
  created() {
    this.list = this.m[Object.keys(this.m).slice(-1)];

    util.eventbus.$on("appendChild", (o) => {
      let i = util.findAndAppend({ id: -1, tasks: [...this.list] }, o.id);
      console.log(i);
      this.list = i.tasks;
    });
    util.eventbus.$on("selOne", (id) => {
      this.selIndex = id;
    });
    util.eventbus.$on("delItem", (o) => {
      let i = util.findAndDelIt({ id: -1, tasks: [...this.list] }, o.id);
      console.log(i);
      this.list = i.tasks;
    });

    util.eventbus.$on("复制", (o) => {
      let i = util.findAndCopyNode({ id: -1, tasks: [...this.list] }, o);
      this.list = i.tasks;
      console.log(i);
    });
    util.eventbus.$on("commit", (o) => {
      // o.flatMap(i=>{
      //   return i.tasks?[i,...i.tasks]:[i]
      // })
      console.log(this.list);
      this.list = util.findAndCssIt(
        { id: -1, tasks: [...this.list] },
        o.id,
        o
      ).tasks;

      //暂存
      util.setCacheTemp(this.list);
    });
  },
  computed: {
    ...mapState(useCounterStore, { m: "count" }),
    selTask() {
      return util.findNodeById(this.list, this.selIndex);
    },
  },

  methods: {
    undo() {
      let i = util.getCache("tempHD");
      this.list = i.pop();
    },
    menuSelect(id) {
      let a = document.querySelector(".c" + id).classList;
      a.add("border-animation");
      setTimeout(() => {
        a.remove("border-animation");
      }, 2000);
      this.selIndex = id;
    },
    toDate(val) {
      return new Date(val.substr(3) - 0).toString().substr(4, 14);
    },
    ...mapActions(useCounterStore, { moar: "increment", setIt: "setCount" }),
    handleCommand(i, key) {
      this.$message("click on item " + i + key);
    },
    input() {
      // function getClipboardContent() {
      //   return navigator.clipboard.readText();
      // }
      // getClipboardContent().then((i) => {
      //   console.log(i);
      //   this.list = JSON.parse(i);
      // });
      this.$prompt("nothing", {
        inputType: "textarea",
        closeOnPressEscape: true,
        inputValue: JSON.stringify(this.m[Object.keys(this.m).slice(-1)]),
      }).then(({ value: val }) => {
        this.list = JSON.parse(val);
      });
    },
    output() {
      let cssArr = {};
      util.onlyForeach({ id: -1, tasks: [...this.list] }, (node) => {
        cssArr[node.id] = node.css;
      });
      let cssStr = Object.keys(cssArr).reduce((sum, currentKey) => {
        if (cssArr[currentKey])
          return sum + `.c${currentKey}{${cssArr[currentKey]}}`;
        else return sum;
      }, "");
      cssStr = `<style>${cssStr}</style>`;
      console.log(cssStr, util.objectReduce({ id: -1, tasks: [...this.list] }));
    },
    save() {
      let self = this;
      // 保存到localstorage
      util.setCache(this.list);
      //复制到剪切板
      (function (s) {
        document.oncopy = function (e) {
          e.clipboardData.setData("text", s);
          const h = self.$createElement;

          self.$notify({
            title: "标题名称",
            message: h("i", { style: "color: teal" }, "已复制到剪切板。"),
          });
          e.preventDefault();
          document.oncopy = null;
        };
      })(JSON.stringify(self.list));
      document.execCommand("Copy");
    },
    changeForm({ css, tag }) {
      let sel = this.selTask;
      if (!sel) return;
      if (css) {
        // 合并css
        sel.css = util.objectToStyleString({
          ...util.cssToJs(sel.css),
          ...css,
        });
      }
      if (tag) sel.tag = tag;
      this.list = [...this.list];
      //暂存
      util.setCacheTemp(this.list);
    },
  },

  data() {
    return {
      showMenu: false,
      selIndex: 0,
      history: [],
      list,
    };
  },
};
</script>
<style>
.row {
  display: flex;

  align-items: flex-start;
  justify-content: space-between;
}
.col-9 {
  width: 375px;
}
.col-8 {
  flex-grow: 1;
}
.save {
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  padding: 0.4em;
}
</style>
