<template>
    <v-treeview
        :items="contentTree"
        item-key="id"
        expand-icon="mdi-chevron-down-circle-outline"
    >
        <template v-slot:label="{ item, open }">
            <v-btn
                round
                small
                :href="`/${path}/c${item.id}`"
                :color="`${open ? 'info' : 'primary'}`"
            >
                <div class="text-truncate">
                    {{ item.id }}
                </div>
            </v-btn>
        </template>
    </v-treeview>
</template>

<script>

export default {
    props:['contentTree','path'],
    methods:{
        /*go: function(node,isSelected){
            if (isSelected) {
                var snode = node.data
                this.$router.push({ path: `/classes/c${snode.id}` });
            }
        }*/
    }
}
</script>
