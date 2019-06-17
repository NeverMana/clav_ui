<template>
    <v-container fluid>
        <MensagemErro v-if="errorOccurred" messagem="Ocorreu um erro ao obter as informações da classe." />
        <Loading v-else-if="loading" />
        <section v-else>
            <v-container grid-list-md fluid>
                <v-layout row>
                    <v-flex xs2 class="hidden-xs-only">
                        <v-card>
                            <v-card-text>
                                <SideTree :contentTree="classesTree" path="classes"/> 
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex :xs10="$vuetify.breakpoint.smAndUp">
                        <Titulo :conteudo="id + ' - ' + classedata.titulo" classe="display-1" />
                        <v-container grid-list-md fluid>
                            <v-layout row wrap>
                                <v-flex xs12 sm6 md6 lg6>
                                    <AtributoSimples title="Nível" :content="classedata.nivel"/>
                                </v-flex>
                                <v-flex xs12 sm6 md6 lg6>
                                    <AtributoSimples title="Código" :content="classedata.codigo"/>
                                </v-flex>
                                <v-flex xs12 sm12 md12 lg12>
                                    <v-expansion-panel>
                                        <v-expansion-panel-content>
                                            <template v-slot:header style="background-color: #ffffff">
                                                <span class="primary--text">Descritivo da Classe</span>
                                            </template>
                                            <v-container grid-list-sm fluid>
                                                <v-layout row wrap>
                                                    <v-flex xs12 sm12 md12 lg12>
                                                        <AtributoSimples title="Descrição" :content="classedata.descricao"/>
                                                    </v-flex>
                                                    <v-flex v-if="classedata.nivel != 4" xs12 sm12 md12 lg12>
                                                        <AtributoLista titulo="Nota(s) de Aplicação" :items="classedata.notasAp" itemTexto="nota" />
                                                    </v-flex>
                                                    <v-flex v-if="classedata.exemplosNotasAp.length != 0" xs12 sm12 md12 lg12>
                                                        <AtributoLista titulo="Exemplo(s) de Notas de Aplicação" :items="classedata.exemplosNotasAp" itemTexto="exemplo" />
                                                    </v-flex>
                                                    <v-flex v-if="classedata.notasEx.length != 0" xs12 sm12 md12 lg12>
                                                        <AtributoLista titulo="Nota(s) de Exclusão" :items="classedata.notasEx" itemTexto="nota" />
                                                    </v-flex>
                                                    <v-flex v-if="classedata.termosInd.length != 0" xs12 sm12 md12 lg12>
                                                        <AtributoLista titulo="Termo(s) de Índice" :items="classedata.termosInd" itemTexto="termo" />
                                                    </v-flex>
                                                </v-layout>
                                            </v-container>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-flex>
                                <v-flex v-if="classedata.nivel == 3 || classedata.nivel == 4" xs12 sm12 md12 lg12>
                                    <v-expansion-panel>
                                        <v-expansion-panel-content>
                                            <template v-slot:header>
                                                <span class="primary--text">Contexto da Avaliação</span>
                                            </template>
                                            <v-container grid-list-sm fluid>
                                                <v-layout row wrap>
                                                    <v-flex v-if="classedata.nivel == 3" xs12 sm6 md6 lg6>
                                                        <AtributoSimples title="Tipo de Processo" :content="classedata.tipoProc"/>
                                                    </v-flex>
                                                    <v-flex v-if="classedata.nivel == 3" xs12 sm6 md6 lg6>
                                                        <AtributoSimples v-if="classedata.procTrans == 'S'" title="Processo Transversal" content="Sim"/>
                                                        <AtributoSimples v-else title="Processo Transversal" content="Não"/>
                                                    </v-flex>
                                                    <v-flex v-if="classedata.nivel == 3" xs12 sm12 md12 lg12>
                                                        <AtributoComposto
                                                            titulo='Dono(s)'
                                                            :items="classedata.donos"
                                                            itemTitulo='sigla'
                                                            itemSubtitulo='designacao'
                                                        />
                                                    </v-flex>
                                                    <v-flex v-if="classedata.nivel == 3 && classedata.procTrans == 'S'" xs12 sm12 md12 lg12>
                                                        <AtributoComposto
                                                            titulo='Tipo de Intervenção do(s) Participante(s)'
                                                            :items="classedata.participantes"
                                                            itemTitulo='sigla'
                                                            itemSubtitulo='designacao'
                                                            atributoFiltro='participLabel'
                                                            :filtros="participantesFiltros"
                                                        />
                                                    </v-flex>
                                                    <v-flex v-if="classedata.nivel == 3" xs12 sm12 md12 lg12>
                                                        <AtributoComposto
                                                            titulo='Processo(s) Relacionado(s)'
                                                            :items="classedata.processosRelacionados"
                                                            itemTitulo='codigo'
                                                            itemSubtitulo='titulo'
                                                            atributoFiltro="idRel"
                                                            :filtros="processosFiltros"
                                                        />
                                                    </v-flex>
                                                    <v-flex v-if="classedata.nivel == 3" xs12 sm12 md12 lg12>
                                                        <AtributoComposto
                                                            titulo='Legislação'
                                                            :items="classedata.legislacao"
                                                            itemTitulo='tiponumero'
                                                            itemSubtitulo='sumario'
                                                        />
                                                    </v-flex>
                                                </v-layout>
                                            </v-container>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-flex>
                                <v-flex v-if="classedata.nivel == 3 || classedata.nivel == 4" xs12 sm12 md12 lg12>
                                    <v-expansion-panel>
                                        <v-expansion-panel-content>
                                            <template v-slot:header>
                                                <span class="primary--text">Decisões de Avaliação</span>
                                            </template>
                                            <section>
                                                <Titulo conteudo="Prazo de conservação Administrativa" classe="subheading text-xs-center"/>
                                                <v-container grid-list-sm fluid class="pt-1">
                                                    <v-layout row wrap>
                                                        <v-flex xs12 sm6 md6 lg6>
                                                            <AtributoSimples title="Prazo" :content="classedata.pca.valores"/>
                                                        </v-flex>
                                                        <v-flex xs12 sm6 md6 lg6>
                                                            <AtributoSimples title="Forma de Contagem" :content="classedata.pca.formaContagem"/>
                                                        </v-flex>
                                                        <v-flex xs12 sm12 md12 lg12>
                                                            <AtributoLista 
                                                                titulo='Justificação'
                                                                :items="pcaJustificacoes"
                                                                itemTexto="tipoLabel"
                                                                itemSubtexto="conteudo"
                                                            />
                                                        </v-flex>
                                                    </v-layout>
                                                </v-container>
                                            </section>
                                            <section>
                                                <Titulo conteudo="Destino Final" classe="subheading text-xs-center"/>
                                                <v-container grid-list-sm fluid class="pt-1">
                                                    <v-layout row wrap>
                                                        <v-flex xs12 sm12 md12 lg12>
                                                            <AtributoSimples title="Destino" :content="classedata.df.valor"/>
                                                        </v-flex>
                                                        <v-flex xs12 sm12 md12 lg12>
                                                            <AtributoLista 
                                                                titulo='Justificação'
                                                                :items="dfJustificacoes"
                                                                itemTexto="tipoLabel"
                                                                itemSubtexto="conteudo"
                                                            />
                                                        </v-flex>
                                                    </v-layout>
                                                </v-container>
                                            </section>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-flex>
                </v-layout>
            </v-container>
        </section>
    </v-container>
