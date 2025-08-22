<template>
  <div>
    <h2>姓名：{{name}}</h2>
    <button @click="changeName">修改名字</button>
    <el-button type="primary">按钮</el-button>
    <el-icon>
      <basketball />
    </el-icon>

  </div>
  
</template>

<script setup>
import { ref } from 'vue'
  let name = ref('HelloWorld')
  function changeName(){
    name.value = 'World'
  }

</script>



<style lang = "less"scoped>

</style>
