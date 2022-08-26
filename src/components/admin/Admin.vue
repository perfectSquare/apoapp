<template>
    <div class="p-2 md:p-4 ring-2 ring-zinc-300 rounded-sm m-4">
        <div>
            <div class="text-2xl p-1">Company: Admin Page</div>            
            <div class="p-4 border-b-2 border-gray-300 bg-zinc-50 rounded-md relative flex">
                Admin: {{adminName}}
                <button @click="adminOut" :class="btnAdmin">logout</button>
            </div>
        </div> 
        <div class="flex flex-col gap-4 md:grid md:grid-cols-12 mt-4">
            <div class="flex md:flex-col gap-2 md:col-span-2">
                <button :class="btnClass" @click="createShow=true; updateShow=deleteShow=false">create</button>
                <button :class="btnClass" @click="updateShow=true; createShow=deleteShow=false">update</button>
                <button :class="btnClass" @click="deleteShow=true; updateShow=createShow=false">delete</button>
            </div>
            <div class="p-1 md:p-2 md:col-span-10 ring-2 ring-zinc-100 rounded-md">
                <Transition><div v-if="createShow" class="p-2">                
                    <div class="md:p-2">
                        <form @submit.prevent="addMobile()">
                        <div class="flex flex-col gap-2">
                        <div class="grid grid-cols-12 gap-2">
                            <label class="col-span-3" for="mID">ID*</label>
                            <input class="col-span-9 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="mID" v-model="mID">
                        </div>
                        <div class="grid grid-cols-12 gap-2">
                            <label class="col-span-3" for="mName">mobile name*</label>
                            <input class="col-span-9 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="mName" v-model="mName">
                        </div>                        
                        <div class="grid grid-cols-12 gap-2">
                            <label class="col-span-3" for="sim">sim*</label>
                            <input class="col-span-9 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="sim" v-model="sim">
                        </div>                        
                        <div class="grid grid-cols-12 gap-2">
                            <label class="col-span-3" for="mColor">color*</label>
                            <input class="col-span-9 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="mColor" v-model="mColor">
                        </div>                        
                        <div class="grid grid-cols-12 gap-2">
                            <label class="col-span-3" for="ram">ram*</label>
                            <input class="col-span-9 outline-none ring-1 ring-gray-300 rounded-md" type="number" name="ram" v-model="ram" min="1">
                        </div>                        
                        <div class="grid grid-cols-12 gap-2">
                            <label class="col-span-3" for="rom">rom*</label>
                            <input class="col-span-9 outline-none ring-1 ring-gray-300 rounded-md" type="number" name="rom" v-model="rom" min="1">
                        </div>
                        <div class="grid grid-cols-12 gap-2">
                            <label class="col-span-3" for="price">price*</label>
                            <input class="col-span-9 outline-none ring-1 ring-gray-300 rounded-md" type="number" name="price" v-model="price">
                        </div>                        
                        <div class="grid grid-cols-12 gap-2">
                            <label class="col-span-3" for="size">size*</label>
                            <input class="col-span-9 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="size" v-model="size">
                        </div>                        
                        <div class="grid grid-cols-12 gap-2">
                            <label class="col-span-3" for="quantity">quantity*</label>
                            <input class="col-span-9 outline-none ring-1 ring-gray-300 rounded-md" type="number" name="quantity" v-model="quantity" min="1">
                        </div>
                        <div class="grid grid-cols-12 gap-2">
                            <label class="col-span-3" for="image">image*</label>
                            <input class="col-span-9 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="image" v-model="image">
                        </div>                        
                        <div class="grid grid-cols-12 gap-2">
                            <label class="col-span-3" for="weight">weight</label>
                            <input class="col-span-9 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="weight" v-model="weight">
                        </div>                        
                        <div class="grid grid-cols-12 gap-2">
                            <label class="col-span-3" for="resolution">resolution</label>
                            <input class="col-span-9 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="resolution" v-model="resolution">
                        </div>                        
                        <div class="grid grid-cols-12 gap-2">
                            <label class="col-span-3" for="platform">platform</label>
                            <input class="col-span-9 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="platform" v-model="platform">
                        </div>                        
                        <div class="grid grid-cols-12 gap-2">
                            <label class="col-span-3" for="camera">camera</label>
                            <input class="col-span-9 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="camera" v-model="camera">
                        </div>                        
                        <div class="grid grid-cols-12 gap-2">
                            <label class="col-span-3" for="bluetooth">bluetooth</label>
                            <input class="col-span-9 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="bluetooth" v-model="bluetooth">
                        </div>                        
                        <div class="grid grid-cols-12 gap-2">
                            <label class="col-span-3" for="battery">battery</label>
                            <input class="col-span-9 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="battery" v-model="battery">
                        </div>                        
                        <div class="grid grid-cols-12 gap-2">
                            <label class="col-span-3" for="brandID">brandID*</label>
                            <input class="col-span-9 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="brandID" v-model="brandID">
                        </div>                        
                        <div class="grid grid-cols-12 gap-2">
                            <label class="col-span-3" for="brandName">brand name*</label>
                            <input class="col-span-9 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="brandName" v-model="brandName">
                        </div>                        
                        <div class="grid grid-cols-12 gap-2">
                            <label class="col-span-3" for="brandWeb">brand website*</label>
                            <input class="col-span-9 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="brandWeb" v-model="brandWeb">
                        </div>                        
                        <input type="submit" :class="btnClass" value="done">
                    </div>
                    </form>
                    </div>
                </div></Transition>                
                <Transition><div v-if="updateShow" class="p-2 relative flex flex-col gap-4">
                    <div class="flex justify-center w-full">
                        <div class="grid grid-cols-12 gap-4 w-2/4">
                            <label class="col-span-1">ID</label>
                            <select @change="updateButtonShow=true" v-model="updateID" class="col-span-11 bg-gray-100 text-lg">
                                <option class="bg-gray-100 text-gray-500 p-2 text-center" disabled>select an ID</option>
                                <option v-for="x in ids" :key="x.id" class="text-center bg-gray-800 text-gray-100 ">{{x.id}}</option>
                            </select>                            
                        </div>
                    </div>
                    <div class="flex p-1 gap-2 flex-wrap">   <!-- options -->
                        <button @click="nameShow=!nameShow" :class="btnClass">name</button>
                        <button @click="colorShow=!colorShow" :class="btnClass">color</button>
                        <button @click="simShow=!simShow" :class="btnClass">sim</button>
                        <button @click="ramShow=!ramShow" :class="btnClass">ram</button>
                        <button @click="romShow=!romShow" :class="btnClass">rom</button>
                        <button @click="priceShow=!priceShow" :class="btnClass">price</button>
                        <button @click="sizeShow=!sizeShow" :class="btnClass">size</button>
                        <button @click="quantityShow=!quantityShow" :class="btnClass">quantity</button>
                        <button @click="imageShow=!imageShow" :class="btnClass">image</button>
                        <button @click="weightShow=!weightShow" :class="btnClass">weight</button>
                        <button @click="resolutionShow=!resolutionShow" :class="btnClass">resolution</button>                        
                        <button @click="platformShow=!platformShow" :class="btnClass">platform</button>
                        <button @click="cameraShow=!cameraShow" :class="btnClass">camera</button>
                        <button @click="bluetoothShow=!bluetoothShow" :class="btnClass">bluetooth</button>
                        <button @click="batteryShow=!batteryShow" :class="btnClass">battery</button>
                        <button @click="brandIDShow=!brandIDShow" :class="btnClass">brandID</button>
                    </div>
                    <div class="p-2 flex flex-col gap-4">
                        <Transition name="optionsAnimation">
                            <div v-if="nameShow" class="grid grid-cols-12 gap-2 relative w-3/4">
                                <label class="col-span-2" for="updateName">name</label>
                                <input class="col-span-10 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="updateName" v-model="updateName">
                            </div>
                        </Transition>
                        <Transition name="optionsAnimation">
                            <div v-if="colorShow" class="grid grid-cols-12 gap-2 relative w-3/4">
                                <label class="col-span-2" for="updateColor">color</label>
                                <input class="col-span-10 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="updateColor" v-model="updateColor">
                            </div>
                        </Transition>
                        <Transition name="optionsAnimation">
                            <div v-if="simShow" class="grid grid-cols-12 gap-2 relative w-3/4">
                                <label class="col-span-2" for="updateSim">sim</label>
                                <input class="col-span-10 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="updateSim" v-model="updateSim">
                            </div>
                        </Transition>
                        <Transition name="optionsAnimation">
                            <div v-if="ramShow" class="grid grid-cols-12 gap-2 relative w-3/4">
                                <label class="col-span-2" for="updateRam">ram</label>
                                <input class="col-span-10 outline-none ring-1 ring-gray-300 rounded-md" type="number" min="1" name="updateRam" v-model="updateRam">
                            </div>
                        </Transition>
                        <Transition name="optionsAnimation">
                            <div v-if="romShow" class="grid grid-cols-12 gap-2 relative w-3/4">
                                <label class="col-span-2" for="updateRom">rom</label>
                                <input class="col-span-10 outline-none ring-1 ring-gray-300 rounded-md" type="number" min="1" name="updateRom" v-model="updateRom">
                            </div>
                        </Transition>
                        <Transition name="optionsAnimation">
                            <div v-if="priceShow" class="grid grid-cols-12 gap-2 relative w-3/4">
                                <label class="col-span-2" for="updatePrice">price</label>
                                <input class="col-span-10 outline-none ring-1 ring-gray-300 rounded-md" type="number" min="1" name="updatePrice" v-model="updatePrice">
                            </div>
                        </Transition>
                        <Transition name="optionsAnimation">
                            <div v-if="sizeShow" class="grid grid-cols-12 gap-2 relative w-3/4">
                                <label class="col-span-2" for="updateSize">size</label>
                                <input class="col-span-10 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="updateSize" v-model="updateSize">
                            </div>
                        </Transition>
                        <Transition name="optionsAnimation">
                            <div v-if="quantityShow" class="grid grid-cols-12 gap-2 relative w-3/4">
                                <label class="col-span-2" for="updateQuantity">quantity</label>
                                <input class="col-span-10 outline-none ring-1 ring-gray-300 rounded-md" type="number" min="1" name="updateQuantity" v-model="updateQuantity">
                            </div>
                        </Transition>
                        <Transition name="optionsAnimation">
                            <div v-if="imageShow" class="grid grid-cols-12 gap-2 relative w-3/4">
                                <label class="col-span-2" for="updateImage">image</label>
                                <input class="col-span-10 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="updateImage" v-model="updateImage">
                            </div>
                        </Transition>
                        <Transition name="optionsAnimation">
                            <div v-if="weightShow" class="grid grid-cols-12 gap-2 relative w-3/4">
                                <label class="col-span-2" for="updateWeight">weight</label>
                                <input class="col-span-10 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="updateWeight" v-model="updateWeight">
                            </div>
                        </Transition>
                        <Transition name="optionsAnimation">
                            <div v-if="resolutionShow" class="grid grid-cols-12 gap-2 relative w-3/4">
                                <label class="col-span-2" for="updateResolution">resolution</label>
                                <input class="col-span-10 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="updateResolution" v-model="updateResolution">
                            </div>
                        </Transition>
                        <Transition name="optionsAnimation">
                            <div v-if="platformShow" class="grid grid-cols-12 gap-2 relative w-3/4">
                                <label class="col-span-2" for="updatePlatform">platform</label>
                                <input class="col-span-10 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="updatePlatform" v-model="updatePlatform">
                            </div>
                        </Transition>
                        <Transition name="optionsAnimation">
                            <div v-if="cameraShow" class="grid grid-cols-12 gap-2 relative w-3/4">
                                <label class="col-span-2" for="updateCamera">camera</label>
                                <input class="col-span-10 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="updateCamera" v-model="updateCamera">
                            </div>
                        </Transition>
                        <Transition name="optionsAnimation">
                            <div v-if="bluetoothShow" class="grid grid-cols-12 gap-2 relative w-3/4">
                                <label class="col-span-2" for="updateBluetooth">bluetooth</label>
                                <input class="col-span-10 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="updateBluetooth" v-model="updateBluetooth">
                            </div>
                        </Transition>
                        <Transition name="optionsAnimation">
                            <div v-if="batteryShow" class="grid grid-cols-12 gap-2 relative w-3/4">
                                <label class="col-span-2" for="updateBattery">Battery</label>
                                <input class="col-span-10 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="updateBattery" v-model="updateBattery">
                            </div>
                        </Transition>
                        <Transition name="optionsAnimation">
                            <div v-if="brandIDShow" class="grid grid-cols-12 gap-2 relative w-3/4">
                                <label class="col-span-2" for="updateBrandID">brand ID</label>
                                <input class="col-span-10 outline-none ring-1 ring-gray-300 rounded-md" type="text" name="updateBrandID" v-model="updateBrandID">
                            </div>
                        </Transition>
                        <div v-if="updateButtonShow" class="grid grid-cols-1">
                            <button @click="updatedMobile()" :class="btnClass" >done</button>
                        </div>                       
                    </div>
                    
                </div></Transition>
                <Transition><div v-if="deleteShow" class="p-2">
                <div class="flex flex-col gap-y-6">
                    <div class="flex justify-center w-full">
                        <div class="grid grid-cols-12 gap-4 w-2/4">
                            <label class="col-span-1">ID</label>
                            <select v-model="delMobileID" class="col-span-11 bg-gray-100 text-lg">
                                <option class="bg-gray-100 text-gray-500 p-2 text-center" disabled>select an ID</option>
                                <option v-for="x in ids" :key="x.id" class="text-center bg-gray-800 text-gray-100 ">{{x.id}}</option>
                            </select>                            
                        </div>
                    </div>
                    <div class="grid grid-cols-1">
                        <button @click="delDone()" :class="btnClass" >done</button>
                    </div>                       
                </div>
                </div></Transition>
            </div>
        </div> 
        <Teleport to="#tel">
            <div v-if="addDone" class="flex w-3/4 absolute top-36 bg-green-50 p-4 ring-1 ring-slate-400">
                <div>{{mutationMessage}}</div>
                <button class="self-center absolute right-4 p-2 text-2xl hover:scale-105 transition-all duration-200" @click="addDone=false">&#9874;</button>
            </div>
        </Teleport>                       
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation, useLazyQuery, useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

        const router = useRouter()
        const adminName = sessionStorage.getItem('admin')
        const btnAdmin = ref('absolute right-4 border-b-2 border-gray-300 bg-gray-100 hover:bg-gray-200 rounded-lg p-2 self-center')
        const btnClass = ref('border-b-2 m- border-gray-300 bg-gray-100 hover:bg-gray-200 rounded-lg p-2')
        const createShow = ref(false)
        const updateShow = ref(false)
        const deleteShow = ref(false)
        const addDone = ref(false)        
        const mutationMessage = ref('')

        const GET_MOB = gql`
        {
  mobiles {
    id
    price
  }
}`

        // del mobile        
        const delMobileID = ref('')
        const DEL_Q = gql`
        mutation deleteMobile($deleteMobileId: ID!) {
            deleteMobile(id: $deleteMobileId)
        }`
        const { mutate:delDone, onDone: afterDel } = useMutation(DEL_Q, () => ({
            variables: { deleteMobileId: delMobileID.value }
        }))

        // del mobile        

        // update mobile
        const updateID = ref('')      
        const updateButtonShow = ref(false)

        const { result } = useQuery(gql`
           { mobiles { id } }
        `)
        const ids = computed(() => result.value.mobiles)

        const nameShow = ref(false)
        const colorShow = ref(false)
        const simShow = ref(false)
        const ramShow = ref(false)
        const romShow = ref(false)
        const priceShow = ref(false)
        const sizeShow = ref(false)
        const quantityShow = ref(false)
        const imageShow = ref(false)
        const weightShow = ref(false)
        const resolutionShow = ref(false)
        const platformShow = ref(false)
        const cameraShow = ref(false)
        const bluetoothShow = ref(false)
        const batteryShow = ref(false)
        const brandIDShow = ref(false)

        const updateName = ref('')
        const updateColor = ref('')
        const updateSim = ref('')
        const updateRam = ref(0)
        const updateRom = ref(0)
        const updatePrice = ref(0)
        const updateSize = ref('')
        const updateQuantity = ref(0)
        const updateImage = ref('')
        const updateWeight = ref('')
        const updateResolution = ref('')
        const updatePlatform = ref('')
        const updateCamera = ref('')
        const updateBluetooth = ref('')
        const updateBattery = ref('')
        const updateBrandID = ref('')

        const UPDATE_Q = gql`
            mutation updateM ($updateMobileId: ID!, $input: updateMobile) {
                updateMobile(id: $updateMobileId, input: $input){ name } 
        }`

        const { mutate: updatedMobile, onDone: updateDone } = useMutation(UPDATE_Q, ()=>({
            variables: {
                updateMobileId: updateID.value,
                input: {
                    name: updateName.value, 
                    color: updateColor.value, 
                    sim: updateSim.value, 
                    ram: updateRam.value, 
                    rom: updateRom.value, 
                    price: updatePrice.value, 
                    size: updateSize.value, 
                    quantity: updateQuantity.value, 
                    image: updateImage.value, 
                    weight: updateWeight.value, 
                    resolution: updateResolution.value, 
                    platform: updatePlatform.value, 
                    camera: updateCamera.value, 
                    bluetooth: updateBluetooth.value, 
                    battery: updateBattery.value, 
                    brandID: updateBrandID.value, 
                }
            }
            // ,
            // update: ( cache, { updatedMobile } ) => {                
            //         let data = cache.readQuery({query: GET_MOB})                    
            //         console.log(data);
            //         data = {
            //             ...data,
            //             mobiles: [
            //                 ...data.mobiles,
            //                 updatedMobile
            //             ]
            //         }
            //         cache.writeQuery({ query: GET_MOB, data })
            // }
        }))
        
        // update mobile

        const mID = ref('')
        const mName = ref('')
        const mColor = ref('')
        const sim = ref('')
        const ram = ref(0)
        const rom = ref(0)
        const price = ref(0)
        const size = ref('')
        const image = ref('')
        const quantity = ref('')
        const weight = ref('')
        const resolution = ref('')
        const platform = ref('')
        const camera = ref('')
        const bluetooth = ref('')
        const battery = ref('')
        const brandID = ref('')
        const brandName = ref('')
        const brandWeb = ref('')

        const adminOut = () => {
            sessionStorage.removeItem("admin")
            router.push({name: "Home"})
        }        
        const input = ref({            
            id: ref(''),
            name: ref(''),
            ram: ref(0),
            rom: ref(0),
            image: ref(''),
            price: ref(),
            color: ref(''),
            sim: ref(''),
            size: ref(''),
            quantity: ref(),
            weight: ref(''),
            resolution: ref(''),
            platform: ref(''),
            camera: ref(''),
            bluetooth: ref(''),
            battery: ref(''),
            brandID: ref(''),
            brand: {
                id: ref(''),
                name: ref(''),
                website: ref('')
            }        
        })