</template>

<script>
import axios from 'axios'
import SideTree from '@/components/classes/SideTree.vue'
import Loading from '@/components/Loading.vue'
import MensagemErro from '@/components/MensagemErro.vue'
import Titulo from '@/components/Titulo.vue'
import AtributoSimples from '@/components/AtributoSimples.vue'
import AtributoLista from '@/components/AtributoLista.vue'
import AtributoComposto from '@/components/AtributoComposto.vue'

export default {
    name: 'perfilClasse',
    props: ['id'],
    components:{
        SideTree,
        Loading,
        Titulo,
        MensagemErro,
        AtributoSimples,
        AtributoLista,
        AtributoComposto
    },
    data(){
        return {
            classesTree: null,
            classedata: null,
            loading: true,
            errorOccurred: false,
            participantesFiltros: [
                { nome: 'Assessor', etiqueta: 'Assessorar' },
                { nome: 'Comunicador', etiqueta: 'Comunicar' },
                { nome: 'Decisor', etiqueta: 'Decidir' },
                { nome: 'Apreciador', etiqueta: 'Apreciar' },
                { nome: 'Executor', etiqueta: 'Executar' },
                { nome: 'Iniciador', etiqueta: 'Iniciar' }
            ],
            processosFiltros: [
                { nome: 'eAntecessorDe', etiqueta: 'É antecessor de' },
                { nome: 'eComplementarDe', etiqueta: 'É complementar de'},
                { nome: 'eCruzadoCom', etiqueta: 'É cruzado com' },
                { nome: 'eSucessorDe', etiqueta: 'É sucessor de' },
                { nome: 'eSinteseDe', etiqueta: 'É síntese de' },
                { nome: 'eSuplementoPara', etiqueta: 'É suplemento para' },
                { nome: 'eSintetizadoPor', etiqueta: 'É sintetizado por'}
            ]
        }
    },
    methods: {
        preparaTree: async function(lclasses){
            try {
                var myTree = [];
                for(var i = 0; i < lclasses.length; i++){
                    myTree.push({
                        id: lclasses[i].codigo,
                        name: lclasses[i].titulo,
                        children: await this.preparaTree(lclasses[i].filhos)
                    });
                }
                return myTree;
            }
            catch(error){
                return []
            }
        },
        prepararDonos: async function (data) {
            for (var i = 0, len = data.length; i < len; i++) {
                if (data[i].idTipo == 'Entidade') {
                    data[i].path = '/entidades/' + data[i].idDono
                } else {
                    data[i].path = '/tipologias/' + data[i].idDono
                }
            }
        },
        prepararParticipantes: async function (data) {
            for (var i = 0, len = data.length; i < len; i++) {
                if (data[i].idTipo == 'Entidade') {
                    data[i].path = '/entidades/' + data[i].idParticipante
                } else {
                    data[i].path = '/tipologias/' + data[i].idParticipante
                }
            }
        },
        prepararClasses: async function (data) {
            for (var i = 0, len = data.length; i < len; i++) {
                data[i].path = '/classes/c' + data[i].codigo
            }
        },
        prepararLegislacao: async function (data) {
            for (var i = 0, len = data.length; i < len; i++) {
                data[i].path = '/legislacao/' + data[i].idLeg
                data[i].tiponumero = data[i].tipo + ' ' + data[i].numero
            }
        }
    },
    computed: {
        pcaJustificacoes: function () {
            var re = /(\d+\.\d+\.\d+)/g
            var data = this.classedata.pca.justificacao
            for (var i = 0, len = data.length; i < len; i++) {
                data[i].conteudo = data[i].conteudo.replace(re, '<a href="/classes/c$1">$1</a>')
            }
            return data
        },
        dfJustificacoes: function () {
            var re = /(\d+\.\d+\.\d+)/g
            var data = this.classedata.df.justificacao
            for (var i = 0, len = data.length; i < len; i++) {
                data[i].conteudo = data[i].conteudo.replace(re, '<a href="/classes/c$1">$1</a>')
            }
            return data
        }
    },
    created: async function () {
        try {
            var response = await axios.get('http://clav-test.di.uminho.pt/api/classes'); 
            this.classesTree = await this.preparaTree(response.data);
            var response2 = await axios.get('http://clav-test.di.uminho.pt/api/classes/c' + this.id);
            this.classedata = response2.data;
            await this.prepararDonos(this.classedata.donos)
            await this.prepararParticipantes(this.classedata.participantes)
            await this.prepararClasses(this.classedata.processosRelacionados)
            await this.prepararLegislacao(this.classedata.legislacao)
            this.loading = false;
        } 
        catch(e) {
            this.errorOccurred = true;
        }
    }
}
</script>
