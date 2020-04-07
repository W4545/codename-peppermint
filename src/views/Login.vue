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
    import * as firebase from 'firebase'
    import * as firebaseui from 'firebaseui'
    import {mapMutations} from 'vuex'

    let ui = new firebaseui.auth.AuthUI(firebase.auth());

    export default {
        name: "Login",
        mounted() {
            let ref = this;
            ui.start('#firebase-hook', {
                signInOptions: [
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    firebase.auth.EmailAuthProvider.PROVIDER_ID,
                ],
                callbacks: {
                    // eslint-disable-next-line no-unused-vars
                    signInSuccessWithAuthResult(authResult, redirectUrl) {
                        return true;
                    }
                },
                signInFlow: 'popup',
                signInSuccessUrl: `${ref.redirectURL ? `/${ref.redirectURL}` : '/'}${ref.optionalID ? `/${ref.optionalID}` : ''}`
            })
        },
        props: ['redirectURL', 'optionalID'],
        methods: {
            ...mapMutations(["assignUser"])
        }
    }
</script>

<style scoped>
    .center {
        text-align: center;
        justify-content: center;
    }
</style>