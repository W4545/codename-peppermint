<template>
    <v-container fluid>
        <v-row>
            <Card v-for="card in cards" :key="card.id" :card="card"/>
        </v-row>
    </v-container>
</template>

<script>
    import Card from "./Card";
    import {CardObj} from "../Constructs";

    export default {
        name: "CardDisplay",
        components: {
            Card
        },
        props: {
            cards: Array[CardObj],
            rowSize: {
                default: 6,
                type: Number
            }
        },
    }
</script>

<style scoped>

</style>