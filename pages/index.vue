<template>
    <div>
        <header class="">
            <h1 @click="teste++" class="text-sm text-gray-500">Landing Page {{teste}}</h1>
            <button class="bg-sky-500 rounded p-1 text-white font-medium"  @click="login">Login com Google</button>
        </header>
        <nuxt-link to="upload-file"> Subir arquivo</nuxt-link>
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
const teste = ref(0)
const login = ()=> loginPopUp()
</script>