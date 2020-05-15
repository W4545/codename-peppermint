<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        Played Cards
                    </v-card-title>
                    <v-card-text>
                        <CardDisplay :cards="cards"/>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        Your Hand
                    </v-card-title>
                    <v-card-text>
                        <CardDisplay :cards="cards"/>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import CardDisplay from "../../components/CardDisplay";
    import firebase from 'firebase/app'
    import { CardObj } from "../../Constructs";
    import 'firebase/auth'
    export default {
        name: "Game",
        components: {CardDisplay},
        props: ['gameID'],
        data: () => {
            return {
                user: null,
                cards: [new CardObj(33, "Welcome to hell", true, true)],
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