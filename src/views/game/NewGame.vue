<template>
    <v-card class="ma-2" :disabled="disabled">
        <v-card-text>
            <GameSettings :visible="visible"/>
            <h1 v-if="!visible">Loading...</h1>
        </v-card-text>

        <v-card-actions class="ma-2">
            <v-spacer></v-spacer>
            <v-btn large @click="start" :loading="buttonLoading">Start</v-btn>
        </v-card-actions>
    </v-card>
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
                user: null,
                visible: false,
                disabled: false,
                buttonLoading: false,
            }
        },
        created() {
            const ref = this;
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    ref.user = user;
                    ref.$store.commit('updateMaxPlayers', 10);
                    ref.$store.commit('updateName', `${this.user.displayName}'s game`);
                    ref.$store.commit('updateIsPublic', true);
                    ref.visible = true;
                } else {
                    ref.$store.commit('assignRedirectURL', ref.$route.path);
                    ref.$router.push('/login');
                }
            });
        },
        methods: {
            start() {
                this.disabled = true;
                this.buttonLoading = true;
            }
        }
    }
</script>

<style scoped>

</style>