<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" size="mini">
      {{ "id:" + selTask.id }}
      <el-form-item label="tag">
        <el-radio-group v-model="tag">
          <el-radio label="img"> </el-radio>
          <el-radio label="div"> </el-radio>
          <el-radio label="span"> </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-for="(i, index) in arr" :key="index" :label="i.key">
        <el-radio-group v-model="form[i.key]">
          <el-radio v-for="j in i.value" :key="j" :label="j"></el-radio>
        </el-radio-group>
      </el-form-item>
      <pre v-html="selTask.css" @dblclick="handleDB"></pre>
    </el-form>
  </div>
</template>

<script>
import util from "../util";
import mydialog from './myDialog';
let unwatch = () => {};
export default {
  data() {
    return {
      tag: "div",
      form: {},
    };
  },
  methods: {
    handleDB(){
      mydialog.open(this.selTask)
    },
    init() {
      if (!this.selTask) return;
      unwatch();
      this.form = util.cssToJs(this.selTask.css);

      unwatch = this.$watch(
        "form",
        function (val) {
          this.$emit("changeForm", { css: val });
          console.log(1111111);
        },
        { deep: true }
      );

      this.tag = this.selTask.tag || "div";
    },
  },
  computed: {
    arr() {
      let marr = [];
      util.traverseObject.call(this, null, marr, this.form.display);
      return marr;
    },
  },
  watch: {
    selTask() {
      this.init();
    },
    tag(val) {
      this.$emit("changeForm", { tag: val });
    },
  },
  props: {
    selTask: {
      required: true,
      type: [Object, Boolean],
    },
  },
};
</script>
