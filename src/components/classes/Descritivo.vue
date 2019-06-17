<template>
    <v-card>
        <v-expansion-panel>
            <v-expansion-panel-content>
                <template v-slot:header>
                    <div><h3>Descritivo da Classe</h3></div>
                </template>
                <v-card>
                    <v-card-text>
                        <v-divider class="my-3"></v-divider>
                        <v-container grid-list-xs>
                            <v-layout row wrap>
                                <v-flex xs3> Descrição</v-flex>
                                <v-flex xs9> {{descricao}} </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs3> Notas de Aplicação</v-flex>
                                <v-flex xs9> 
                                    <ul>
                                        <li v-for="item in notasAp" :key="item.idNota"> {{item.nota}} </li>
                                    </ul> 
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap v-if="exNotasAp[0]">
                                <v-flex xs3> Exemplos de Notas de Aplicação</v-flex>
                                <v-flex xs9>
                                    <ul>
                                        <li v-for="item in exNotasAp" :key="item.idExemplo"> {{item.exemplo}} </li>
                                    </ul>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs3> Notas de Exclusão</v-flex>
                                <v-flex xs9>
                                    <ul>
                                        <li v-for="item in notasEx" :key="item.idNota"> {{item.nota}} </li>
                                    </ul>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap  v-if="termosInd[0]">
                                <v-flex xs3> Termos de Índice</v-flex>
                                <v-flex xs9>
                                    <ul>
                                        <li v-for="item in termosInd" :key="item.idTI"> {{item.termo}} </li>
                                    </ul>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-card>
</template>

<script>
export default {
    props:['descricao','notasAp','exNotasAp','notasEx','termosInd']
}
</script>
