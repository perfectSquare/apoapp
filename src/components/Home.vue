<script setup>
import AllMobiles from '/src/components/mobiles/AllMobiles.vue'
import { ref, Teleport } from 'vue'
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag'
import { useRouter } from 'vue-router'

const router = useRouter()
const samsung = ref(false)
const realme = ref(false)
const oppo = ref(false)
const apple = ref(false)
const adminName = ref('')
const adminPassword = ref('')
const adminShow = ref(false)
const warningShow = ref(false)
const adminClass = ref('p-4 bg-zinc-50 ring-4 ring-zinc-200')

const ADMIN_Q = gql`
  query getAdmins {
    admins {
    id
    username
    password
  }
}`

const { result: admins } = useQuery(ADMIN_Q)

const adminLog = () => {            
    for(let x of admins.value.admins){                      
        if(adminName.value === 'adam'){                      
            if(adminPassword.value === "adam"){    
                sessionStorage.setItem('admin', adminName.value)
                router.push({name: "admin"})     
                return           
            }
        }
        else if(adminName.value === 'naeem'){
            if(adminPassword.value === "naeem"){
                sessionStorage.setItem('admin', adminName.value)
                router.push({name: "admin"})
                return
            }
        }               
    }    
    warningShow.value = true
}
</script>
<template>
<div class="p-6 sm:p-4 mt-2 ring-2 ring-gray-300 relative mainSize">
  <div class="flex flex-col gap-1 items-center">
    <div class="text-xl">Full-Stack Demo App</div>
    <div class="text-sm">Vue-Apollo, GraphQL, MongoDB</div>    
  </div>
    <div class="flex flex-col mt-2 gap-y-2">      
      <button @click="adminShow=true" class="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 m-2 self-center" title="adam, adam">admin</button>            
      <Teleport to="#tel">
        <div v-if="adminShow" :class="adminClass">
        <button class="absolute right-4 self-center -top-1 p-2 text-2xl hover:scale-105 transition-all duration-200" @click="adminShow=false">&#9874;</button>
        <div class="text-center text-2xl mb-4">Admin Login</div>
        <form @submit.prevent="adminLog">
          <div class="grid grid-cols-1 gap-2">
            <div class="grid grid-cols-12 gap-2">
              <label class="col-span-2" for="adminName">username: </label>
              <input class="col-span-10" type="text" name="adminName" v-model="adminName">
            </div>
            <div class="grid grid-cols-12 gap-2">
              <label class="col-span-2" for="adminPassword">password: </label>
              <input class="col-span-10" type="password" name="adminPassword" v-model="adminPassword">
            </div>
            <button class="p-2 bg-gray-50 hover:bg-gray-100">login</button>
          </div>
        </form>
        </div>
      </Teleport>
      <Teleport to="#tel">
        <div v-if="warningShow" class="p-4 bg-red-200 ring-4 ring-zinc-200">
        <button class="absolute right-4 self-center -top-1 p-2 text-2xl hover:scale-105 transition-all duration-200" @click="warningShow=false">&#9874;</button>
        <div class="text-center text-2xl mb-4">Wrong Admin Login</div>        
        </div>
      </Teleport>
      <AllMobiles />
    </div>
</div>
</template>

<style scoped>
.mainSize{
  width: 94%;
  left:3%;  
}
</style>
