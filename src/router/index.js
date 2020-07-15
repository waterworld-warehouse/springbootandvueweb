import Vue from 'vue'
import VueRouter from 'vue-router'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Index from '../views/Index'
import PageThree from '../views/PageThree'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '书籍管理',
    component: Index,
    show: true,
    children: [
      {
        path: '/pageOne',
        name: '查询图书',
        component: PageOne
      },
      {
        path: '/pageTwo',
        name: '添加图书',
        component: PageTwo
      }
    ]
  },
  {
    path: '/pageThree',
    name: '修改图书',
    component: PageThree,
    show: false
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
