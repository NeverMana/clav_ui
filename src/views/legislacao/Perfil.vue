<template>
    <v-container fluid>
        <MensagemErro v-if="errorOccurred" messagem="Ocorreu um erro ao obter as informações da legislação." />
        <Loading v-else-if="loading" />
        <section v-else>
            <Titulo :conteudo="legInfo.tipo + ' ' + legInfo.numero" classe="display-1" />
            <v-container grid-list-md fluid>
                <v-layout row wrap>
                    <v-flex xs12 sm12 md12 lg12>
                        <AtributoSimples title="Data" :content="legInfo.data" />
                    </v-flex>
                    <v-flex xs12 sm12 md12 lg12>
                        <AtributoSimples title="Sumário" :content="legInfo.sumario" />
                    </v-flex>
                    <v-flex xs12 sm12 md12 lg12>
                        <AtributoComposto 
                            titulo="Regula os Processos de Negócio:" 
                            :items="legRegula"
                            itemTitulo="codigo"
                            itemSubtitulo="titulo"
                        />
                    </v-flex>
                    <v-flex xs12>
                        <v-layout justify-end>
                            <v-btn
                                depressed
                                color="primary"
                                :href="legInfo.link"
                            >
                                Visitar Link
                            </v-btn>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </section>
    </v-container>
</template>

<script>
import axios from 'axios';
import AtributoSimples from '@/components/AtributoSimples.vue'
import AtributoComposto from '@/components/AtributoComposto.vue'
import Titulo from '@/components/Titulo.vue'
import Loading from '@/components/Loading.vue'
import MensagemErro from '@/components/MensagemErro.vue'

export default {
    name: 'legislacao-consulta',
    props: ['id'],
    components: {
        AtributoSimples,
        AtributoComposto,
        Titulo,
        Loading,
        MensagemErro
    },
    data() {
        return {
            legInfo: null,
            legRegula: null,
            loading: true,
            errorOccurred: false
        }
    },
    created: async function () {
        try {
            var res1 = await axios.get('http://clav-test.di.uminho.pt/api/legislacao/' + this.id)
            var res2 = await axios.get('http://clav-test.di.uminho.pt/api/legislacao/' + this.id + '/regula')
            this.legInfo = res1.data
            this.legRegula = await this.prepararClasses(res2.data)
            this.loading = false
        }
        catch (error) {
            this.errorOccurred = true
        }
    },
    methods: {
        prepararClasses: async function (data) {
            for (var i = 0, len = data.length; i < len; i++) {
                data[i].path = '/classes/' + data[i].id
            }
            return data
        }
    }
}
</script>