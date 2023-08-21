<template>
  <div class="row">
    <div class="col-8">
      <h3>Nested draggable</h3>
      <nested-draggable :tasks="list" style="width: 375px; margin: auto" />
    </div>
    <div class="col-9">
      <el-form ref="form" :model="form" label-width="80px">
        {{ selTask.name }}
        <el-form-item label="display">
          <el-radio-group v-model="form.display">
            <el-radio label="default"></el-radio>
            <el-radio label="flex"></el-radio>
          </el-radio-group>
        </el-form-item>
        <pre v-html="selTask.css"></pre>
      </el-form>
    </div>
  </div>
</template>

<script>
import util from "../util";
import nestedDraggable from "./nested.vue";
export default {
  name: "nested-example",
  display: "Nested",
  order: 15,
  components: {
    nestedDraggable,
  },
  created() {
    util.eventbus.$on("selOne", (id) => {
      this.selIndex = id;
    });
    util.eventbus.$on("commit", (o) => {
      // o.flatMap(i=>{
      //   return i.tasks?[i,...i.tasks]:[i]
      // })
      console.log(this.list);
      this.list = this.list.map((element) => {
        console.log(element);
        if (element.id == o.id) {
          element.css = o.css;
        }
        return element;
      });
    });
  },
  computed: {
    selTask() {
      return util.findNodeById(this.list, this.selIndex);
    },
  },
  watch: {
    form: {
      deep: true,
      handler: function (val) {
        let sel = this.selTask;
        sel.css = util.objectToStyleString({
          ...util.cssToJs(sel.css),
          ...val,
        });
        this.list = [...this.list];
      },
    },
  },
  data() {
    return {
      selIndex: 0,
      form: {
        display: "",
      },
      list: [
        {
          name: "task 1",
          id: 0,
          css: "",
          tasks: [
            {
              name: "task 2",
              id: 1,
              css: "",
              tasks: [],
            },
          ],
        },
        {
          name: "task 3",
          id: 2,
          css: "",
          tasks: [
            {
              name: "task 4",
              id: 3,
              css: "",
              tasks: [],
            },
          ],
        },
        {
          name: "task 5",
          id: 4,
          css: "",
          tasks: [],
        },
      ],
    };
  },
};
</script>
<style scoped>
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
</style>
