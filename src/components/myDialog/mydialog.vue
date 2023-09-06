<template>
  <div>
    <el-dialog
      title="提示"
      append-to-body
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-button type="danger" @click="delItem">删 除</el-button>
      <el-button @click="appendChild">生蛋</el-button>
      <el-button type="warn" @click="copyEle">复制</el-button>
      <el-input v-model="txtVal" placeholder="输入文本"></el-input>
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 14 }"
        v-model="cssVal"
        placeholder=""
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cmtCss">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import util from "../../util";
export default {
  data() {
    return {
      cssVal: "",
      txtVal: "",
      item: {},
      dialogVisible: false,
    };
  },

  methods: {
    appendChild() {
      this.dialogVisible = false;
      util.eventbus.$emit("appendChild", { id: this.item.id });
    },
    delItem() {
      this.$alert("确认删除？").then(() => {
        this.dialogVisible = false;
        util.eventbus.$emit("delItem", { id: this.item.id });
      });
    },
    cmtCss() {
      this.dialogVisible = false;
      let target = util.objectToStyleString({
        // ...util.cssToJs(this.item.css),
        ...util.cssToJs(this.cssVal),
      });
      util.eventbus.$emit("commit", {
        id: this.item.id,
        css: target,
        name: this.txtVal,
      });
    },

    copyEle() {
      util.eventbus.$emit("复制", this.item.id);
    },
  },
};
</script>
