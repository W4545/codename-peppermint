<template>
  <v-tabs grow>
    <v-tab>Lobby</v-tab>
    <v-tab>Settings</v-tab>
    <v-tab-item>
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-left">Username</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in players" :key="item.uid">
            <td>{{ item.username }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-tab-item>
    <v-tab-item>
      <v-card class="ma-2" :disabled="disabled">
        <v-card-text>
          <GameSettings :visible="visible" @updateGame="updateGame"/>
          <h1 v-if="!visible">Loading...</h1>
        </v-card-text>
        <!--
        <v-card-actions class="ma-2">
          <v-spacer></v-spacer>
          <v-btn large @click="update" :loading="buttonLoading">Update</v-btn>
        </v-card-actions>
        !-->
      </v-card>
    </v-tab-item>
  </v-tabs>
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
        server.emit(Events.client.SET_SETTINGS, this.user.uid, this.$store.getters.getGame.token, attribute, value)
      },
    },
    computed: {
      players() {
        return this.$store.getters.getGame.players;
      }
    }
  }
</script>

<style scoped>

</style>