<template>
  <v-hover v-if="isSelectable" v-slot:default="{ hover }" :disabled="!isSelectable">
    <v-card  class="ma-2" min-width="15rem" max-width="14rem" min-height="20rem"
             :color="cardColor" :elevation="isSelected || hover ? 24 : 2" @click="cardClicked">
      <v-card-text class="title">
        <div :class="{'black-card': !isWhiteCard, 'white-card': isWhiteCard}" v-html="text">
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
  <v-card v-else class="ma-2" min-width="15rem" max-width="14rem" min-height="20rem" :color="cardColor">
    <v-card-text class="title">
      <div :class="{'black-card': !isWhiteCard, 'white-card': isWhiteCard}" v-html="text">
      </div>
    </v-card-text>
  </v-card>
</template>

<script>

  export default {
    name: "Card",
    model: {
      prop: 'isSelected',
      event: 'changed',
    },
    props: {
      text: String,
      id: Number,
      isSelectable: Boolean,
      isWhiteCard: Boolean,
      isSelected: Boolean,
      disableSelectStyle: {
        default: false,
        type: Boolean
      },
    },
    data() {
      return {
        cardColor: 'black',
      }
    },
    methods: {
      cardClicked() {
        if (this.isSelectable) {
          const newVal = !this.isSelected;
          this.$emit("changed", newVal);
          this.computeCardColor(newVal);
        }
      },

      computeCardColor(newVal) {
        if (this.disableSelectStyle)
          this.cardColor = this.isWhiteCard ? 'white' : 'black'
        else if (newVal && this.isWhiteCard)
          this.cardColor = '#acacac';
        else if (this.isWhiteCard && !newVal)
          this.cardColor = 'white';
        else if (!this.isWhiteCard && newVal)
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