<template>
  <div class="home">
    <CardDisplay :cards="cards"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CardDisplay from "../components/CardDisplay";
import {CardObj} from "../Constructs";

export default {
  name: 'Home',
  components: {
    CardDisplay
  },
  data() {
    return {

    }
  },
  computed: {
    cards() {
      let cards = [];
      for (let  i = 0; i < 30; i++)
        cards.push(new CardObj(i, `Hello World\n\n${i}`, i % 2 === 0, i % 5 === 0));

      return cards;
    }
  }
}
</script>
