<template>
    <div>
        <v-card>
            <v-card-title>Played Cards</v-card-title>
            <CardDisplay/>
        </v-card>
    </div>
</template>

<script>
    import CardDisplay from "../components/CardDisplay";
    export default {
        name: "Game",
        components: {CardDisplay},
        created() {

        }
    }
</script>

<style scoped>

</style>