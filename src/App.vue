<template>
  <div id="app">
    <v-app>
      <v-app-bar app clipped-left>
        <v-app-bar-nav-icon v-on:click="open = !open"/>
        <router-link to="/" class="toolbar-title">
          <v-toolbar-title color="black">Tasks</v-toolbar-title>
        </router-link>
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

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<script>
  import NavigationItem from "./components/NavigationItem";
  import {NavObj} from "./Constructs";
  export default {
    components: {
      NavigationItem
    },
    data: () => {
      return {
        open: false,
        navs: [
                new NavObj("Home", "home")
        ]
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
  }
</script>