const { mutate: addMobile, onDone } = useMutation(gql`
      mutation addMobile ($input: InputMobile!) {
        addMobile (input: $input) {
          id
        }
      }
    `, () => ({      
      variables: {        
        input: {
            id: mID.value,
            name: mName.value,
            ram: ram.value,
            rom: rom.value,
            image: image.value,
            price: price.value,
            color: mColor.value,
            sim: sim.value,
            size: size.value,
            quantity: quantity.value,
            brandID: brandID.value,
            brand: {
                id: brandID.value,
                name: brandName.value,
                website: brandWeb.value
            }        
        }
      },
    }))
onDone(result => {
    mutationMessage.value = 'Mobile added successfully !'
  addDone.value = true
})
afterDel(result => {
    mutationMessage.value = 'Mobile deleted successfully !'
  addDone.value = true
})
updateDone(result => {
    mutationMessage.value = 'Mobile updated successfully !'
    addDone.value = true    
})
</script>

<style scoped>
.v-enter-from{ opacity: 0; }
.v-enter-active{ transition: all 0.5s ease-out; }


.optionsAnimation-enter-from{
    opacity: 0;
    left:10%;
}
.optionsAnimation-enter-to{
    opacity: 1;
    left:0;
}
.optionsAnimation-enter-active{
    transition: all 1.5s ease-out;
}
</style>