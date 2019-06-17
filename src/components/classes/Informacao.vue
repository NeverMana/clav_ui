<template>
    <div>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs3>Nivel</v-flex>
                <v-flex xs9>{{classe.nivel}}</v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs3>Classe Pai</v-flex>
                <v-flex xs9 v-if="classe.pai.titulo">{{classe.pai.titulo}}</v-flex>
                <v-flex xs9 v-else> Lista Consolidada </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs3>Código</v-flex>
                <v-flex xs9>{{classe.codigo}}</v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs3>Titulo</v-flex>
                <v-flex xs9>{{classe.titulo}}</v-flex>
            </v-layout>
        </v-container>

        <Descritivo 
            class="ma-2"
            :descricao="classe.descricao" 
            :notasAp="classe.notasAp" 
            :exNotasAp="classe.exemplosNotasAp" 
            :notasEx="classe.notasEx"
            :termosInd="classe.termosInd" 
        />
        <Contexto class="ma-2"
            :tipo="classe.tipoProc"
            :transversal="classe.procTrans"
            :donos="classe.donos"
            :participantes="classe.participantes"
            :procRel="classe.processosRelacionados"
            :legislacao="classe.legislacao"
        />

    </div>
</template>

<script>
import Descritivo from '@/components/classes/Descritivo.vue'
import Contexto from '@/components/classes/ContextoAvaliacao.vue'

export default {
    props: ['classe'],
    components:{
        Descritivo,
        Contexto
    }
}

</script>
