<template>
  <div>
    <h1>Criar um novo grupo</h1>
    <form>
      <input type="text" placeholder="Nome do grupo" v-model="nameGroup" />
    </form>
    <button @click="add">Criar</button>
  </div>
</template>

<script lang="ts" setup>
let nameGroup = ref("");
const add = async () => {
  addGroup(nameGroup.value).then((a)=>console.log(a));
};
</script>
