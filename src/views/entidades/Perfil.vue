<template>
    <v-container fluid>
        <MensagemErro v-if="errorOccurred" messagem="Ocorreu um erro ao obter as informações da entidade." />
        <Loading v-else-if="loading" />
        <section v-else>
            <Titulo :conteudo="designacao" classe="display-1"/>
            <v-container grid-list-md fluid>
                <v-layout v-if="entidade.sioe" row wrap>
                    <v-flex xs12 sm4 md4 lg4>
                        <AtributoSimples title="Sigla" :content="entidade.sigla" />
                    </v-flex>
                    <v-flex xs12 sm4 md4 lg4>
                        <AtributoSimples title="Estado" :content="entidade.estado" />
                    </v-flex>
                    <v-flex xs12 sm4 md4 lg4>
                        <AtributoSimples title="SIOE" :content="entidade.sioe" />
                    </v-flex>
                </v-layout>
                <v-layout v-else row wrap>
                    <v-flex xs12 sm6 md6 lg6>
                        <AtributoSimples title="Sigla" :content="entidade.sigla" />
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg6>
                        <AtributoSimples title="Estado" :content="entidade.estado" />
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12 sm12 md12 lg12>
                        <AtributoComposto 
                            titulo="Pertence às Tipologias:" 
                            :items="tipologias"
                            itemTitulo="sigla"
                            itemSubtitulo="designacao"
                        />
                    </v-flex>
                    <v-flex xs12 sm12 md12 lg12>
                        <AtributoComposto 
                            titulo="Dono dos Processos de Negócio:" 
                            :items="donos"
                            itemTitulo="codigo"
                            itemSubtitulo="titulo"
                        />
                    </v-flex>
                    <v-flex xs12 sm12 md12 lg12>
                        <AtributoComposto 
                            titulo="Participante dos Processos de Negócio:" 
                            :items="participantes"
                            itemTitulo="codigo"
                            itemSubtitulo="titulo"
                        />
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
    name: 'entidadeinfo',
    props: ['id'],
    components: {
        AtributoSimples,
        AtributoComposto,
        Titulo,
        Loading,
        MensagemErro
    },
    data(){
        return {
            designacao: null,
            entidade: {
                sigla: null,
                estado: null,
                sioe: null
            },
            donos: null,
            participantes: null,
            tipologias: null,
            loading: true,
            errorOccurred: false
        }
    },
    created: async function () {
        try {
            var res1 = await axios.get('http://clav-test.di.uminho.pt/api/entidades/' + this.id)
            var res2 = await axios.get('http://clav-test.di.uminho.pt/api/entidades/' + this.id + '/intervencao/dono')
            var res3 = await axios.get('http://clav-test.di.uminho.pt/api/entidades/' + this.id + '/intervencao/participante')
            var res4 = await axios.get('http://clav-test.di.uminho.pt/api/entidades/' + this.id + '/tipologias')
            this.designacao = res1.data.designacao
            this.entidade.estado = res1.data.estado
            this.entidade.sigla = res1.data.sigla
            this.entidade.sioe = res1.data.sioe
            this.donos = await this.prepararClasses(res2.data);
            this.participantes = await this.prepararClasses(res3.data);
            this.tipologias = await this.prepararTipologias(res4.data)
            this.loading = false
        }
        catch (error) {
            this.errorOccurred = true
        }
    },
    methods: {
        prepararClasses: async function (data) {
            try {
                var result = []
                for (var i = 0, len = data.length; i < len; i++) { 
                    result.push({
                        id: 'c' + data[i].codigo,
                        codigo: data[i].codigo,
                        titulo: data[i].titulo,
                        path: '/classes/c' + data[i].codigo
                    })
                }
                return result
            }
            catch (error) {
                return []
            }
        },
        prepararTipologias: async function (data) {
            for (var i = 0, len = data.length; i < len; i++) {
                data[i].path = '/tipologias/' + data[i].id
            }
            return data
        }
    }
}
</script>