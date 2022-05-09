<template>
    <div>
        <header>
            <h1>Landing Page {{teste}}</h1>
            <button @click="loginPopUp">Login com Google</button>
        </header>
    </div>
</template>

<script lang="ts">
import loginPopUp from '../services/firebase-functions'
export default {
    data(){
        return{
            teste:0
        }
    },
    methods: {
        click(){
            this.teste++
        },
        loginPopUp
    }
}
</script>