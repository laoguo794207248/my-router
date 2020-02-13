import Vue from 'vue'
import Router from '../myRouter'
import Home from '../src/components/Home'
import About from '../src/components/About'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About,
    children: [
      {
        path: 'a',
        component: {
          render() {
            return <h1>About A</h1>
          }
        }
      },
      {
        path: 'b',
        component: {
          render() {
            return <h1>About B</h1>
          }
        }
      }
    ]
  }
]

const router = new Router({
  routes
})

export default router