<template>
    <GameSettings/>
</template>

<script>
    import GameSettings from "../../components/GameSettings";
    import firebase from 'firebase/app';
    import 'firebase/auth'

    export default {
        name: "NewGame",
        components: {
            GameSettings
        },
        data: () => {
            return {
                user: null
            }
        },
        created() {
            const ref = this;
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    ref.user = user;
                } else {
                    ref.$store.commit('assignRedirectURL', ref.$route.path);
                    ref.$router.push('/login');
                }
            })
        }
    }
</script>

<style scoped>

</style>