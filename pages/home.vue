<template>
  <div>
    <NavBar />
    <Nuxt-link :to="{ path: 'upload-file', query: { group: groupSelected } }"
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
          <div>
            <select
              v-model="groupSelected"
              :required="true"
              @change="getGroupData"
            >
              <option
                :value="g"
                class="groups"
                v-for="g in groupsName"
                :key="g"
              >
                <img src="icon" alt="" />
                <h2>{{ g.replace(regex, "") }}</h2>
                <div class="linha"></div>
              </option>
            </select>
            <Nuxt-link to="create-group">
              <button class="rounded-lg font-semibold">+ Criar grupo</button>
            </Nuxt-link>
          </div>
          <Nuxt-link
            :to="{ path: 'upload-file', query: { group: groupSelected } }"
          >
            <button
              class="bg-zinc-800 text-white rounded-lg px-3 py-1 ml-auto font-semibold"
            >
              Subir arquivo
            </button>
          </Nuxt-link>
        </div>
        <div class="bg-zinc-200 mt-5 p-5 rounded">
          <canvas id="mainGraph"></canvas>
          <!-- grafico com gastos por mes
          grafico com os gastos por pessoa por mes
          gastos por categoria -->
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { Data } from "~~/composables/sliptwise-data";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
const groupSelected = ref("");
const groupsExists = ref(false);
const groupsName = ref([]);
// const mainGraph = ref(null)
const regex = /\_.*/;
const ctx = "mainGraph";
let groupData: Data;
let mainChart:Chart;
let groups;
async function getGroups() {
  groups = await getGroupsByUid();
  groupsExists.value = groups.length > 0;
  groups.forEach((group) => {
    groupsName.value.push(group.id);
  });
  groupSelected.value = groupsName.value[0];
}

function getGroupInfo() {
  let index = groupsName.value.indexOf(groupSelected.value);
  let group = groups[index];
  return group.data();
}

getGroups().then(getGroupData);

async function getGroupData() {
  let jsonData = await getRecentJsonData(groupSelected.value);
  if (!jsonData) return;
  console.log("data", mainChart);
  groupData = new Data(jsonData.data);
  // const totalMonthExpenses = groupData.totalMonthExpenses();
  const totalMonthExpenses = groupData.dayExpenses();
  console.log(totalMonthExpenses)

  mainChart = new Chart(ctx, { 
    type: "line",
    data: { 
      labels: totalMonthExpenses.labels,
      datasets: [
        {
          label: "Custo total por mês",
          data: totalMonthExpenses.data,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
        
      ],
    },
    options:{
      plugins:{
        tooltip:{
          callbacks:{
            title: function(){
              return 'oioi'
            }
          }
        }
      }
    }
  });
}
</script>
