/*
 * @Author: 苑振东 
 * @Date: 2019-09-04 19:50:15 
 * @Last Modified by:   苑振东 
 * @Last Modified time: 2019-09-04 19:50:15 
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        name: 'init',
        redirect: '/music'
    }, {
        path: '/music',
        name: 'music',
        component: () =>
            import ('./views/music/music.vue')
    }, {
        path: '/login',
        name: 'login',
        component: () =>
            import ('./views/login/login.vue')
    }, {
        path: '/registry',
        name: 'registry',
        component: () =>
            import ('./views/registry/registry.vue')
    }, {
        path: '*',
        component: () =>
            import ('./views/fourZeroFour/404.vue')
    }]
})

let GuardNavigation = ['/music']

router.beforeEach((to, from, next) => {
    let flag = GuardNavigation.includes(to.path);
    if (flag) {
        let token = localStorage.getItem('token');
        if (token) {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
})

export default router