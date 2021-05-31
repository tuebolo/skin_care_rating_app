import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Contact from '@/components/Contact'
import AddSunscreen from '@/components/AddSunscreen'
import Sunscreen from '@/components/Sunscreen'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/sunscreens/add',
      name: 'AddSunscreen',
      component: AddSunscreen
    },
    {
      path: '/sunscreens/:id',
      name: 'Sunscreen',
      component: Sunscreen
    }
  ]
})
