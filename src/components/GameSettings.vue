<template>
    <v-card class="ma-2">
        <v-card-title>
            Create New Game
        </v-card-title>
        <v-card-text>
            <v-form>
                <v-container>
                    <v-row>
                        <v-col cols="3">
                            <v-text-field label="Game Name"/>
                        </v-col>
                        <v-switch label="Public game"/>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-slider :label="maxPlayersLabel" min="2" max="10" v-model="maxPlayers"/>
                        </v-col>
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