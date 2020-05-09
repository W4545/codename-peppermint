<template>
        <v-tabs grow>
            <v-tab>App</v-tab>
            <v-tab v-if="userSignedIn">User</v-tab>
            <v-tab-item>
                <v-card flat>
                    <v-card-title>App Settings</v-card-title>

                    <v-card-text>
                        <v-form>

                            <v-switch label="Dark Mode" v-on:change="toggleDark" v-model="darkModeState"/>
                        </v-form>
                        <v-label class="pa-2">
                            App settings are saved automatically
                        </v-label>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-title>User Settings</v-card-title>

                    <v-card-text>
                        <v-form ref="userForm">
                            <v-text-field label="Username" :rules="rules" v-model="username"/>
                        </v-form>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn @click="submit" :loading="submitLoading" :disabled="submitDisabled" large>Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-tab-item>
        </v-tabs>
</template>

<script>
    import {mapMutations} from 'vuex'
    import firebase from 'firebase/app'
    import 'firebase/auth'
    import 'firebase/firestore'

    export default {
        name: "Settings",
        methods: {
            ...mapMutations(['toggleDark']),
            submit() {
                this.toggleSubmit();
                if (this.$refs.userForm.validate()) {
                    this.user.updateProfile({
                        displayName: this.username
                    }).then(() => this.toggleSubmit()).catch(error => {
                        console.error(error);
                        this.toggleSubmit();
                    })
                }
            },
            toggleSubmit() {
                this.submitLoading = !this.submitLoading;
                this.submitDisabled = !this.submitDisabled;
            }
        },
        data: () => {
            return {
                darkModeState: false,
                userSignedIn: false,
                usernameMin: 4,
                username: '',
                user: null,
                submitLoading: false,
                submitDisabled: false,
            }
        },
        created() {
            this.darkModeState = this.$store.getters.getDark;
            const ref = this;
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    ref.userSignedIn = true;
                    ref.user = user;
                    this.username = user.displayName;
                } else {
                    ref.userSignedIn = false;
                    ref.user = null;
                }
            });
        },
        computed: {
            rules() {
                const rules = [];

                if (this.usernameMin) {
                    const rule = v => (v || '').length >= this.usernameMin || `A username must be at least ${this.usernameMin} characters`

                    rules.push(rule);
                }

                return rules;
            }
        },
    }
</script>

<style scoped>

</style>