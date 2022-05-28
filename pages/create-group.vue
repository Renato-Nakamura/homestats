<template>
  <div class="background flex justify-center items-center h-screen">
    <div class="rounded shadow-lg md:w-1/3 p-5 flex flex-col items-center gap-5 bg-white h-2/3 justify-around">
      <h1 class="text-2xl text-center">Criar um novo grupo</h1>
      <form>
        <input class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" type="text" placeholder="Nome do grupo" v-model="nameGroup" />
        <input class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" type="text" placeholder="Convidar" v-model="emails" />

      </form>
      <div v-if="link">
        <input type="text" readonly v-model="link">
        <button>Compartilhar</button>
      </div>
      <div>
        <Nuxt-link to="home">Voltar</Nuxt-link>
        <button class=" ml-5 bg-zinc-800 text-white rounded-lg px-3 py-1 font-semibold" @click="add">Criar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
let nameGroup = ref("");
let emails = ref("");
let link = ref("");

const add = async () => {
  // const routes = useRoute()
  let invited = emails.value.split(',')
  // console.log(routes.path)
  addGroup(nameGroup.value,invited).then((a) => {
    link.value = "https://homefinancialstats.web.app/invited?group="+a.toString()
  });
};
</script>
