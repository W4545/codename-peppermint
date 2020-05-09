<template>
    <v-card class="ma-2" :disabled="disabled">
        <v-card-text>
            <GameSettings :visible="visible" @updateGame="updateGame"/>
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
    import Events from '../../Events'

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
                    const server = this.$store.getters.getServer;
                    server.emit(Events.client.NEW_GAME, user.uid);

                    ref.$emit('update')
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
            },
            updateGame(attribute, value) {
                const server = this.$store.getters.getServer;
                server.emit(Events.client.SET_SETTINGS, this.user.uid, this.$store.getters.getGame.token, attribute, value)
            }
        },
    }
</script>

<style scoped>

</style>