<template>
  <div class="row">
    <div class="col-8">
      <h3>Nested draggable</h3>
      <nested-draggable :tasks="list" style="width: 375px; margin: auto;border:3px solid black" />
    </div>
    <div class="col-9">
      <myform @changeForm="changeForm" :selTask="selTask"></myform>
    </div>
  </div>
</template>

<script>
import util from "../util";
import nestedDraggable from "./nested.vue";
import myform from "./myform.vue";
export default {
  name: "nested-example",
  display: "Nested",
  order: 15,
  components: {
    myform,
    nestedDraggable,
  },
  created() {
    util.eventbus.$on("selOne", (id) => {
      this.selIndex = id;
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
  methods: {
    changeForm(val) {
      let sel = this.selTask;
      sel.css = util.objectToStyleString({
        ...util.cssToJs(sel.css),
        ...val,
      });
      this.list = [...this.list];
    },
  },

  data() {
    return {
      selIndex: 0,

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
