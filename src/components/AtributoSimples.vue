<template>
    <v-card flat>
        <v-card-title class="primary lighten-1 white--text">
            <span>{{ title }}</span>
        </v-card-title>
        <v-card-text class="grey lighten-3">
            <div class="subheading" v-html="content" />
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "AtributoSimples",
    props: ['title', 'content']
}
</script>
