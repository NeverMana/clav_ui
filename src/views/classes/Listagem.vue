<template>
    <v-container fluid>
        <Titulo conteudo="Classes" class="display-2" />
        <MensagemErro v-if="errorOccurred" messagem="Ocorreu um erro ao obter a lista consolidada." />
        <Loading v-else-if="loading" />
        <Listagem v-else :contentTree="classesTree" path="classes" />
    </v-container>
</template>

<script>
import Listagem from '@/components/classes/Listagem.vue'
import Loading from '@/components/Loading.vue'
import MensagemErro from '@/components/MensagemErro.vue'
import Titulo from '@/components/Titulo.vue'
import axios from 'axios'

export default {
    name: 'classes',
    components: {
        Listagem,
        Loading,
        Titulo,
        MensagemErro
    },
    data() {
        return {
            loading: true,
            errorOccurred: false,
            classesTree: null
        }
    },
    created: async function () {
        try {
            var response = await axios.get('http://clav-test.di.uminho.pt/api/classes');
            this.classesTree = await this.preparaTree(response.data);
            this.loading = false;
        }
        catch(e) {
            this.errorOccurred = true
        }
    },
    methods: {
        preparaTree: async function(lclasses){
            try {
                var myTree = [];
                for (var i = 0, len = lclasses.length; i < len; i++) {
                    myTree.push({
                        id: lclasses[i].codigo,
                        name: lclasses[i].titulo,
                        children: await this.preparaTree(lclasses[i].filhos)
                    });
                }
                return myTree;
            }
            catch(error) {
                return []
            }
        }
    }
}
</script>
