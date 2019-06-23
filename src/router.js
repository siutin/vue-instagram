import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const ExplorePage = () => import('./pages/Explore.vue')
const PostDialog = () => import('./components/PostDialog.vue')
const P404 = () => import('./P404.vue')

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