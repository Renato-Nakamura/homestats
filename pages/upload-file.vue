<template>
<div>
    <h1>Subir arquivo</h1>
    <input type="file" name="file" id="file" ref="file">
    <button @click="sendFile">Enviar</button>
</div>
</template>

<script lang="ts">
export default{
    methods:{
        async sendFile(){
            let dataForm = new FormData()
            // let file = document.querySelector("#file").files[0]
            let file = this.$refs.file.files[0]
            dataForm.append('file',file)
            console.log('teste', dataForm, file)
            let res = await fetch('http://localhost:3001/upload',{
                method:'POST',
                body:dataForm
            })
            let data = await res.json()
            console.log(data)
        }
    }
}
</script>