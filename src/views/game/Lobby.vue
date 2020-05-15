<template>
  <div>
    <v-card>
      <v-card-title v-text="gameTitle"/>
      <v-card-text>
        <v-simple-table>
          <thead>
          <tr>
            <th class="text-left">Username</th>
            <th class="text-right" v-if="!disabled"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in players" :key="item.uid">
            <td>{{ item.username }}</td>
            <td class="text-right" v-if="!disabled">
              <v-btn small>X</v-btn>
            </td>
          </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
      <v-card-actions>
        <v-btn @click.stop="showSettings = true">Settings</v-btn>
        <v-btn @click="start" :disabled="disabled">Start</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="showSettings" hide-overlay>
      <v-card>
        <v-card-text>
          <GameSettings :visible="visible" :disabled="disabled" @updateGame="updateGame"/>
          <h1 v-if="!visible">Loading...</h1>
        </v-card-text>
        <v-card-actions class="ma-0">
          <v-spacer></v-spacer>
          <v-btn large @click.stop="showSettings = false" :loading="buttonLoading">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import GameSettings from "../../components/GameSettings";
  import Events from "../../Events";
  import firebase from "firebase/app";
  import 'firebase/auth'
  export default {
    name: "Lobby",
    components: {GameSettings},
    data: () => {
      return {
        disabled: true,
        visible: true,
        buttonLoading: false,
        user: null,
        showSettings: false,
      }
    },
    props: {
      gameToken: String
    },
    created() {
      const game = this.$store.getters.getGame;
      if (game === null) {
        this.$router.push(`/joingame/${this.gameToken}`);
      }
      const ref = this;
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          ref.user = user;
          if (game.owner === ref.user.uid)
            ref.disabled = false;
        } else {
          ref.$store.commit('assignRedirectURL', ref.$route.path);
          ref.$router.push('/login');
        }
      });
    },
    methods: {
      updateGame(attribute, value) {
        const server = this.$store.getters.getServer;
        server.emit(Events.client.SET_SETTINGS, this.$store.getters.getGame.token, attribute, value);
      },
      start() {
        this.$store.getters.getServer.emit(Events.client.START_GAME);
      }
    },
    computed: {
      players() {
        return this.$store.getters.getGame.players;
      },
      gameTitle() {
        return this.$store.getters.getGame.name;
      }
    }
  }
</script>

<style scoped>

</style>