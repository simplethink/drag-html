<template>
  <el-menu-item
  @mouseover.native="showthing"
    v-if="$attrs.item.tasks.length == 0"
    :index="$attrs.item.id + ''"
    >{{ $attrs.item.id }}</el-menu-item
  >

  <el-submenu v-else :index="$attrs.item.id + ''">
    <template slot="title">{{ $attrs.item.id }}</template>
    <mymenu :item="i" v-for="(i, key) in $attrs.item.tasks" :key="key"></mymenu>
  </el-submenu>
</template>

<script>
export default {
  name: "mymenu",
  methods: {
    showthing(){console.log(1111111111);}
  },
};
</script>
<style>
.el-submenu {
  text-align: left;
}
</style>
