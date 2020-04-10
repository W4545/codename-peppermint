<template>
    <v-card class="ma-2">
        <v-card-title>Settings</v-card-title>

        <v-card-text>
            <v-container>
                <v-row>
                    <v-card flat>
                        <v-card-title>App Settings</v-card-title>

                        <v-card-text>
                            <v-form>

                                <v-switch label="Dark Mode" v-on:change="toggleDark" v-model="state"/>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-row>
                <v-row v-if="userSignedIn">
                    <v-card flat>
                        <v-card-title>User Settings</v-card-title>

                        <v-card-text>
                            <v-form ref="userForm">
                                <v-text-field label="Username" :rules="rules" v-model="username"/>
                                <v-btn @click="submit" :loading="submitLoading" :disabled="submitDisabled">Save</v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
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

                    console.log(this.user);
                }
            },
            toggleSubmit() {
                this.submitLoading = !this.submitLoading;
                this.submitDisabled = !this.submitDisabled;
            }
        },
        data: () => {
            return {
                state: false,
                userSignedIn: false,
                usernameMin: 4,
                username: '',
                user: null,
                submitLoading: false,
                submitDisabled: false,
            }
        },
        created() {
            this.state = this.$store.getters.getDark;
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
            })
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