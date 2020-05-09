<template>
  <div>
    <Loading/>
    <v-dialog v-model="showDialog">
      <v-card>
        <v-label>The provided join code was invalid.</v-label>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="goToHome">Exit to Home</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
    import Loading from "../../components/Loading";
    import firebase from "firebase/app"
    import "firebase/auth"
    import Events from "../../Events";

    export default {
        name: "JoinGame",
        components: {Loading},
        props: {
            gameToken: String,
        },
        data: () => {
            return {
                showDialog: false,
            };
        },
        created() {
            const ref = this;
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    const server = ref.$store.getters.getServer;
                    user.getIdToken(true).then((userToken) => {
                        server.emit(Events.client.JOIN_GAME, userToken, user.displayName, ref.gameToken, (game) => {
                            if (game !== null) {
                                ref.$store.commit("updateGame", game);
                                ref.$router.push(`/lobby/${ref.gameToken}`);
                            } else {
                                ref.showDialog = true;
                            }
                        });
                    });
                } else {
                    ref.$store.commit('assignRedirectURL', ref.$route.path);
                    ref.$router.push('/login');
                }
            });
        },
        methods: {
            goToHome() {
                this.showDialog = false;
                this.$router.push("/");
            }
        }
    }
</script>

<style scoped>

</style>