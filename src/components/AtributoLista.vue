<template>
    <v-card flat>
        <v-card-title :class="tituloClasse">
            <span>{{ titulo }}</span>
        </v-card-title>
        <div class="grey lighten-3">
            <section v-if="items.length < 1">
                <div :key="i" class="px-3 py-2 subheading">
                    (Lista vazia)
                </div>
            </section>
            <section v-else>
                <template v-for="(item, i) in items">
                    <div :key="'texto' + i" class="px-3 py-2">
                        <div class="subheading" v-html="item[itemTexto]" />
                        <div class="body-1 grey--text" v-html="item[itemSubtexto]" />
                    </div>
                    <v-divider v-if="i+1 != items.length" :key="i"/>
                </template>
            </section>
        </div>
    </v-card>
</template>

<script>
export default {
    name: 'AtributoLista',
    props: {
        titulo: { type: String },
        tituloClasse: { type: String, default: "primary lighten-1 white--text" },
        items: { type: Array },
        itemTexto: { type: String },
        itemSubtexto: { type: String }
    }
}
</script>
