import Vue from "vue";

export default class util {
  constructor() {}
  static eventbus = new Vue();

  static findNodeById(nodes, id) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      if (node.id === id) {
        return node;
      }

      if (node.tasks && node.tasks.length > 0) {
        const result = this.findNodeById(node.tasks, id);
        if (result) {
          return result;
        }
      }
    }

    return null;
  }
  static objectToStyleString = (obj) => {
    let styleString = "";

    for (let key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        let value = obj[key];
        styleString += key + ": " + value + ";\n";
      }
    }

    return styleString.trim(); // 删除末尾的额外空格
  };

  static cssToJs = (cssString) => {
    // 将CSS字符串分割成每个样式的数组
    var cssArray = cssString.split(";");

    // 创建一个空对象来存储转换后的样式
    var cssObj = {};

    // 遍历每个样式
    for (var i = 0; i < cssArray.length; i++) {
      // 去除样式字符串的空格
      var style = cssArray[i].trim();

      // 确保样式不是空字符串
      if (style !== "") {
        // 分割样式属性和值
        var parts = style.split(":");

        // 去除属性和值的空格
        var property = parts[0].trim();
        var value = parts[1].trim();

        // 将样式属性和值添加到对象中
        cssObj[property] = value;
      }
    }

    // 返回转换后的JavaScript对象
    return cssObj;
  };

  static formData = {
    display: {
      default: [],
      flex: {
        "flex-direction": ["row", "column"],
        "flex-wrap": ["nowrap", "wrap"],
        "align-content": [
          "normal",
          "center",
          "flex-start",
          "flex-end",
          "space-around",
          "space-between",
        ],
        "justify-content": [
          "normal",
          "center",
          "flex-start",
          "flex-end",
          "space-around",
          "space-between",
          "space-evenly",
        ],
        "align-items": ["normal", "center", "flex-start", "flex-end"],
      },
    },
  };

  static traverseObject = (obj,arr)=> {
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];

        if (Array.isArray(value)) {
          console.log(value); // 打印数组
          arr.splice(-1,0,{key,value})
        } else if (typeof value === "object" && value !== null) {
          arr.splice(-1,0,{key,value:Object.keys(value)})
          this.traverseObject(value,arr); // 递归遍历对象
        } else if (value === "") {
          console.log("Empty string"); // 打印空字符串
        }
      }
    }
  };
}
