<template>
    <div id="app">
        <v-app>
            <v-app-bar app clipped-left>
                <v-app-bar-nav-icon v-on:click="open = !open"/>
                <router-link to="/" class="no-decoration">
                    <v-toolbar-title :class="{'v-toolbar__title-light': !this.$vuetify.theme.dark, 'v-toolbar__title-dark': this.$vuetify.theme.dark}">Codename Peppermint</v-toolbar-title>
                </router-link>
                <v-spacer></v-spacer>
                <v-btn @click="debug">Debug</v-btn>
                <v-btn @click="signInSignOutClick" v-text="signInOutText" :hidden="signInDisabled"></v-btn>
            </v-app-bar>
            <v-navigation-drawer app overlay-opacity="100" v-model="open" clipped>
                <v-list>
                    <NavigationItem title="Home" icon="home" to="/"/>
                    <NavigationItem title="Game" icon="gamepad-square-outline" :to="gameLink" :hidden="gameLinkHidden"/>
                    <NavigationItem title="Lobby" icon="gamepad-square-outline" :to="lobbyLink" :hidden="lobbyLinkHidden"/>
                    <NavigationItem title="About" icon="about" to="/about"/>
                </v-list>
                <template v-slot:append>
                    <v-list>
                        <NavigationItem title="Settings" icon="cog-outline" to="/settings"/>
                    </v-list>
                </template>
            </v-navigation-drawer>
            <v-content app >
                <router-view/>
            </v-content>
        </v-app>
    </div>
</template>

<script>
    import NavigationItem from "./components/NavigationItem";
    import firebase from 'firebase/app'
    import Events from './Events'
    import 'firebase/auth'
    export default {
        components: {
            NavigationItem
        },
        data: () => {

            return {
                open: false,
                signInOutText: 'Sign in',
                signInDisabled: true
            }
        },
        computed: {
            gameLink() {
                return `/game/${this.$store.getters.getGame ? this.$store.getters.getGame.token : "none"}`;
            },
            lobbyLink() {
                return `/lobby/${this.$store.getters.getGame ? this.$store.getters.getGame.token : "none"}`;
            },
            gameLinkHidden() {
                const game = this.$store.getters.getGame;
                if (!game)
                    return true;
                return !game.isStarted;
            },
            lobbyLinkHidden() {
                const game = this.$store.getters.getGame;
                if (!game)
                    return true;
                return game.isStarted;
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
            });
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
            },
            debug() {
                const server = this.$store.getters.getServer;
                server.emit(Events.client.SEND_DEBUG);
            },
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