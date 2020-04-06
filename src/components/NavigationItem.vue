<template>
    <v-list-item link v-bind:to="nav.to" exact-active-class="active">
        <v-list-item-icon>
            <v-icon>mdi-{{nav.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{nav.title}}</v-list-item-title>
    </v-list-item>
</template>

<script>
    import {NavObj} from "../Constructs";

    export default {
        name: "NavigationItem",
        props: {
            nav: NavObj
        }
    }
</script>

<style scoped>
</style>