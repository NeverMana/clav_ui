<template>
    <div>
        <v-alert
            :value="true"
            type="error"
        >
            {{ messagem }}
        </v-alert>
    </div>
</template>

<script>
export default {
    name: 'MensagemErro',
    props: ['messagem']
}
</script>
