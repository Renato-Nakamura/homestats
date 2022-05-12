<template>
  <div>
    <header class="flex justify-center md:justify-between px-10 py-5">
      <Logo />
      <div class=" hidden md:block flex items-center text-lg">
        <span class="mx-1">LinkedIn</span>
        <span class="mx-1">Sobre</span>
      </div>
    </header>
    <main class="flex justify-center lg:py-10 ">
      <section class="flex justify-center xl:container">
        <div class="z-10 px-5 md:w-5/12 lg:px-20 md:py-10 gap-4 flex flex-col">
          <h1 class="text-5xl font-bold">
            Entender suas finanças nunca foi tão fácil
          </h1>
          <p class="text-zinc-600">
            Com HomeStats você consegue visualizar os números e entender cada
            ponto. Nunca mais encare uma planilha por horas, envie o seu csv
            para o HomeStats e veja todos os seus gastos mensais e o histórico
            para ter certeza da sua economia!
          </p>
          <span class="text-zinc-600">Experimente gratuitamente agora</span>
          <button
          @click="login"
            class="mt-auto w-full md:w-3/5 bg-zinc-800 text-white rounded-lg px-3 py-1 ml-auto font-semibold"
          >
            Entrar com o Google
          </button>
        </div>
        <figure class="top-1/3 absolute md:relative py-10 md:w-5/12 ">
          <img
            class="w-full md:w-10/12 opacity-20 md:opacity-70 m-auto md:max-w-xl lg:mr-20"
            src="~/assets/img/graph.png"
            alt=""
          />
        </figure>
      </section>
    </main>
  </div>
</template>

<script lang="ts" setup>
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
