<template>
    <v-container id="informacao-tipologias">
        <div>
            <section>
                <div v-if="loading">A carregar os dados...</div>
                <div v-else>
                    <v-layout row wrap>
                        <v-flex xs6>
                            <v-card>
                                <v-card-text>
                                    <p>SIGLA</p>
                                    <v-divider class="my-3"></v-divider>
                                    <h2>{{this.sigla}}</h2>
                                </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex xs6>
                            <v-card>
                                <v-card-text>
                                    <p>ESTADO</p>
                                    <v-divider class="my-3"></v-divider>
                                    <h2>{{this.estado}}</h2>
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </div>
            </section>
        </div>
    </v-container>
</template>

<script>
export default {
    name: 'Informacao',
    el: '#informacao-tipologias',
    props: ['sigla','estado']
}
</script>
