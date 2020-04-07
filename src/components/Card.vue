<template>
    <v-hover v-slot:default="{ hover }" :disabled="!card.isSelectable">
        <v-card v-if="card.isSelectable" class="ma-2" min-width="15rem" max-width="14rem" min-height="20rem"
                :color="cardColor" :elevation="card.isSelected || hover ? 24 : 2" @click="cardClicked">
            <v-card-text class="title">
                <div :class="{'black-card': !card.isWhiteCard, 'white-card': card.isWhiteCard}">
                    {{card.text}}
                </div>
            </v-card-text>
        </v-card>
        <v-card v-else class="ma-2" min-width="15rem" max-width="14rem" min-height="20rem" :color="cardColor">
            <v-card-text class="title">
                <div :class="{'black-card': !card.isWhiteCard, 'white-card': card.isWhiteCard}">
                    {{card.text}}
                </div>
            </v-card-text>
        </v-card>
    </v-hover>
</template>

<script>
    import {CardObj} from "../Constructs";

    export default {
        name: "Card",
        props: {
            card: CardObj
        },
        data() {
            return {
                cardColor: 'black'
            }
        },
        computed: {
        },
        methods: {
            cardClicked() {
                if (this.card.isSelectable)
                {
                    console.log(`Card ${this.card.id} has been clicked. Toggling selection`);
                    this.card.isSelected = !this.card.isSelected;
                    this.computeCardColor();
                }
            },

            computeCardColor() {
                if (this.card.isSelected && this.card.isWhiteCard)
                    this.cardColor = '#acacac';
                else if (this.card.isWhiteCard && !this.card.isSelected)
                    this.cardColor = 'white';
                else if (!this.card.isWhiteCard && this.card.isSelected)
                    this.cardColor = '#424242';
                else
                    this.cardColor = 'black';
            }

        },
        created() {
            this.computeCardColor();
        },
    }
</script>

<style scoped>
    .black-card {
        color: white;
    }

    .white-card {
        color: black;
    }

</style>