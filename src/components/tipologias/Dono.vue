<template>
    <v-container>     
        <v-card>
            <Dropdown :list="donos" buttontext="Donos de:" />
        </v-card>
    </v-container>
</template>

<script>
import Dropdown from '@/components/tipologias/Dropdown.vue'

export default {
    props: ['donos'],
    components: {
        Dropdown
    }
}
</script>

