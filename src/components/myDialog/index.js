import Vue from "vue";
import mydialog from "./mydialog.vue";

const Mydialog = Vue.extend(mydialog);
let instance;

export default {
  open(el) {
    if (!instance) {
      instance = new Mydialog({
        el: document.createElement("div"),
      });
    }
    if (instance.dialogVisible) return;
    document.body.appendChild(instance.$el);

    Vue.nextTick(() => {
       instance.dialogVisible = true;
      instance.cssVal = el.css;
      instance.txtVal = el.name;
      instance.item = el;
    });
  },

  close() {
    if (instance) {
      instance.dialogVisible = false;
    }
  },
};
// export default Indicator;
