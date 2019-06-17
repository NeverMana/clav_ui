<template>
    <v-container fluid>
        <Titulo conteudo="Tipologias de Entidades" classe="display-2" />
        <MensagemErro v-if="errorOccurred" messagem="Ocorreu um erro ao obter as tipologias." />
        <Loading v-else-if="loading" />
        <Listagem v-else :data="data" :fields="fields" path="tipologias" />
    </v-container>
</template>

<script>
import axios from 'axios'
import Listagem from '@/components/Listagem.vue'
import Loading from '@/components/Loading.vue'
import Titulo from '@/components/Titulo.vue'
import MensagemErro from '@/components/MensagemErro.vue'

export default {
    name: 'tipologias',
    components: {
        Listagem,
        Loading,
        Titulo,
        MensagemErro
    },
    data () {
        return {
            data: null,
            fields: [
                { value: 'designacao', text: 'Designação', sortable: true, width: '80%' },
                { value: 'sigla', text: 'Sigla', sortable: true, width: '20%' }
            ],
            loading: true,
            errorOccurred: false
        }
    },
    created: async function () {
        try {
            var res = await axios.get('http://clav-test.di.uminho.pt/api/tipologias')
            this.data = res.data
            this.loading = false
        } catch (error) {
            this.errorOccurred = true
        }
    }
}
</script>