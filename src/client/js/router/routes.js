import Top from '../templates/Top';
import About from '../templates/About';
import NotFound from '../templates/Notfound';
import SignUp from '../templates/SignUp'
import SignIn from '../templates/SignIn'
import UserTop from '../templates/UserTop'
import Chats from '../templates/Chats'

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
    path: '/user',
    name: 'UserTop',
    component: UserTop,
    meta: { requiresAuth: true }
  },
  {
    path: '/chats',
    name: 'Chats',
    component: Chats,
  },
  { path: '/about', component: About },
  { path: '/notfound', component: NotFound },
  { path: '*', redirect: '/notfound' }
]
