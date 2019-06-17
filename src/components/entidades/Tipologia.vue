<template>
    <div id="informacao-entidades">
        <div>
            <section v-if="errorOccurred">
                <p>:( Ocorreu um erro ao obter as entidades.</p>
            </section>
            <section v-else>
                <div v-if="loading" class="text-xs-center">
                    <v-progress-circular
                        indeterminate
                        color="primary"
                    ></v-progress-circular>
                    <strong> A carregar os dados...</strong>
                </div>
                <div v-else>
                    <v-container>
                        <v-card>
                            <v-card-text>
                                <h3>Tipologias</h3>
                                <v-divider class="my-3"></v-divider>                               
                                <div class="list-group">
                                    <v-btn 
                                        block 
                                        color="primary" 
                                        v-for="item in this.data" 
                                        :key="item.id" 
                                        @click="rowClicked(item.id)"
                                    >{{item.designacao}}</v-btn>
                                </div> 
                            </v-card-text>
                        </v-card>
                    </v-container>
                </div>
            </section>
        </div>
    </div>
</template>

<script>

export default {
    props: ['data'],
    methods: {
        rowClicked: function(index) {
            this.$router.push({ path: `/tipologias/${index}` });
        }
    }
}
</script>