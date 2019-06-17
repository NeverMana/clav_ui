<template>
    <v-container fluid>
        <Titulo conteudo="Legislação" classe="display-2" />
        <MensagemErro v-if="errorOccurred" messagem="Ocorreu um erro ao obter a legislação." />
        <Loading v-else-if="loading" />
        <Listagem v-else :data="data" :fields="fields" path="legislacao" />
    </v-container>
</template>

<script>
import axios from 'axios'
import Listagem from '@/components/Listagem.vue'
import Loading from '@/components/Loading.vue'
import Titulo from '@/components/Titulo.vue'
import MensagemErro from '@/components/MensagemErro.vue'

export default {
    name: 'legislacao-listagem',
    components: {
        Listagem,
        Loading,
        MensagemErro,
        Titulo
    },
    data () {
        return {
            data: null,
            fields: [
                { value: 'tipo', text: 'Tipo', sortable: true, width: '16%' },
                { value: 'numero', text: 'Número', sortable: true, width: '15%' },
                { value: 'sumario', text: 'Sumário', sortable: true, width: '54%' },
                { value: 'data', text: 'Data', sortable: true, width: '15%' }
            ],
            loading: true,
            errorOccurred: false
        }
    },
    created: async function () {
        try {
            var res = await axios.get('http://clav-test.di.uminho.pt/api/legislacao')
            this.data = res.data
            this.loading = false
        } catch (error) {
            this.errorOccurred = true
        }
    }
}
</script>
