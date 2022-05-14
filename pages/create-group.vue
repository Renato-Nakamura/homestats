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
// const teste = ()=>{
//    let tes = getUidByEmail('renato.yukio30@gmail.com')
//    console.log(tes)
// }
const add = async () => {
  const uid = await getUserUid();
  addGroup(nameGroup.value,uid, [uid]);
};
</script>
