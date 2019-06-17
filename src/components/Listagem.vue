<template>
    <v-card>
        <v-sheet class="pa-3 primary lighten-2">
            <v-text-field
                v-model="search"
                label="Procurar"
                dark
                flat
                solo-inverted
                hide-details
                clearable
                clear-icon="mdi-close-circle-outline"
            ></v-text-field>
        </v-sheet>
        <v-card-text>
            <v-data-table
                :headers="fields"
                :items="data"
                :search="search"
                :disable-initial-sort="true"
            >  
                <template v-slot:items="props">
                        <tr v-on:click="rowClicked(props.item)">
                            <td v-for="field in fields" :key="field.value">
                                <div class="text-truncate">
                                    {{ props.item[field.value] }}
                                </div>
                            </td>
                        </tr>
                </template>        
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>

export default {
    name: 'Listagem',
    props: ['data', 'fields', 'path'],
    data () {
        return {
            search: '',
            perPage: 10,
            currentPage: 1,
            totalRows: this.data.length,
            pageOptions: [5, 10, 20, 100]
        }
    },
    methods: {
        rowClicked: function(row) {
            var id = row.id
            this.$router.push({ path: `${this.path}/${id}` });
        }
    },
    computed: {
        rows() {
            return this.data.length
        }
    }
}
</script>

<style>
    table {
        table-layout: fixed;
    }
</style>