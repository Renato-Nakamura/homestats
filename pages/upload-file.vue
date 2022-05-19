<template>
  <div class="flex justify-center items-center h-screen background">
    <div class="rounded shadow-lg md: w-1/3 p-5 flex flex-col items-center gap-5 h-2/3 justify-around bg-white">
      <h1 class="text-2xl">Subir arquivo</h1>
      <input
        class="block text-sm text-slate-500 file:mr-4 w-full file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        type="file"
        name="file"
        id="file"
        @change="updateFile"
      />
      <div>
        <Nuxt-link to="home">Voltar</Nuxt-link>
        <button class="ml-5 bg-zinc-800 text-white rounded-lg px-3 py-1 font-semibold" @click="sendFile">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
console.log(route.query)
let file;
function updateFile(e) {
  file = e.target.files[0];
}

async function sendFile() {
  let idToken = await getFirebaseIdToken();
  let dataForm = new FormData();
  dataForm.append("file", file);
  dataForm.append("groupUid", route.query.toString());
  let res = await fetch("http://localhost:3001/upload", {
    method: "POST",
    headers: {
      authToken: idToken,
    },
    body: dataForm,
  });
  let data = await res.json();
  console.log(data);
}
</script>

<style >
.background{
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%,rgba(255, 255, 255, 0.6) 100%),url('../assets/img/graph.png');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>