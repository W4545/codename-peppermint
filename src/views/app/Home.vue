<template>
    <v-container>
        <v-row align="center" justify="center" align-content="center">
            <router-link to="/newgame" class="no-decoration">
                <Card :card="helloCard" disable-select-style/>
            </router-link>
            <v-dialog v-model="dialog">
                <template v-slot:activator="{ on }">
                    <div v-on="on">
                        <Card :card="selectCard" disable-select-style/>
                    </div>
                </template>
                <v-card class="pa-2">
                    <v-text-field label="Game Token" v-model="joinCode" @change.once="textTyped"/>
                    <v-label color="red" v-if="incorrect">Provided join code was incorrect.</v-label>
                    <v-card-actions>
                        <v-btn @click="join">Join</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
    import Card from "../../components/Card";
    import { CardObj } from "../../Constructs";
    import firebase from 'firebase/app'
    import 'firebase/auth'
    import 'firebase/firestore'

    export default {
        name: 'Home',
        components: {
            Card
        },
        data() {
            return {
                helloCard: new CardObj(-1, "New Game", true, true),
                selectCard: new CardObj(-2, "Join Game", false, true),
                dialog: false,
                joinCode: "",
                incorrect: false,
            }
        },
        methods: {
            resetClick() {
                // eslint-disable-next-line no-unused-vars
                firebase.auth().onAuthStateChanged(user => {
                    const db = firebase.firestore()
                    db.collection('cards').get().then(e => console.log(e)).catch(e => console.error(e));
                })
            },
            join() {
                const code = this.joinCode;
                this.joinCode = "";
                this.dialog = false;
                this.$router.push(`/joingame/${code}`);
            },
            textTyped() {
                this.incorrect = false;
            }
        }
    }
</script>

<style scoped>
    .center {
        text-align: center;
    }
</style>
