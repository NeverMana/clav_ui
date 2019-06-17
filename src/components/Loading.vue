<template>
    <div class="text-xs-center">
        <v-progress-circular
            indeterminate
            color="primary"
        ></v-progress-circular>
        <strong> A carregar os dados...</strong>
    </div>
</template>

<script>
export default {
    name: 'Loading'
}
</script>