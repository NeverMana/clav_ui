<template>
    <div id="informacao-entidades">
        
        <div>
            <section v-if="errorOccurred">
                <p>:( Ocorreu um erro ao obter as entidades.</p>
            </section>
            <section v-else>
                <div v-if="loading" class="text-xs-center">
                    <v-progress-circular
                        indeterminate
                        color="primary"
                    ></v-progress-circular>
                    <strong> A carregar os dados...</strong>
                </div>
                <div v-else>
                    <v-container grid-list-md>
                        <v-layout v-if="sioe" row wrap>
                            <v-flex xs4>
                                <v-card>
                                    <v-card-text>
                                        <h3 >Sigla</h3> 
                                        <v-divider class="my-3"></v-divider>                                 
                                        <h1 class="display-2">{{this.sigla}}</h1>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs4>
                                <v-card>
                                    <v-card-text>
                                        <h3>Estado</h3> 
                                        <v-divider class="my-3"></v-divider>                                 
                                        <h1 class="display-2">{{this.estado}}</h1>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs4>
                                <v-card>
                                    <v-card-text>
                                        <h3 >SIOE</h3> 
                                        <v-divider class="my-3"></v-divider>                                 
                                        <h1 class="display-2">{{this.sioe}}</h1>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </v-layout>
                        <v-layout v-else row wrap>
                            <v-flex xs6>
                                <v-card>
                                    <v-card-text>
                                        <h3>Sigla</h3> 
                                        <v-divider class="my-3"></v-divider>                                 
                                        <h1 class="display-2">{{this.sigla}}</h1>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs6>
                                <v-card>
                                    <v-card-text>
                                        <h3>Estado</h3> 
                                        <v-divider class="my-3"></v-divider>                                 
                                        <h1 class="display-2">{{this.estado}}</h1>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Informacao',
    el: '#informacao-entidades',
    props: ['sioe','estado','sigla']
}
</script>
