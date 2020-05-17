<template>
    <v-container fluid>
        <v-row>
            <Card v-for="card in cards" :key="card.id" :text="card.text" :id="card.id" :is-selectable="card.isSelectable" :is-white-card="card.isWhiteCard" @cardClicked="$emit('cardClicked', card.id)"/>
        </v-row>
    </v-container>
</template>

<script>
    import Card from "./Card";

    export default {
        name: "CardDisplay",
        components: {
            Card
        },
        props: {
            cards: Array[Object],
            rowSize: {
                default: 6,
                type: Number
            }
        },
    }
</script>

<style scoped>

</style>