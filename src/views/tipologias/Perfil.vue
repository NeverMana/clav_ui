<template>
    <v-container fluid>
        <MensagemErro v-if="errorOccurred" messagem="Ocorreu um erro ao obter as informações da tipologia." />
        <Loading v-else-if="loading" />
        <section v-else>
            <Titulo :conteudo="designacao" classe="display-1" />
            <v-container grid-list-md fluid>
                <v-layout row wrap>
                    <v-flex xs12 sm6 md6 lg6>
                        <AtributoSimples title="Sigla" :content="sigla" />
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg6>
                        <AtributoSimples title="Estado" :content="estado" />
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12 sm12 md12 lg12>
                        <AtributoComposto 
                            titulo="Donos de:"
                            :items="donos"
                            itemTitulo="codigo"
                            itemSubtitulo="titulo"
                        />
                    </v-flex>
                    <v-flex xs12 sm12 md12 lg12>
                        <AtributoComposto 
                            titulo="Tipo de Participação:"
                            :items="participantes"
                            itemTitulo="codigo"
                            itemSubtitulo="titulo"
                            atributoFiltro="tipoPar"
                            :filtros="participantesFiltros"
                        />
                    </v-flex>
                    <v-flex xs12 sm12 md12 lg12>
                        <AtributoComposto 
                            titulo="Elementos:" 
                            :items="elementos"
                            itemTitulo="sigla"
                            itemSubtitulo="designacao"
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
    name: 'tipologiaperfil',
    props:['id'],
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
            sigla: null,
            estado: null,
            total: null,
            donos: null,
            participantes: null,
            elementos: null,
            loading: true,
            errorOccurred: false,
            participantesFiltros: [
                { nome: 'temParticipanteApreciador', etiqueta: 'Apreciar', path: '/classes' },
                { nome: 'temParticipanteIniciador', etiqueta: 'Iniciar', path: '/classes' },
                { nome: 'temParticipanteComunicador', etiqueta: 'Comunicar', path: '/classes' },
                { nome: 'temParticipanteDecisor', etiqueta: 'Decidir', path: '/classes' }
            ]
        }
    },
    created: async function () {
        try {
            var res1 = await axios.get('http://clav-test.di.uminho.pt/api/tipologias/' + this.id)
            var res2 = await axios.get('http://clav-test.di.uminho.pt/api/tipologias/' + this.id + '/intervencao/dono')
            var res3 = await axios.get('http://clav-test.di.uminho.pt/api/tipologias/' + this.id + '/intervencao/participante')
            var res4 = await axios.get('http://clav-test.di.uminho.pt/api/tipologias/' + this.id + '/elementos')
            this.estado = res1.data.estado
            this.sigla = res1.data.sigla
            this.designacao = res1.data.designacao
            this.total = res1.data.length
            this.donos = await this.prepararClasses(res2.data)
            this.participantes = await this.prepararClasses(res3.data)
            this.elementos = await this.prepararEntidades(res4.data)
            this.loading = false
        } catch (error) {
             this.errorOccurred = true
        }
    },
    methods: {
        prepararClasses: async function (data) {
            for (var i = 0, len = data.length; i < len; i++) {
                data[i].path = '/classes/' + data[i].id
            }
            return data
        },
        prepararEntidades: async function (data) {
            for (var i = 0, len = data.length; i < len; i++) {
                data[i].path = '/entidades/' + data[i].id
            }
            return data
        }
    }
}
</script>