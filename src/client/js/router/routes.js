import Top from '../templates/Top';
import About from '../templates/About';
import NotFound from '../templates/Notfound';
import SignUp from '../templates/SignUp'
import SignIn from '../templates/SignIn'
import MemberTop from '../templates/MemberTop'

export default [
  {
    path: '/',
    component: Top,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/member',
    name: 'MemberTop',
    component: MemberTop,
    meta: { requiresAuth: true }
  },
  { path: '/about', component: About },
  { path: '/notfound', component: NotFound },
  { path: '*', redirect: '/notfound' }
]
