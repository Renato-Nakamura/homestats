<template>
  <div>
    <NavBar />
    <Nuxt-link :to="{ path: 'upload-file', query: { group: testes } }"
      >Subir</Nuxt-link
    >
    <Nuxt-link to="/create-group">Grupos</Nuxt-link>
    <main class="flex justify-center">
      <div
        class="rounded bg-zinc-200 shadow-lg text-lg w-2/3 p-5"
        v-show="!groupsExists"
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
      <div v-show="groupsExists" class="w-2/3">
        <div class="cabecalho flex justify-between items-center">
          <select v-model="testes" :required="true">
            <option :value="g" class="groups" v-for="g in groupsName" :key="g">
              <img src="icon" alt="" />
              <h2>{{ g.replace(regex, "") }}</h2>
              <div class="linha"></div>
            </option>
            <Nuxt-link to="create-group" >
              <button
                class="bg-zinc-800 text-white rounded-lg px-3 py-1 ml-auto font-semibold"
              >
                + Criar grupo
              </button>
            </Nuxt-link>
          </select>
          <Nuxt-link :to="{ path: 'upload-file', query: { group: testes } }">
            <button
              class="bg-zinc-800 text-white rounded-lg px-3 py-1 ml-auto font-semibold"
            >
              Subir arquivo
            </button>
          </Nuxt-link>
        </div>
        <div class="bg-zinc-200 mt-5 p-5 rounded">Grafico</div>
      </div>
    </main>
    {{ groupsName }}
    <button @click="teste">aaa</button>
  </div>
</template>

<script lang="ts" setup>
const testes = ref("");
let regex = /\_.*/;
const groupsExists = ref(false);
const groupsName = ref([]);

let groups;
async function getGroups() {
  groups = await getGroupsByUid();
  console.log("a", groups.length);
  groupsExists.value = groups.length > 0;
  groups.forEach((group) => {
    groupsName.value.push(group.id);
  });
  testes.value = groupsName.value[0];
}
getGroups();
</script>
