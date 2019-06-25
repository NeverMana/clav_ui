<template>
    <v-card>
        <v-sheet class="pa-3 primary lighten-2">
            <v-text-field
                v-model="search"
                label="Procurar classe"
                dark
                flat
                solo-inverted
                hide-details
                clearable
                clear-icon="mdi-close-circle-outline"
            ></v-text-field>
        </v-sheet>
        <v-card-text>
            <v-treeview
                v-model="tree"
                :items="contentTree"
                :search="search"
                expand-icon="mdi-chevron-down-circle-outline"
                class="text-truncate"
            >
                <template v-slot:label="{ item, open }">
                    
                    <v-btn
                        small
                        :href="`${path}/c${item.id}`"
                        :color="`${open ? 'info' : 'primary'}`"
                    >
                        {{ item.id }} - {{ item.name }}
                    </v-btn>
                </template>
            </v-treeview>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'Tree',
    props: ['contentTree', 'path'],
    data () {
        return{
            search: null,
            totalRows: null
        }
    }
}
</script>
