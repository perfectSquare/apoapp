<template><div class="m-2 p-4">
    <div class="p-2 bg-gray-300">Company</div>
    <div class="flex flex-col md:grid md:grid-cols-12 gap-2 mt-4">
        <div class="md:col-span-8 p-2 ring-1 ring-zinc-100 rounded-md">            
            <div v-if="loading">Loading ...</div>
            <div v-else-if="error">{{error}}</div>
                <div v-else-if="result && result.mobile" class="grid grid-cols-2 gap-2 p-2 rounded-sm box">                
                <img :src="result.mobile.image" class="w-96 md:w-full self-center">
                <div class="flex flex-col gap-2">
                    <div class="text-2xl">{{result.mobile.name}}</div>
                    <div>{{result.mobile.ram}} GB / {{result.mobile.rom}} GB</div>
                    <div class="text-green-600 text-xl">Rs. {{  result.mobile.price}}</div>
                        <div>{{result.mobile.color}}</div>
                        <div>{{result.mobile.size}}</div>
                        <div><span v-if="result.mobile.quantity>0">available</span><span v-else>unavailable</span></div>
                        <div v-if="result.mobile.weight">{{result.mobile.weight}}</div>
                        <div v-if="result.mobile.resolution">{{result.mobile.resolution}}</div>
                        <div v-if="result.mobile.platform">{{result.mobile.platform}}</div>
                        <div v-if="result.mobile.camera">{{result.mobile.camera}}</div>
                        <div v-if="result.mobile.battery">{{result.mobile.battery}}</div>
                        <div v-if="result.mobile.bluetooth">{{result.mobile.bluetooth}}</div>
                        <div v-if="result.mobile.brand.website">
                            brand:
                            <a :href="result.mobile.brand.website">{{result.mobile.brand.name}}</a>                            
                        </div>
                    </div>
                </div>        
        </div>
        <div class="md:col-span-4 p-4"> <!-- right -->
            <div class="cart flex">
                <div class="text-4xl p-2 ring-1 rounded-l-lg ring-gray-400"><button @click="counterMinus" class="hover:scale-110">-</button></div>
                <div class="flex text-3xl pl-4 pr-4 ring-1 shadow-lg ring-gray-400"><span class="self-center">cart</span></div>
                <div class="text-4xl p-2 ring-1 rounded-r-lg ring-gray-400"><button  @click="counter++" class="hover:scale-110">+</button></div>
                <div class="text-3xl p-2 rounded-full bg-green-50 absolute right-44 md:right-8">{{counter}}</div>
            </div>
        </div>
    </div>
    
    
</div></template>

<script setup>
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag'
import { ref } from 'vue'

    const route = useRoute()    
    const id = route.params.id
    const counter = ref(0)
    const counterMinus = () => {
        if(counter.value < 1){ counter.value = 0; return }
        else counter.value--
    }    
    const variables = ref({ id: id })
    const GET_DETAILS = gql`
    query getDetails ($id: ID!) {
  mobile(id: $id) {
    id
    name
    quantity
    weight
    ram
    resolution
    rom
    image
    brandID
    platform
    price
    sim
    size
    camera
    color
    battery
    bluetooth
    brand {
      id
      name
      website
    }    
  }
}
    `
    const { result, loading, error } = useQuery(GET_DETAILS, variables)

    const forThisMobile = (x) => variables.value = { id: x }
</script>

<style scoped>

</style>