<template>
    <v-container>
        <v-card>
            <v-card-title>
                    <div><h3>Tipo de Participação:</h3></div>
            </v-card-title>
            <v-card-text>
                <v-card v-if="apreciador.length > 0">
                    <Dropdown :list="apreciador" buttontext="Apreciador:"/>
                </v-card> 
                <v-card v-if="iniciador.length > 0">
                    <Dropdown :list="iniciador" buttontext="Iniciar:"/>
                </v-card>
                <v-card  v-if="consultor.length > 0">
                    <Dropdown :list="consultor" buttontext="Consultar:" />
                </v-card>
                <v-card  v-if="comunicador.length > 0">                        
                    <Dropdown :list="comunicador" buttontext="Comunicar:"/>
                </v-card>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import Dropdown from '@/components/tipologias/Dropdown.vue'

export default {
    props: ['parts'],
    components:{
        Dropdown
    },
    computed: {
        apreciador: function(){
            return this.parts.filter( p => p.tipoPar == "temParticipanteApreciador");
        },
        iniciador: function(){
            return this.parts.filter( p => p.tipoPar == "temParticipanteIniciador")
        },
        consultor: function(){
            return this.parts.filter( p => p.tipoPar == "temParticipanteConsultor");
        },
        comunicador: function(){
            return this.parts.filter( p => p.tipoPar == "temParticipanteComunicador");
        }
    }
}
</script>
