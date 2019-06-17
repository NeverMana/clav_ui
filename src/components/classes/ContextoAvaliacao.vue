<template>
    <v-card>
        <v-expansion-panel>
            <v-expansion-panel-content>
                <template v-slot:header>
                    <div><h3>Contexto de Avaliação</h3></div>
                </template>
                <v-card>
                    <v-card-text>
                        <v-divider class="my-3"></v-divider>
                        <v-container grid-list-xs>
                            <v-layout row wrap>
                                <v-flex xs3> Tipo de Processo: </v-flex>
                                <v-flex xs3> {{tipo}} </v-flex>
                                <v-flex xs3> Processo Transversal: </v-flex>
                                <v-flex xs3 v-if="transversal=='S'"> Sim </v-flex>
                                <v-flex xs3 v-else> Não </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs3> Donos: </v-flex>
                                <v-flex xs9> 
                                    <ul>
                                        <li v-for="item in donos" :key="item.idDono"> <router-link :to=" '/entidades/'+item.idDono " >{{item.sigla}}</router-link> - {{item.designacao}}</li>
                                    </ul> 

                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs3> Tipo de intervenção do(s) Participante(s): </v-flex>
                                <v-flex xs9> 
                                    <ul v-if="assessor.length > 0">
                                        <b>Assessorar</b>
                                        <li v-for="item in assessor" :key="item.idParticipante"> 
                                            <router-link :to=" '/entidades/'+item.idParticipante " >{{item.sigla}}</router-link>- {{item.designacao}}
                                        </li>
                                    </ul>
                                    <ul v-if="comunicador.length > 0">
                                        <b>Comunicar</b>
                                        <li v-for="item in comunicador" :key="item.idParticipante"> 
                                            <router-link :to=" '/entidades/'+item.idParticipante " >{{item.sigla}}</router-link>- {{item.designacao}}
                                        </li>
                                    </ul>
                                    <ul v-if="iniciador.length > 0">
                                        <b>Iniciar</b>
                                        <li v-for="item in iniciador" :key="item.idParticipante"> 
                                            <router-link :to=" '/entidades/'+item.idParticipante " >{{item.sigla}}</router-link>- {{item.designacao}}
                                        </li>
                                    </ul>
                                    <ul v-if="consultor.lenght > 0">
                                        <b>Consultar</b>
                                        <li v-for="item in consultor" :key="item.idParticipante"> 
                                            <router-link :to=" '/entidades/'+item.idParticipante " >{{item.sigla}}</router-link>- {{item.designacao}}
                                        </li>
                                    </ul>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs3> Processo(s) Relacionado(s): </v-flex>
                                <v-flex xs9> 
                                    <ul v-if="antecessor.length > 0">
                                        <b>É Antecessor de:</b>
                                        <li v-for="item in antecessor" :key="item.codigo"> 
                                            <router-link :to=" '/classes/c'+item.codigo " >{{item.codigo}}</router-link>- {{item.titulo}}
                                        </li>
                                    </ul>
                                    <ul v-if="cruzado.length > 0">
                                        <b>É Cruzado com:</b>
                                        <li v-for="item in cruzado" :key="item.codigo"> 
                                            <router-link :to=" '/classes/c'+item.codigo " >{{item.codigo}}</router-link>- {{item.titulo}}
                                        </li>
                                    </ul>
                                    <ul v-if="sintese.length > 0">
                                        <b>É Sintese de:</b>
                                        <li v-for="item in sintese" :key="item.codigo"> 
                                            <router-link :to=" '/classes/c'+item.codigo " >{{item.codigo}}</router-link>- {{item.titulo}}
                                        </li>
                                    </ul>
                                    <ul v-if="sintetizado.length > 0">
                                        <b>É Sintetizado de:</b>
                                        <li v-for="item in sintetizado" :key="item.codigo"> 
                                            <router-link :to=" '/classes/c'+item.codigo " >{{item.codigo}}</router-link>- {{item.titulo}}
                                        </li>
                                    </ul>
                                    <ul v-if="sucessor.length > 0">
                                        <b>É Sucessor de:</b>
                                        <li v-for="item in sucessor" :key="item.codigo"> 
                                            <router-link :to=" '/classes/c'+item.codigo " >{{item.codigo}}</router-link>- {{item.titulo}}
                                        </li>
                                    </ul>
                                    <ul v-if="suplemento.length > 0">
                                        <b>É Suplemento de:</b>
                                        <li v-for="item in suplemento" :key="item.codigo"> 
                                            <router-link :to=" '/classes/c'+item.codigo " >{{item.codigo}}</router-link>- {{item.titulo}}
                                        </li>
                                    </ul>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs3> Legislação: </v-flex>
                                <v-flex xs9> 
                                    <!--ul>
                                        <li v-for="item in participantes" :key="item.idParticipante"> 
                                            <router-link :to=" '/entidades/'+item.idParticipante " >{{item.sigla}}</router-link>- {{item.designacao}}
                                        </li>
                                    </ul--> TODO
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
    props:['tipo','transversal','donos','participantes','procRel','legislacao'],
    computed:{
        //Filters a participantes
        assessor: function(){
            return this.participantes.filter(p => p.participLabel == "Assessor")
        },
        iniciador: function(){
            return this.participantes.filter(p => p.participLabel == "Iniciador")
        },
        consultor: function(){
            return this.participantes.filter(p => p.participLabel == "Consultor")
        },
        comunicador: function(){
            return this.participantes.filter(p => p.participLabel == "Comunicador")
        }, 
        //Filters a Processos Relacionados
        antecessor: function(){
            return this.procRel.filter(p => p.idRel == "eAntecessorDe")
        },
        cruzado: function(){
            return this.procRel.filter(p => p.idRel == "eCruzadoCom")
        },
        sintese: function(){
            return this.procRel.filter(p => p.idRel == "eSinteseDe")
        },
        sintetizado: function(){
            return this.procRel.filter(p => p.idRel == "eSintetizadoPor")
        },
        sucessor: function(){
            return this.procRel.filter(p => p.idRel == "eSucessorDe")
        },
        suplemento: function(){
            return this.procRel.filter(p => p.idRel == "eSuplementoDe")
        }
    }
}
</script>

