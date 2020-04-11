import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/app/Home.vue'
import Game from "../views/game/Game";
import JoinGame from "../views/game/JoinGame";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/game/:gameID',
        name: 'Game',
        component: Game,
        props: true
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/app/About.vue')
    },
    {
        path: '/settings',
        name: 'Settings',

        component: () => import('../views/app/Settings')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/app/Login'),
    },
    {
        path: '/newgame',
        name: 'NewGame',
        component: () => import('../views/game/NewGame')
    },
    {
        path: '/joingame/:gameID',
        name: 'JoinGame',
        component: JoinGame,
        props: true
    }

];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
