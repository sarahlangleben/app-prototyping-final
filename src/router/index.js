import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ForumView from '../views/ForumView.vue'
import ItineraryView from '../views/ItineraryView.vue'
import AnnouncementListView from '../views/AnnouncementListView.vue'
import ForumThreadView from '../views/ForumThreadView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/forum',
      name: 'forum',
      component: ForumView
    },
    {
      path: '/forum-thread/:forum_id',
      name: 'forum-thread',
      component: ForumThreadView
    },
    {
      path: '/itinerary',
      name: 'itinerary',
      component: ItineraryView
    },
    {
      path: '/announcements',
      name: 'announcements',
      component: AnnouncementListView
    },
  ]
})

export default router
