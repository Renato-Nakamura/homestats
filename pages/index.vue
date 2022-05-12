<template>
  <div>
    <header class="flex justify-between px-10 py-5">
      <Logo />
      <div class="flex items-center text-lg">
          <span class="mx-1">LinkedIn</span> 
          <span class="mx-1">Sobre</span>
      </div>
    </header>
    <main>
        <section class="flex justify-center">
            <div class="w-5/12 px-20 py-10 gap-4 flex flex-col">
                <h1 class="text-5xl font-bold">Entender suas finanças nunca foi tão fácil</h1>
                <p>Com HomeStats você consegue visualizar os números e entender cada ponto.
                Nunca mais encare uma planilha por horas, envie o seu csv para o HomeStats e veja todos os seus gastos mensais e o histórico para ter certeza da sua economia!
                </p>
                <span>Experimente gratuitamente agora</span>
                <button class="bg-zinc-800 text-white rounded-lg  px-3 py-1 ml-auto font-semibold">Entrar com o Google</button>
            </div>
            <figure class="py-10 w-5/12">
                <img class="w-10/12 opacity-70 max-w-xl mr-20" src="../assets/img/graph.png" alt="">
            </figure>
        </section>
    </main>
  </div>
</template>

<script lang="ts" setup>
import Logo from "~~/components/Logo.vue";
// import {loginPopUp} from '../services/firebase-functions'
// export default {
//     data(){
//         return{
//             teste:0
//         }
//     },
//     methods: {
//         click(){
//             this.teste++
//         },
//         loginPopUp()
//     }

// }
// const teste = ref(0)
const login = () => loginPopUp();
</script>
