<template>
<div>
    <h1>Subir arquivo</h1>
    <input type="file" name="file" id="file" ref="file">
    <button @click="sendFile">Enviar</button>
</div>
</template>

<script lang="ts">
    import {getFirebaseIdToken} from '../services/firebase-functions'
export default{
    methods:{
        async sendFile(){
            let idToken = await getFirebaseIdToken()
            let dataForm = new FormData()
            let file = this.$refs.file.files[0]
            dataForm.append('file',file)
            console.log('teste', dataForm, file)
            let res = await fetch('http://localhost:3001/upload',{
                method:'POST',
                headers:{
                    authToken:idToken,
                },
                body:dataForm
            })
            let data = await res.json()
            console.log(data)
        }
    }
}
</script>