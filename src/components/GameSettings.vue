<template>
  <v-card class="ma-2" v-if="visible" flat>
    <v-card-title>
      Create New Game
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-container>
          <v-row>
            <v-text-field label="Game Name" :value="getName" v-on:change="$emit('updateGame', 'name', $event.target.value) "/>
            <v-spacer></v-spacer>
            <v-switch label="Public game" :value="getIsPublic" v-on:change="$emit('updateGame', 'isPublic', $event.target.value)"/>
          </v-row>
          <v-row>
            <v-slider :label="maxPlayersLabel" min="2" max="10" :value="getMaxPlayers" v-on:change="$emit('updateGame', 'maxPlayers', $event.target.value)"/>
            <v-spacer></v-spacer>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>

  export default {
    name: "GameSettings",
    created() {
    },
    computed: {
      getMaxPlayers() {
        return this.$store.getters.getGame.maxPlayers;
      },
      getIsPublic() {
        return this.$store.getters.getGame.isPublic;
      },
      getName() {
        return this.$store.getters.getGame.getName;
      },
      maxPlayersLabel() {
        return `Max Players: ${this.getMaxPlayers}`;
      },
    },
    props: {
      visible: {
        default: true,
        type: Boolean,
      },
      user: Object,
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>