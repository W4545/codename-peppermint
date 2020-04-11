<template>
    <div>
        <v-card class="ma-2">
            <v-card-title>Played Cards</v-card-title>
            <CardDisplay/>
        </v-card>
    </div>
</template>

<script>
    import CardDisplay from "../../components/CardDisplay";
    import firebase from 'firebase/app'
    import 'firebase/auth'
    export default {
        name: "Game",
        components: {CardDisplay},
        props: ['gameID'],
        data: () => {
            return {
                user: null
            }
        },
        created() {
            const ref = this;
            firebase.auth().onAuthStateChanged(user => {
                if (user)
                    ref.user = user;
                else {
                    ref.$store.commit('assignRedirectURL', ref.$route.path);
                    ref.$router.push(`/login/`);
                }
            });
        },
        computed: {
        }
    }
</script>

<style scoped>

</style>