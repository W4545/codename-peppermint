<template>
    <v-container>
        <v-row align="center" justify="center">
            <h1>Login</h1>
        </v-row>
        <v-row align="center" justify="center" v-if="loading">
            <v-progress-circular indeterminate/>
        </v-row>
        <v-row align="center" justify="center">
            <div id="firebase-hook">
            </div>
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
                    },
                    uiShown() {
                        ref.loading = false;
                    }
                },
                signInSuccessUrl: ref.redirect,
            }
        },
        data: () => {
            return {
                redirect: '/',
                config: null,
                loading: true
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