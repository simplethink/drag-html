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
    width: { "100%": "", "40px": "" },
    height: { "100%": "", auto: "" },
    margin: { auto: "", unset: "" },
    position: {
      absolute: [
        { left: { 0: "" } },
        { right: { 0: "" } },
        { top: { 0: "" } },
        { bottom: { 0: "" } },
      ],
      relative: "",
    },
    display: {
      block: [],
      flex: [
        { "flex-direction": { row: "", column: "" } },
        {
          "justify-content": {
            normal: "",
            center: "",
            "flex-start": "",
            "flex-end": "",
            "space-around": "",
            "space-between": "",
            "space-evenly": "",
          },
        },
        {
          "align-items": {
            normal: "",
            center: "",
            "flex-start": "",
            "flex-end": "",
          },
        },
        { "flex-wrap": { nowrap: "", wrap: "" } },
        {
          "align-content": {
            normal: "",
            center: "",
            "flex-start": "",
            "flex-end": "",
            "space-around": "",
            "space-between": "",
          },
        },
      ],
    },
  };

  static traverseObject = function (obj, arr, targetKey) {
    if (!obj) obj = util.formData;
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (Array.isArray(value)) {
          if (targetKey != key) continue;
          value.forEach((element) => {
            util.traverseObject.call(this, element, arr);
          });
        } else if (typeof value === "object" && value !== null) {
          arr.push({ key, value: Object.keys(value) });
          util.traverseObject.call(this, value, arr, this.form[key]); // 递归遍历对象
        } else if (value === "") {
          // console.log("Empty string"); // 打印空字符串
        }
      }
    }
  };

  static findAndDoThings = function (data, id, cb) {
    // 递归遍历嵌套数据
    function traverse(node, parent, key) {
      if (node.id === id) {
        cb(node, parent, key);
        return true;
      }
      if (node.tasks) {
        for (let i = 0; i < node.tasks.length; i++) {
          if (traverse(node.tasks[i], node.tasks, i)) {
            return true;
          }
        }
      }
      return false;
    }
    function copyObj(o) {
      return JSON.parse(JSON.stringify(o));
    }

    data = copyObj(data);
    // 调用遍历函数
    traverse(data, null, null);

    return data;
  };
  static onlyForeach = function (data, cb) {
    // 递归遍历嵌套数据
    function traverse(node, parent, key) {
      cb(node, parent, key);
      if (node.tasks) {
        for (let i = 0; i < node.tasks.length; i++) {
          if (traverse(node.tasks[i], node.tasks, i)) {
            return true;
          }
        }
      }
      return false;
    }
    function copyObj(o) {
      return JSON.parse(JSON.stringify(o));
    }

    data = copyObj(data);
    // 调用遍历函数
    traverse(data, null, null);

    return data;
  };

  static objectReduce = function (data) {
    // 递归遍历嵌套数据
    function traverse(node) {
      let target = "";
      let children = "";
      if (node.tasks) {
        for (let i = 0; i < node.tasks.length; i++) {
          children += traverse(node.tasks[i]);
        }
        target = `<div class='c${node.id}'> ${children}</div>`;
      } else {
        console.log("没有tasks，list格式有问题");
      }
      return target;
    }
    function copyObj(o) {
      return JSON.parse(JSON.stringify(o));
    }

    data = copyObj(data);
    // 调用遍历函数
    return traverse(data, null, null);
  };

  static findAndCopyNode = function (data, id) {
    function deepCopyWithIdModification(obj) {
      if (typeof obj !== "object" || obj === null) {
        return obj;
      }

      let copiedObject = Array.isArray(obj) ? [] : {};

      for (let key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
          copiedObject[key] = deepCopyWithIdModification(obj[key]);
        }
      }

      // 修改id
      // eslint-disable-next-line no-prototype-builtins
      if (copiedObject.hasOwnProperty("id")) {
        copiedObject.id = Date.now();
      }

      return copiedObject;
    }
    data = util.findAndDoThings(data, id, (node, parent, key) => {
      const newNode = deepCopyWithIdModification(node);
      // 添加到节点所在数组的下一个索引位置
      parent.splice(key + 1, 0, newNode);
    });

    return data;
  };
  static findAndCssIt = function (data, id, o) {
    data = util.findAndDoThings(data, id, (node) => {
      node.name = o.name;
      node.css = o.css;
    });
    return data;
  };
  static findAndDelIt = function (data, id) {
    data = util.findAndDoThings(data, id, (node, parent, key) => {
      parent.splice(key, 1);
    });
    return data;
  };

  static getCache(sessionKey) {
    sessionKey = "dragh5";
    if (localStorage.getItem(sessionKey)) {
      let data = JSON.parse(localStorage.getItem(sessionKey));
      return data;
    } else {
      return false;
    }
  }
  static setCache(sessionKey, obj) {
    if (!obj) {
      obj = sessionKey;
      sessionKey = "dragh5";
    }
    obj = { ["ver" + Date.now()]: obj };
    if (localStorage.getItem(sessionKey)) {
      let mainMsgInfo = JSON.parse(localStorage.getItem(sessionKey));
      mainMsgInfo = {
        ...mainMsgInfo,
        ...obj,
      };
      localStorage.setItem(sessionKey, JSON.stringify(mainMsgInfo));
    } else {
      localStorage.setItem(sessionKey, JSON.stringify(obj));
    }
  }
}
