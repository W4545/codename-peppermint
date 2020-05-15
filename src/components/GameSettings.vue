<template>
  <v-card class="ma-2" :visible="visible" flat :disabled="disabled">
    <v-card-title>
      Settings
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-container>
          <v-row>
            <v-text-field label="Game Name" :value="getName" v-on:change="updateName"/>
            <v-spacer></v-spacer>
            <!--<v-switch label="Public game" :value="getIsPublic" v-on:change="updateIsPublic"/>!-->
          </v-row>
          <v-row>
            <v-slider :label="maxPlayersLabel" min="2" max="10" :value="getMaxPlayers" v-on:change="updateMaxPlayers"/>
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
        return this.$store.getters.getGame.name;
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
      disabled: {
        default: false,
        type: Boolean,
      },
    },
    methods: {
      updateName(e) {
        this.$emit('updateGame', 'name', e);
      },
      updateIsPublic(e) {
        this.$emit('updateGame', 'isPublic', e);
      },
      updateMaxPlayers(e) {
        this.$emit('updateGame', 'maxPlayers', e);
      }
    }
  }
</script>

<style scoped>

</style>