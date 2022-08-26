import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Home from '/src/components/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'




const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('/src/components/admin/Admin.vue'),
    beforeEnter: (to, from) => {
      if(sessionStorage.getItem('admin')){ return true }
      else return {name:'Home'}
    }
  },
  {
   path: '/details/:id',
   name: 'details',
   component: () => import('/src/components/mobiles/MobileDetails.vue'),
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

const httpLink = createHttpLink({
    uri: 'http://localhost:2000/graphql',
  })
  const cache = new InMemoryCache()
  const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
  })

createApp(App)
.use(router)
.provide(DefaultApolloClient, apolloClient)
.mount('#app')