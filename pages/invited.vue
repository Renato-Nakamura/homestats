<template>
  <div class="flex justify-center items-center h-screen background">
    <div v-if="group" class="rounded shadow-lg md: w-1/3 p-5 flex flex-col items-center gap-5 h-2/3 justify-around bg-white">
      <h1 class="text-2xl">Voce foi convidado para entrar no grupo: {{group.replace(regex, "")}}</h1>
      <div>
          <button
          @click="loginGoogle"
            class="mt-auto w-full bg-zinc-800 text-white rounded-lg px-3 py-1 font-semibold"
          >
            Entrar com o Google
          </button>
      </div>
    </div>
    <div v-if="!group" class="rounded shadow-lg md: w-1/3 p-5 flex flex-col items-center gap-5 h-2/3 justify-around bg-white">
    <h1 class="text-2xl">Convite invalido :(</h1>
    <h2 class="text-xl">peça o link novamente para o dono do grupo</h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
const regex = /\_.*/;

const routes = useRoute()
const group = routes.query.group
console.log(group)
const loginGoogle =async () => {
  const res = await loginPopUp(group);
  console.log(res)
  }




</script>
