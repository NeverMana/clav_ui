<template>
    <v-container>     
        <v-card>
            <v-expansion-panel>
                <v-expansion-panel-content>
                    <template v-slot:header>
                        <div><h3>Entidades:</h3></div>
                    </template>
                    <v-card>
                        <v-card-text>
                            <v-divider class="my-3"></v-divider>
                            <v-btn
                                block
                                color="primary"
                                v-for="item in elems"
                                :key="item.id"
                                @click="goToEntidade(item.id)"
                            >
                               {{item.designacao}}
                            </v-btn>
                        </v-card-text>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-card>
    </v-container>
</template>

<script>

export default {
    props: ['elems'],
    methods:{
        goToEntidade: function(index){
            this.$router.push({path: `/entidades/${index}`})
        }
    }
}
</script>