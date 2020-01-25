import Top from '@/templates/Top'
import About from '@/templates/About'
import NotFound from '@/templates/Notfound'
import TestAnime from '@/templates/TestAnime'

export default [
  {
    path: '/',
    component: Top,
  },
  {
    path: '/anime',
    name: 'TestAnime',
    component: TestAnime,
  },
  { path: '/about', component: About },
  { path: '/notfound', component: NotFound },
  { path: '*', redirect: '/notfound' }
]
