<template>
  <Loading/>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth'
    import Events from '../../Events'
    import Loading from "../../components/Loading";

    async function getAuthenticated(server, user) {
      // eslint-disable-next-line no-unused-vars
      return await new Promise((resolve, reject) => {
        user.getIdToken(true).then(token => server.emit(Events.client.AUTHENTICATE, token, success => resolve(success)));
      })
    }

    function newGame(ref, user, server) {
      ref.defaults.name = `${user.displayName}'s game`;
      console.log("asking for game");
      server.emit(Events.client.NEW_GAME, user.displayName, ref.defaults, (token, game, blackCards, whiteCards) => {
        console.log("do I even get called?");
        ref.$store.commit('updateGame', game);
        ref.$store.commit('setWhiteCards', whiteCards);
        ref.$store.commit('setBlackCards', blackCards);
        ref.$router.push(`/lobby/${token}`);
      });
    }

    export default {
        name: "NewGame",
      components: {Loading},
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
                  if (!this.$store.getters.getServerAuthenticationStatus) {
                    getAuthenticated(server, user).then(status => {
                      if (status)
                        newGame(ref, user, server);
                      else {
                        ref.$store.commit('assignRedirectURL', ref.$route.path);
                        ref.$router.push('/login');
                      }
                    });
                  } else
                    newGame(ref, user, server);

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