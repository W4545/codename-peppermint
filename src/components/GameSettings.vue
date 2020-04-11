<template>
    <v-card class="ma-2">
        <v-card-title>
            Create New Game
        </v-card-title>
        <v-card-text>
            <v-form>
                <v-container>
                    <v-row>
                        <v-text-field label="Game Name"/>
                        <v-spacer></v-spacer>
                        <v-switch label="Public game"/>
                    </v-row>
                    <v-row>
                        <v-slider :label="maxPlayersLabel" min="2" max="10" v-model="maxPlayers"/>
                        <v-spacer></v-spacer>
                    </v-row>
                </v-container>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "GameSettings",
        data: () => {
            return {
                maxPlayers: 10
            }
        },
        computed: {
            maxPlayersLabel() {
                return `Max Players: ${this.maxPlayers}`;
            }
        }
    }
</script>

<style scoped>

</style>