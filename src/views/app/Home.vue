<template>
    <v-container>
        <v-row align="center" justify="center" align-content="center">
            <router-link to="/newgame" class="no-decoration">
                <Card disable-select-style text="New Game" is-white-card is-selectable/>
            </router-link>
            <v-dialog v-model="dialog">
                <template v-slot:activator="{ on }">
                    <div v-on="on">
                        <Card text="Join Game" disable-select-style is-selectable/>
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
                helloCard: {id: 0, text: "New Game", isWhiteCard: true, isSelectable: true},
                selectCard: {id: 1, text: "Join Game", isWhiteCard: false, isSelectable: true},
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
