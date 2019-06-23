import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import ExplorePage from './pages/Explore.vue'
import PostDialog from './components/PostDialog.vue'
import P404 from './P404.vue'

export default new VueRouter({
  routes: [
    {
      path: '/explore',
      name: 'explore',
      components: {
        page: ExplorePage
      }    
    },
    {
      path: '/explore/p/:id',
      name: 'post',
      components: {
        page: ExplorePage,
        dialog: PostDialog
      }, 
      props: {
        page: false,
        dialog: true
      }
    },
    {
      path: '*',
      components: {
        page: P404
      }
    }
    
  ]
})