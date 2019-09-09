import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import routes from './routes'

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

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  store.dispatch('checkAuthenticate')
    .then(() => {
      store.dispatch('setIsLoading', false)
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
        if (to.path === '/signin' && store.state.auth.state) {
          next({ path: '/member' })
        } else {
          next()
        }
      }
    })
    .catch(err => {
      console.log(err)
    })
})

export default router
