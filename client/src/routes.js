import List from './components/lists/List.vue'
import Today from './components/Today.vue'
import Scheduled from './components/Scheduled.vue'

export const routes = [
  {
    path: '/',
    name: 'list',
    component: List
  },
  {
    path: '/today',
    name: 'today',
    component: Today
  },
  {
    path: '/scheduled',
    name: 'scheduled',
    component: Scheduled
  }
]
