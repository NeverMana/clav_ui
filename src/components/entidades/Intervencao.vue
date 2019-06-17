<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex class="my-card-group" xs6>
                <v-card height="100%">
                    <v-card-text>
                        <Participante :data="this.participantes"/>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex class="my-card-group" xs6>
                <v-card height="100%">
                    <v-card-text>
                        <Dono :data="this.donos"/>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import Participante from '@/components/entidades/Participante.vue'
import Dono from '@/components/entidades/Dono.vue'

export default {
    props: ['participantes','donos'],
    components:{
        Participante,
        Dono
    }
}
</script>
