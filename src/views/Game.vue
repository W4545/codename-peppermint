<template>
    <div>
        <v-card class="ma-2">
            <v-card-title>Played Cards</v-card-title>
            <CardDisplay/>
        </v-card>
    </div>
</template>

<script>
    import CardDisplay from "../components/CardDisplay";
    import * as firebase from 'firebase'
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
                else
                    ref.$router.push(`/login/game/${ref.gameID}`);
            });
        },
        computed: {
        }
    }
</script>

<style scoped>

</style>