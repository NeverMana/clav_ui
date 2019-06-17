<template>
    <div>          
        <h3>Participante</h3>  
        <v-divider class="my-3"></v-divider>                                   
        <v-btn 
            block
            color="primary" 
            v-for="item in this.data" 
            :key="item.codigo" 
            @click="rowClicked(item.codigo)"
        ><span> {{item.codigo}} - {{item.titulo}} </span>
        </v-btn>
    </div>
</template>

<script>
export default {
    props: ['data'],
    methods: {
        rowClicked: function(index) {
            this.$router.push({ path: `/classes/c${index}` });
        }
    }
}
</script>
<style>
span{
    overflow-x: hidden; 
    text-overflow: ellipsis;
}
</style>