<template>
    <v-container fluid>
        <Titulo conteudo="Entidades" classe="display-2" />
        <MensagemErro v-if="errorOccurred" messagem="Ocorreu um erro ao obter as entidades." />
        <Loading v-else-if="loading" />
        <Listagem v-else :data="data" :fields="fields" :path="path" />
    </v-container>
</template>

<script>
import axios from 'axios'
import Listagem from '@/components/Listagem.vue'
import Loading from '@/components/Loading.vue'
import MensagemErro from '@/components/MensagemErro.vue'
import Titulo from '@/components/Titulo.vue'

export default {
    name: 'entidades',
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
                { value: 'sigla', text: 'Sigla', sortable: true, width: '15%' },
                { value: 'designacao', text: 'Designação', sortable: true, width: '70%' },
                { value: 'internacional', text: 'Internacional', sortable: true, width: '15%' }
            ],
            path: 'entidades',
            loading: true,
            errorOccurred: false
        }
    },
    created: async function () {
        try {
            var res = await axios.get('http://clav-test.di.uminho.pt/api/entidades')
            this.data = res.data
            this.loading = false
        } catch (error) {
            this.errorOccurred = true
        }
    }
}
</script>
