<template>
  <div>
    <NavBar />
    <Nuxt-link to="/upload-file">Subir</Nuxt-link>
    <Nuxt-link to="/create-group">Grupos</Nuxt-link>
    <main class="flex justify-center">
      <div
        class="rounded bg-zinc-200 shadow-lg text-lg w-2/3 p-5"
        v-if="!groups.length"
      >
        <h2>
          Parece que você ainda não possui nenhum grupo! <br />
          Crie o seu primeiro aqui:
        </h2>
        <Nuxt-link to="create-group">
          <button
            class="mt-5 bg-zinc-800 text-white rounded-lg px-3 py-1 ml-auto font-semibold"
          >
            Criar
          </button>
        </Nuxt-link>
      </div>
      <div v-if="groups.length" class="w-2/3">
        <div class="cabecalho flex justify-between items-center">
          <div>
            <img src="icon" alt="" />
            <h2>Meu grupo 1</h2>
            <div class="linha"></div>
            <Nuxt-link to="create-group" class="hidden">
              <button
                class=" bg-zinc-800 text-white rounded-lg px-3 py-1 ml-auto font-semibold"
              >
                + Criar grupo
              </button>
            </Nuxt-link>
          </div>
          <Nuxt-link to="upload-file" >
            <button
              class=" bg-zinc-800 text-white rounded-lg px-3 py-1 ml-auto font-semibold"
            >
              Subir arquivo
            </button>
          </Nuxt-link>
        </div>
        <div class="bg-zinc-200 mt-5 p-5 rounded">Grafico</div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
let groups = ref([12]);
</script>
