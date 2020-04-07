<template>
    <v-container class="center">
        <div id="firebaseui-auth-container">

        </div>
        <v-row align="center" justify="center">
            <Card :card="helloCard"/>
            <Card :card="selectCard"/>
        </v-row>
        <v-row align="center" justify="center">
            <v-btn x-large>New Game</v-btn>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="5">
                <v-text-field label="Join Game"/>
            </v-col>
            <v-btn x-large>Connect</v-btn>
        </v-row>
    </v-container>

</template>

<script>
    import Card from "../components/Card";
    import {CardObj} from "../Constructs";

    export default {
        name: 'Home',
        components: {
            Card
        },
        data() {
            return {
                helloCard: new CardObj(-1, "Welcome to Codename Peppermint!", true, false),
                selectCard: new CardObj(-2, "Select an option below!", false, false)
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .center {
        text-align: center;
    }
</style>
