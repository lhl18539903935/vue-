import Vue from 'vue'
import Router from 'vue-router'
import index from '@/app/index'
import rong_index from '@/rong/index'
import rong_offline from '@/rong/offline.vue'
import workerman_index from '@/workerman/index'
import workerman_offline from '@/workerman/offline'
Vue.use(Router)
export default  new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/rong_index',
      name: 'rong_index',
      component: rong_index
    },
    { 
      path: '/rong_offline',
      name: 'rong_offline',
      component: rong_offline
    },
    {
      path: '/workerman_index',
      name: 'workerman_index',
      component: workerman_index
    },
    {
      path: '/workerman_offline',
      name: 'workerman_offline',
      component: workerman_offline
    }
  ]
})

