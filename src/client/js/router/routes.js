import Top from '@/templates/Top';
import About from '@/templates/About';
import NotFound from '@/templates/Notfound';
import SignUp from '@/templates/SignUp'
import SignIn from '@/templates/SignIn'
import UserTop from '@/templates/UserTop'
import Chats from '@/templates/Chats'
import ChatkDetail from '@/templates/ChatDetail'
import ChatCreate from '@/templates/ChatCreate'
import ChatEdit from '@/templates/ChatEdit'
import AdminTop from '@/templates/AdminTop'
import AdminSignIn from '@/templates/AdminSignIn'

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
  {
    path: '/chats/create',
    name: 'ChatCreate',
    component: ChatCreate,
    meta: { requiresAuth: true }
  },
  {
    path: '/chats/edit/:id',
    name: 'ChatEdit',
    component: ChatEdit,
    meta: { requiresAuth: true }
  },
  {
    path: '/chats/:id',
    name: 'chatkDetail',
    component: ChatkDetail,
  },
  {
    path: '/admin/signin',
    name: 'AdminSignIn',
    component: AdminSignIn
  },
  {
    path: '/admin',
    name: 'AdminTop',
    component: AdminTop,
    meta: { requiresAuth: true }
  },
  { path: '/about', component: About },
  { path: '/notfound', component: NotFound },
  { path: '*', redirect: '/notfound' }
]
