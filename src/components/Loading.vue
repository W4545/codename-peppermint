<template>
    <v-container fluid :hidden="hidden">
        <v-row align="center" justify="center">
            <v-progress-circular indeterminate/>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Loading",
        props: {
            hidden: {
                default: false,
                type: Boolean,
            }
        }
    }
</script>

<style scoped>

</style>