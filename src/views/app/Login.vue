<template>
    <v-container>
        <v-row align="center" justify="center">
            <h1>Login</h1>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="5">
                <link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css" />
                <div id="firebase-hook">
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import firebase from 'firebase/app'
    import 'firebase/auth'
    import * as firebaseui from 'firebaseui'
    import { mapGetters } from 'vuex'

    let ui = new firebaseui.auth.AuthUI(firebase.auth());

    export default {
        name: "Login",
        mounted() {
            ui.start('#firebase-hook', this.config)
        },
        created() {
            if (this.getRedirectURL) {
                this.redirect = this.getRedirectURL;
            }
            const ref = this;
            this.config = {
                signInOptions: [
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                ],
                callbacks: {
                    // eslint-disable-next-line no-unused-vars
                    signInSuccessWithAuthResult(authResult, redirectUrl) {
                        ref.$store.commit('assignRedirectURL', null);
                        return true;
                    }
                },
                signInFlow: 'popup',
                signInSuccessUrl: `${ref.redirect}`
            }
        },
        data: () => {
            return {
                redirect: '/',
                config: null
            }
        },
        computed: {
            ...mapGetters(['getRedirectURL'])
        }
    }
</script>

<style scoped>
    .center {
        text-align: center;
        justify-content: center;
    }
</style>