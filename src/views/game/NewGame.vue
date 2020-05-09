<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-progress-circular indeterminate/>
    </v-row>
  </v-container>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth'
    import Events from '../../Events'

    export default {
        name: "NewGame",
        data: () => {
            return {
                defaults: {
                    maxPlayers: 10,
                    name: "",
                    isPublic: true,
                },
            }
        },
        created() {
            const ref = this;
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    const server = this.$store.getters.getServer;
                    ref.defaults.name = `${user.displayName}'s game`;
                    server.emit(Events.client.NEW_GAME, user.uid, ref.defaults, (token, game) => {
                      ref.$store.commit('updateGame', game);
                      ref.$router.push(`/lobby/${token}`);
                    });

                } else {
                    ref.$store.commit('assignRedirectURL', ref.$route.path);
                    ref.$router.push('/login');
                }
            });
        },
    }
</script>

<style scoped>

</style>