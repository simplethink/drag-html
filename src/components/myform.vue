<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      {{ selTask.name }}
      <el-form-item v-for="(i, index) in arr" :key="index" :label="i.key">
        <el-radio-group v-model="form[i.key]">
          <el-radio v-for="j in i.value" :key="j" :label="j"></el-radio>
        </el-radio-group>
      </el-form-item>
      <pre v-html="selTask.css"></pre>
    </el-form>
  </div>
</template>

<script>
import util from "../util";
let formData = util.formData;
console.log(formData);
export default {
  data() {
    return {
      form: {
        display: "",
      },
    };
  },
  computed: {
    arr() {
      let marr = [];
      util.traverseObject(formData, marr);
      console.log(marr, "========");
      return marr;
    },
  },
  watch: {
    form: {
      deep: true,
      handler: function (val) {
        this.$emit("changeForm", val);
      },
    },
  },
  props: {
    selTask: {
      required: true,
      type: Object,
    },
  },
};
</script>
