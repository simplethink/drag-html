<template>
  <div class="row">
    <div class="col-8">
      <h3>Nested draggable</h3>
      <nested-draggable :tasks="list" />
    </div>

  </div>
</template>

<script>
// import util from '../util';
import nestedDraggable from "./nested.vue";
export default {
  name: "nested-example",
  display: "Nested",
  order: 15,
  components: {
    nestedDraggable
  },
  //   created() {
  //   util.$on("commit",(o)=>{
  //     // o.flatMap(i=>{
  //     //   return i.tasks?[i,...i.tasks]:[i]
  //     // })

  //     this.list = this.list.map(element => {
  //       if(element.id==o.id){
  //         element.css = o.css
  //       }
  //     });
  //   })

  // },

  data() {
    return {
      count:5,
      list: [
        {
          name: "task 1",
          id:0,
          tasks: [
            {
              name: "task 2",
              id:1,
              tasks: []
            }
          ]
        },
        {
          name: "task 3",
          id:2,
          tasks: [
            {
              name: "task 4",
              id:3,
              tasks: []
            }
          ]
        },
        {
          name: "task 5",
          id:4,
          tasks: []
        }
      ]
    };
  }
};
</script>
<style scoped></style>
