<template>
  <div class="flex justify-center items-center h-screen">
    <div class="rounded shadow-lg w-1/3 p-5">
      <h1>Subir arquivo</h1>
      <input
        class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        type="file"
        name="file"
        id="file"
        @change="updateFile"
      />
      <button class="bg-zinc-800 text-white rounded-lg px-3 py-1 font-semibold" @click="sendFile">Enviar</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
let file;
function updateFile(e) {
  file = e.target.files[0];
}

async function sendFile() {
  let idToken = await getFirebaseIdToken();
  let dataForm = new FormData();
  dataForm.append("file", file);
  console.log("teste", idToken);
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
