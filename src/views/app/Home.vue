<template>
    <v-container>
        <v-row align="center" justify="center" align-content="center">
            <router-link to="/newgame" class="no-decoration">
                <Card :card="helloCard" disable-select-style/>
            </router-link>
            <router-link to='/joingame/none' class="no-decoration">
                <Card :card="selectCard" disable-select-style/>
            </router-link>
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
                selectCard: new CardObj(-2, "Join Game", false, true)
            }
        },
        methods: {
            resetClick() {
                // eslint-disable-next-line no-unused-vars
                firebase.auth().onAuthStateChanged(user => {
                    const db = firebase.firestore()
                    db.collection('cards').get().then(e => console.log(e)).catch(e => console.error(e));
                })
            }
        }
    }
</script>

<style scoped>
    .center {
        text-align: center;
    }
</style>
