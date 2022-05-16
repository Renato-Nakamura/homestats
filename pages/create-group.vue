<template>
  <div class="flex justify-center items-center h-screen">
    <div class="rounded shadow-lg w-1/3 p-5 flex flex-col items-center gap-5">
      <h1>Criar um novo grupo</h1>
      <form>
        <input class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" type="text" placeholder="Nome do grupo" v-model="nameGroup" />
      </form>
      <button class="bg-zinc-800 text-white rounded-lg px-3 py-1 font-semibold" @click="add">Criar</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
let nameGroup = ref("");
const add = async () => {
  addGroup(nameGroup.value).then((a) => console.log(a));
};
</script>
