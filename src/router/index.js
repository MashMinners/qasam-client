import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/start',
        redirect: '/'
    },
    {
        path: '/',
        name: 'start',
        meta: {
            layout: 'Application'
        },
        component: function () {
            return import('../views/StageStart.vue')
        }
    },
    {
        path: '/scanning',
        name: 'scanning',
        meta: {
            layout: 'Application'
        },
        component: function () {
            return import('../views/StageScanning.vue')
        }
    },
    {
        path: '/vote/:uuid',
        name: 'vote',
        meta: {
            layout: 'Application',
        },
        component: function () {
            return import('../views/StageVote.vue')
        }
    },
    {
        path: '/comment',
        name: 'comment',
        meta: {
            layout: 'Application',
        },
        component: function () {
            return import('../views/StageComment.vue')
        }
    },
    {
        path: '/finish',
        name: 'finish',
        meta: {
            layout: 'Application',
        },
        component: function () {
            return import('../views/StageFinish.vue')
        }
    },
    {
        path: '/voted',
        name: 'voted',
        meta: {
            layout: 'Application',
        },
        component: function () {
            return import('../views/StageFinish.vue')
        }
    },
    {
        path: '/control-panel',
        name: 'control-panel',
        meta: {
            layout: 'ControlPanel',
        },
        component: function () {
            //return import('../views/StageFinish.vue')
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
