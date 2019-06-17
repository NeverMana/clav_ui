<template>
    <div>
        <v-expansion-panel>
            <v-expansion-panel-content>
                <template v-slot:header>
                    <div><h3>{{buttontext}}</h3></div>
                </template>
                <v-card>
                    <v-card-text>
                        <v-divider class="my-3"></v-divider>
                        <v-btn
                            block
                            color="primary"
                            v-for="item in list"
                            :key="item.id"
                            @click="goToClass(item.id)"
                        >
                           <span> {{item.codigo}} - {{item.titulo}} </span>
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
</template>

<script>
export default {
    name: "dropdown",
    props:['list','buttontext'],
    methods:{
        goToClass: function(index){
            this.$router.push({path: `/classes/${index}`})
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

