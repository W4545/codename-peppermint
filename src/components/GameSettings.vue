<template>
    <v-card class="ma-2" v-if="visible" flat>
        <v-card-title>
            Create New Game
        </v-card-title>
        <v-card-text>
            <v-form>
                <v-container>
                    <v-row>
                        <v-text-field label="Game Name" :value="getName" v-on:change="updateName"/>
                        <v-spacer></v-spacer>
                        <v-switch label="Public game" :value="getIsPublic" v-on:change="updateIsPublic"/>
                    </v-row>
                    <v-row>
                        <v-slider :label="maxPlayersLabel" min="2" max="10" :value="getMaxPlayers" v-on:change="updateMaxPlayers"/>
                        <v-spacer></v-spacer>
                    </v-row>
                </v-container>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';

    export default {
        name: "GameSettings",
        created() {
        },
        computed: {
            ...mapGetters(['getGameSettings', 'getMaxPlayers', 'getIsPublic', 'getName']),
            maxPlayersLabel() {
                return `Max Players: ${this.getMaxPlayers}`;
            },
        },
        props: {
            visible: {
                default: true,
                type: Boolean,
            }
        },
        methods: {
            ...mapMutations(['updateMaxPlayers', 'updateName',]),
            updateIsPublic(e) {
                this.$store.commit('updateIsPublic', e !== null ? e : false);
            }
        }
    }
</script>

<style scoped>

</style>