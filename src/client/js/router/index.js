import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import routes from './routes'
import arr from '@/util/arr'
import firebase from 'firebase/app'
import 'firebase/app';
import 'firebase/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  saveScrollPosition: true,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return { selector: to.hash };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  store.dispatch('setHeaderMenuOpen', false)

  const routeByAuthState = () => {
    const forbiddenDispPathsOnAuth = ['/signin', '/signup']
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (requiresAuth) {
      if (store.state.auth.state) {
        next()
      } else {
        next({
          path: '/signin',
          query: { redirect: to.fullPath }
        })
      }
    } else {
      if (arr.inArray(to.path, forbiddenDispPathsOnAuth) && store.state.auth.state) {
        next({ name:'UserTop' })
      } else {
        next()
      }
    }
  }

  if (store.state.auth.state === null) {
    store.dispatch('checkAuthenticate')
      .then(() => {
        routeByAuthState()
      })
      .catch(err => {
        console.log(err)
      })
  } else {
    routeByAuthState()
  }
})

export default router
