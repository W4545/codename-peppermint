<template>
  <Loading/>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth'
    import Events from '../../Events'
    import Loading from "../../components/Loading";

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
                    ref.defaults.name = `${user.displayName}'s game`;
                    user.getIdToken(true).then((idToken) => {
                        server.emit(Events.client.NEW_GAME, idToken, user.displayName, ref.defaults, (token, game) => {
                            ref.$store.commit('updateGame', game);
                            ref.$router.push(`/lobby/${token}`);
                        });
                    })


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