<template>
    <v-list-item link v-bind:to="to" exact-active-class="active" :hidden="hidden">
        <v-list-item-icon>
            <v-icon>mdi-{{icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{title}}</v-list-item-title>
    </v-list-item>
</template>

<script>

    export default {
        name: "NavigationItem",
        props: {
            to: String,
            hidden: {
                default: false,
                type: Boolean,
            },
            icon: String,
            title: String,
        }
    }
</script>

<style scoped>
</style>