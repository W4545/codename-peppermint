<template>
    <div id="app">
        <v-app>
            <v-app-bar app clipped-left>
                <v-app-bar-nav-icon v-on:click="open = !open"/>
                <router-link to="/" class="no-decoration">
                    <v-toolbar-title :class="{'v-toolbar__title-light': !this.$vuetify.theme.dark, 'v-toolbar__title-dark': this.$vuetify.theme.dark}">Codename Peppermint</v-toolbar-title>
                </router-link>
                <v-spacer></v-spacer>
                <v-btn @click="signInSignOutClick" v-text="signInOutText" :hidden="signInDisabled"></v-btn>
            </v-app-bar>
            <v-navigation-drawer app overlay-opacity="100" v-model="open" clipped>
                <v-list >
                    <NavigationItem v-for="nav in top" :key="nav.title" :nav="nav"/>
                </v-list>
                <template v-slot:append>
                    <v-list>
                        <NavigationItem v-for="nav in bottom" :key="nav.title" :nav="nav"/>
                    </v-list>
                </template>
            </v-navigation-drawer>
            <v-content app>
                <router-view />
            </v-content>
        </v-app>
    </div>
</template>

<script>
    import NavigationItem from "./components/NavigationItem";
    import {NavObj} from "./Constructs";
    import firebase from 'firebase/app'
    import 'firebase/auth'
    export default {
        components: {
            NavigationItem
        },
        data: () => {
            return {
                open: false,
                navs: [
                    new NavObj("Home", "home", "/"),
                    new NavObj("Game", "gamepad-square-outline", "/game", false, true),
                    new NavObj("About", "about", "/about"),
                    new NavObj("Settings", 'cog-outline', '/settings', true),
                ],
                signInOutText: 'Sign in',
                signInDisabled: true
            }
        },
        computed: {
            top() {
                return this.navs.filter(nav => !nav.bottom);
            },
            bottom() {
                return this.navs.filter(nav => nav.bottom);
            }
        },
        created() {
            this.$vuetify.theme.dark = this.$store.getters.getDark;
            const ref = this;
            firebase.auth().onAuthStateChanged(user => {
                if (user)
                    ref.signInOutText = 'Sign out'
                else
                    ref.signInOutText = 'Sign in'
                ref.signInDisabled = false;
            })
        },
        methods: {
            signInSignOutClick() {
                if (this.signInOutText === 'Sign in')
                {
                    this.$store.commit('assignRedirectURL', this.$route.path)
                    this.$router.push('/login/');
                } else {
                    firebase.auth().signOut().then(() => {
                        window.location.reload();
                    })
                }
            }
        }
    }
</script>

<style>

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .no-decoration {
        text-decoration: none;
    }

    .v-toolbar__title-light {
        color: black;
    }

    .v-toolbar__title-dark {
        color: white;
    }
</style>