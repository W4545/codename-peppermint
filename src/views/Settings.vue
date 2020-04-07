<template>
    <v-card class="ma-2">
        <v-card-title>Settings</v-card-title>

        <v-card-text>
            <v-form>
                <v-switch label="Dark Mode" v-on:change="toggleDark" v-model="state"/>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
    import {mapMutations} from 'vuex'

    export default {
        name: "Settings",
        methods: {
            ...mapMutations(['toggleDark'])
        },
        data: () => {
            return {
                state: false
            }
        },
        created() {
            this.state = this.$store.getters.getDark;
        }
    }
</script>

<style scoped>

</style>