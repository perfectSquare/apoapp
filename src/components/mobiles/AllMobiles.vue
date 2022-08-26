 <script setup>
 import { useQuery, useSubscription, useMutation } from '@vue/apollo-composable'
 import gql from 'graphql-tag'
 import { ref, computed } from 'vue'
 import { useRouter } from 'vue-router'

    const router = useRouter()
    const allMobiles = ref(true)
    const less20 = ref(false)
    const less30 = ref(false)
    const less50 = ref(false)
    const above50 = ref(false)
    const brandShow = ref(false)

    const btClass = ref('bg-gray-50 hover:bg-gradient-to-r hover:from-slate-50 hover:to-zinc-200 p-2 rounded-md')
    const btRL = ref('text-3xl text-blue-600 hover:scale-125 transition-all duration-300')
    const optClass = ref('flex gap-2 ring-1 ring-gray-300 p-2 rounded-md md:ring-0 md:ring-white md:p-0 md:rounded-none')
    const btRightAll = ref(true)
    const btLeftAll = ref(true)
    const btRight20 = ref(false)
    const btLeft20 = ref(false)
    const btRight30 = ref(false)
    const btLeft30 = ref(false)
    const btRight50 = ref(false)
    const btLeft50 = ref(false)
    const btRight50Above = ref(false)
    const btLeft50Above = ref(false)
    const btRightBrand = ref(false)
    const btLeftBrand = ref(false)
    
    const samsung = ref(false)
    const realme = ref(false)
    const oppo = ref(false)
    const apple = ref(false)
    const infinix = ref(false)
    const itel = ref(false)
    const vivo = ref(false)
    const nokia = ref(false)

    const offsetBrand = ref(0)
    let brands = ref([])
    const forBrand = () => {      
      btRightBrand.value = btLeftBrand.value = true; 
      btRightAll.value = btLeftAll.value = btRight20.value = btLeft20.value = btRight30.value = btLeft30.value = btRight50.value = btLeft50.value = btRight50Above.value = btLeft50Above.value = false;
      if(samsung.value == true && !brands.value.includes("samsung")) brands.value.push("samsung")      
      else if(samsung.value == false && brands.value.includes("samsung")) brands.value.splice(brands.value.indexOf("samsung"), 1)
      if(realme.value && !brands.value.includes("realme")) brands.value.push("realme")
      else if(realme.value == false && brands.value.includes("realme")) brands.value.splice(brands.value.indexOf("realme"), 1)
      if(oppo.value && !brands.value.includes("oppo")) brands.value.push("oppo")
      else if(oppo.value == false && brands.value.includes("oppo")) brands.value.splice(brands.value.indexOf("oppo"), 1)
      if(apple.value && !brands.value.includes("apple")) brands.value.push("apple")
      else if(apple.value == false && brands.value.includes("apple")) brands.value.splice(brands.value.indexOf("apple"), 1)
      if(infinix.value && !brands.value.includes("infinix")) brands.value.push("infinix")
      else if(infinix.value == false && brands.value.includes("infinix")) brands.value.splice(brands.value.indexOf("infinix"), 1)
      if(itel.value && !brands.value.includes("itel")) brands.value.push("itel")
      else if(itel.value == false && brands.value.includes("itel")) brands.value.splice(brands.value.indexOf("itel"), 1)
      if(vivo.value && !brands.value.includes("vivo")) brands.value.push("vivo")
      else if(vivo.value == false && brands.value.includes("vivo")) brands.value.splice(brands.value.indexOf("vivo"), 1)
      if(nokia.value && !brands.value.includes("nokia")) brands.value.push("nokia")
      else if(nokia.value == false && brands.value.includes("nokia")) brands.value.splice(brands.value.indexOf("nokia"), 1)


      if(samsung.value == false && realme.value == false && oppo.value == false && apple.value == false && infinix.value == false && itel.value == false && vivo.value == false && nokia.value == false){
        btRightAll.value = btLeftAll.value =  true
        btRightBrand.value = btLeftBrand.value = btRight20.value = btLeft20.value = btRight30.value = btLeft30.value = btRight50.value = btLeft50.value = btRight50Above.value = btLeft50Above.value = false;
        brandShow.value = false
        allMobiles.value = true 
        less30.value = less50.value = above50.value = false  
        return
      }
      brandShow.value = true
      allMobiles.value = less30.value = less50.value = above50.value = false
    }

// all mobiles length
const { result:mobilesLength } = useQuery(gql`  { mobiles { id } }`)
const mobilesLengthNumber = computed(() => mobilesLength.value?.mobiles ?? [])
// all mobiles length

// 20, 30, 50, 50+ mobiles length
const { result:mobiles20Count } = useQuery(gql`{  mobilesFor20   } `)
const { result:mobiles30Count } = useQuery(gql`{  mobilesFor30   } `)
const { result:mobiles50Count } = useQuery(gql`{  mobilesFor50   } `)
const { result:mobiles50AboveCount } = useQuery(gql`{  mobilesFor50Above   } `)
const { result:mobilesBrandCount } = useQuery(gql`query ($filter: mobilesFilter) {
  mobilesForBrand(filter: $filter)
}`, () => ({
  filter:{
    brands: brands.value
  }
}))
// const { result:mobilesBrandCount } = useQuery(gql`{  mobilesForBrand   } `)
// 20, 30, 50, 50+ mobiles length


const { result: brandMobiles, loading:ld, error } = useQuery(gql`
query ($filter: mobilesFilter) {
  mobiles(filter: $filter) {
    id
    name
    image
    ram
    rom
    quantity
    price    
    color
    size
  }
}
`, () => ({
  filter: {
    brands: brands.value,
    take:4,
    offset: offsetBrand.value
  }  
}));

// all mobiles
const offset = ref(0)
const { result: mobiles, loading} = useQuery(gql`
query getMobiles($take: Int, $offset: Int){
  mobiles(take: $take, offset: $offset) {
    id
    name
    image
    ram
    rom
    quantity
    price
    color
    size
  }
}`, () => ({  
    take: 4,
    offset: offset.value
}));  

// all mobiles

// mobiles 20
const offset20 = ref(0)
const Q_235 = gql`
query ($filter: mobilesFilter) {
  mobiles(filter: $filter) {
    id
    name
    image
    ram
    rom
    quantity
    price    
    color
    size
  }
}
`
const { result: mobiles20 } = useQuery(Q_235, () => ({
  filter:{
    price: 20000,
    take: 2,
    offset: offset20.value
  }
}))
  // mobiles 20

// mobiles 30
const offset30 = ref(0)
const { result: mobiles30 } = useQuery(Q_235, () => ({
  filter:{
    price: 30000,
    take: 2,
    offset: offset30.value
  }
})) // mobiles 30

// mobiles 50
const offset50 = ref(0)
const { result: mobiles50 } = useQuery(Q_235, () => ({
  filter:{
    price: 50000,
    take: 2,
    offset: offset50.value
  }
}))  // mobiles 50

// mobiles 50+
const offset50Above = ref(0)
const { result: mobiles50Above } = useQuery(Q_235, () => ({
  filter:{
    price: 50001,
    take: 2,
    offset: offset50Above.value
  }
}))

const toMobileDetails = (x) => {
  router.push({name: 'details', params:{"id":x}})
}

// buttons
const allOffsetPlus = (e) => {  
  if(offset.value < mobilesLengthNumber.value.length) offset.value += 4      
  if(innerWidth >= 768)
    setTimeout(() => { scrollBy(0,1000)     },100)      
  else setTimeout(() => { e.target.scrollIntoView()     },100)      
}
const allOffsetMinus = () => {  if(offset.value > 0) offset.value -= 4  }  

const offset20Plus = (e) => {      
  if(offset20.value < mobiles20Count.value.mobilesFor20) 
    offset20.value += 2  
  setTimeout(() => { e.target.scrollIntoView()     },100)      
}
const offset20Minus = () => {  if(offset20.value > 0) offset20.value -= 2  }  

const offset30Plus = (e) => {    
  if(offset30.value < mobiles30Count.value.mobilesFor30) 
    offset30.value += 2  
  setTimeout(() => { e.target.scrollIntoView()     },100)  
}
const offset30Minus = () => {  if(offset30.value > 0) offset30.value -= 2  }  

const offset50Plus = (e) => {    
  if(offset50.value < mobiles50Count.value.mobilesFor50) 
    offset50.value += 2  
  setTimeout(() => { e.target.scrollIntoView()     },100)
}
const offset50Minus = () => {  if(offset50.value > 0) offset50.value -= 2  }  

const offset50AbovePlus = (e) => {    
  if(offset50Above.value < mobiles50AboveCount.value.mobilesFor50Above) 
    offset50Above.value += 2  
  setTimeout(() => { e.target.scrollIntoView()     },100)    
}
const offset50AboveMinus = () => {  if(offset50Above.value > 0) offset50Above.value -= 2  }  

const offsetBrandPlus = (e) => {    
  // if(offsetBrand.value < mobilesBrandCount.value.mobilesForBrand) 
    offsetBrand.value += 4  
     if(innerWidth >= 768)
        setTimeout(() => { scrollBy(0,1000)     },100)      
     else setTimeout(() => { e.target.scrollIntoView()     },100)           
  
}
const offsetBrandMinus = () => {  if(offsetBrand.value > 0) offsetBrand.value -= 4  }  
// buttons
</script>

 <template> <div class="relative">      
   
  <div class="hidden fixed top-2/3 center-me md:flex md:flex-col md:gap-4 mt-4" @click="(e)=>{e.target.style.top += 300+'px' }">
            <button v-if="btRightAll" @click="allOffsetPlus" :class="btRL">&roarr;</button>
            <button v-if="btLeftAll" @click="allOffsetMinus" :class="btRL">&loarr;</button>
            <button v-if="btRight20" @click="offset20Plus" :class="btRL">&roarr;</button>
            <button v-if="btLeft20" @click="offset20Minus" :class="btRL">&loarr;</button>
            <button v-if="btRight30" @click="offset30Plus" :class="btRL">&roarr;</button>
            <button v-if="btLeft30" @click="offset30Minus" :class="btRL">&loarr;</button>
            <button v-if="btRight50" @click="offset50Plus" :class="btRL">&roarr;</button>
            <button v-if="btLeft50" @click="offset50Minus" :class="btRL">&loarr;</button>
            <button v-if="btRight50Above" @click="offset50AbovePlus" :class="btRL">&roarr;</button>
            <button v-if="btLeft50Above" @click="offset50AboveMinus" :class="btRL">&loarr;</button>
            <button v-if="btRightBrand" @click="offsetBrandPlus" :class="btRL">&roarr;</button>
            <button v-if="btLeftBrand" @click="offsetBrandMinus" :class="btRL">&loarr;</button>
          </div>
<div class="flex flex-col md:grid sm:grid-cols-12 gap-1 h-screen"> <!-- main div -->        
        
        <div class="p-2 md:col-span-2 flex flex-wrap gap-2 md:flex-col gap-y-2 bg-gray-50 rounded-md"> <!-- left div -->
          <div :class="optClass">
            <input class="col-span-1" type="checkbox" name="samsung" v-model="samsung">
            <label class="col-span-11" for="samsung">samsung</label>            
          </div>
          <div :class="optClass">
            <input class="col-span-1" type="checkbox" name="realme" v-model="realme">
            <label class="col-span-11" for="realme">realme</label>            
          </div>
          <div :class="optClass">
            <input class="col-span-1" type="checkbox" name="oppo" v-model="oppo">
            <label class="col-span-11" for="oppo">oppo</label>            
          </div>
          <div :class="optClass">
            <input class="col-span-1" type="checkbox" name="apple" v-model="apple">
            <label class="col-span-11" for="apple">apple</label>            
          </div>
          <div :class="optClass">
            <input class="col-span-1" type="checkbox" name="infinix" v-model="infinix">
            <label class="col-span-11" for="infinix">infinix</label>            
          </div>
          <div :class="optClass">
            <input class="col-span-1" type="checkbox" name="itel" v-model="itel">
            <label class="col-span-11" for="itel">itel</label>            
          </div>
          <div :class="optClass">
            <input class="col-span-1" type="checkbox" name="vivo" v-model="vivo">
            <label class="col-span-11" for="vivo">vivo</label>            
          </div>
          <div :class="optClass">
            <input class="col-span-1" type="checkbox" name="nokia" v-model="nokia">
            <label class="col-span-11" for="nokia">nokia</label>            
          </div>
          <button @click="forBrand" class="bg-zinc-200 w-full p-1 rounded-md hover:bg-gray-300">done</button>  
          <!-- <div class="hidden md:flex md:flex-col md:gap-4 mt-4">
            <button v-if="btRightAll" @click="allOffsetPlus" :class="btRL">&roarr;</button>
            <button v-if="btLeftAll" @click="allOffsetMinus" :class="btRL">&loarr;</button>
            <button v-if="btRight20" @click="offset20Plus" :class="btRL">&roarr;</button>
            <button v-if="btLeft20" @click="offset20Minus" :class="btRL">&loarr;</button>
            <button v-if="btRight30" @click="offset30Plus" :class="btRL">&roarr;</button>
            <button v-if="btLeft30" @click="offset30Minus" :class="btRL">&loarr;</button>
            <button v-if="btRight50" @click="offset50Plus" :class="btRL">&roarr;</button>
            <button v-if="btLeft50" @click="offset50Minus" :class="btRL">&loarr;</button>
            <button v-if="btRight50Above" @click="offset50AbovePlus" :class="btRL">&roarr;</button>
            <button v-if="btLeft50Above" @click="offset50AboveMinus" :class="btRL">&loarr;</button>
          </div> -->
        </div> <!-- left div -->
        <div class="md:col-span-10 ring-2 ring-gray-200 rounded-md"> <!-- right div -->
          <div class="p-2 flex gap-2">
    <button :class="btClass" @click="allMobiles=btRightAll=btLeftAll=true; btRight20=btLeft20=btRight30=btLeft30=btRight50=btLeft50=btRight50Above=btLeft50Above=less20=less30=less50=above50=false;">all</button>
    <button :class="btClass" @click="less20=btRight20=btLeft20=true; btRightAll=btLeftAll=btRight30=btLeft30=btRight50=btLeft50=btRight50Above=btLeft50Above=allMobiles=less30=less50=above50=false;">&lt; Rs 20000</button>
    <button :class="btClass" @click="less30=btRight30=btLeft30=true; btRightAll=btLeftAll=btRight20=btLeft20=btRight50=btLeft50=btRight50Above=btLeft50Above=allMobiles=less20=less50=above50=false;">&lt; Rs 30000</button>
    <button :class="btClass" @click="less50=btRight50=btLeft50=true; btRightAll=btLeftAll=btRight20=btLeft20=btRight30=btLeft30=btRight50Above=btLeft50Above=allMobiles=less30=less20=above50=false;">&lt; Rs 50000</button>
    <button :class="btClass" @click="above50=btRight50Above=btLeft50Above=true; btRightAll=btLeftAll=btRight20=btLeft20=btRight30=btLeft30=btRight50=btLeft50=allMobiles=less30=less50=less20=false;">&gt; Rs 50000</button>        
  </div>
  <Transition mode="in-out">
   <div v-if='allMobiles'>
    <div v-if="loading">Loading ...</div>
    <div v-else-if="mobiles && mobiles.mobiles" class="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 p-2">    
      <template v-for="mob in mobiles.mobiles" :key="mob.id">      
        <div class="grid grid-cols-2 gap-2 p-2 rounded-sm box">
          <button @click="toMobileDetails(mob.id)">
            <img :src="mob.image" class="self-center w-36 md:w-24">
          </button>
          <div class="flex flex-col gap-2">
            <div class="text-2xl">{{mob.name}}</div>
            <div>{{mob.ram}} GB / {{mob.rom}} GB</div>
            <div class="text-green-600 text-xl">Rs. {{mob.price}}</div>
            <div>{{mob.color}}</div>
            <div>{{mob.size}}</div>
            <div><span v-if="mob.quantity>0">available</span><span v-else>unavailable</span></div>
          </div>
        </div>        
      </template>      
      </div>      
   </div>   
   </Transition>  
   <Transition mode="in-out">
   <div v-if='less20'>
      <div v-if="mobiles20 && mobiles20.mobiles" class="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 p-2">
      <template v-for="mob in mobiles20.mobiles" :key="mob.id">
        <div class="grid grid-cols-2 gap-2 p-2 rounded-sm box">
          <button @click="toMobileDetails(mob.id)">
          <img :src="mob.image" class="w-36 md:w-24">
          </button>
          <div class="flex flex-col gap-2">
            <div class="text-2xl">{{mob.name}}</div>
            <div>{{mob.ram}} GB / {{mob.rom}} GB</div>
            <div class="text-green-600 text-xl">Rs. {{mob.price}}</div>
            <div>{{mob.color}}</div>
            <div>{{mob.size}}</div>
            <div><span v-if="mob.quantity>0">available</span><span v-else>unavailable</span></div>
          </div>
        </div>
      </template>
      </div>
   </div>   
   </Transition>
   <Transition mode="in-out">
   <div v-if='less30'>
      <div v-if="mobiles30 && mobiles30.mobiles" class="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 p-2">
      <template v-for="mob in mobiles30.mobiles" :key="mob.id">
        <div class="grid grid-cols-2 gap-2 p-2 rounded-sm box">
          <button @click="toMobileDetails(mob.id)">
          <img :src="mob.image" class="w-36 md:w-24">
          </button>
          <div class="flex flex-col gap-2">
            <div class="text-2xl">{{mob.name}}</div>
            <div>{{mob.ram}} GB / {{mob.rom}} GB</div>
            <div class="text-green-600 text-xl">Rs. {{mob.price}}</div>
            <div>{{mob.color}}</div>
            <div>{{mob.size}}</div>
            <div><span v-if="mob.quantity>0">available</span><span v-else>unavailable</span></div>
          </div>
        </div>
      </template>
      </div>
   </div>   
   </Transition>
   <Transition mode="in-out">
   <div v-if='less50'>
      <div v-if="mobiles50 && mobiles50.mobiles" class="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 p-2">
      <template v-for="mob in mobiles50.mobiles" :key="mob.id">
        <div class="grid grid-cols-2 gap-2 p-2 rounded-sm box">
          <button @click="toMobileDetails(mob.id)">
          <img :src="mob.image" class="w-36 md:w-24">
          </button>
          <div class="flex flex-col gap-2">
            <div class="text-2xl">{{mob.name}}</div>
            <div>{{mob.ram}} GB / {{mob.rom}} GB</div>
            <div class="text-green-600 text-xl">Rs. {{mob.price}}</div>
            <div>{{mob.color}}</div>
            <div>{{mob.size}}</div>
            <div><span v-if="mob.quantity">available</span><span v-else>unavailable</span></div>
          </div>
        </div>
      </template>
      </div>
   </div>   
   </Transition>

   <Transition mode="in-out">
   <div v-if='above50'>
      <div v-if="mobiles50Above && mobiles50Above.mobiles" class="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 p-2">
      <template v-for="mob in mobiles50Above.mobiles" :key="mob.id">
        <div class="grid grid-cols-2 gap-2 p-2 rounded-sm box">
          <button @click="toMobileDetails(mob.id)">
          <img :src="mob.image" class="w-36 md:w-24">
          </button>
          <div class="flex flex-col gap-2">
            <div class="text-2xl">{{mob.name}}</div>
            <div>{{mob.ram}} GB / {{mob.rom}} GB</div>
            <div class="text-green-600 text-xl">Rs. {{mob.price}}</div>
            <div>{{mob.color}}</div>
            <div>{{mob.size}}</div>
            <div><span v-if="mob.quantity">available</span><span v-else>unavailable</span></div>
          </div>
        </div>
      </template>
      </div>
   </div>   
   </Transition>
   <div class="flex justify-around gap-4 md:hidden">             
        <button v-if="btRightAll" @click="allOffsetPlus" :class="btRL">&roarr;</button>
        <button v-if="btLeftAll" @click="allOffsetMinus" :class="btRL">&loarr;</button>        
        <button v-if="btRight20" @click="offset20Plus" :class="btRL">&roarr;</button>
        <button v-if="btLeft20" @click="offset20Minus" :class="btRL">&loarr;</button>
        <button v-if="btRight30" @click="offset30Plus" :class="btRL">&roarr;</button>
        <button v-if="btLeft30" @click="offset30Minus" :class="btRL">&loarr;</button>
        <button v-if="btRight50" @click="offset50Plus" :class="btRL">&roarr;</button>
        <button v-if="btLeft50" @click="offset50Minus" :class="btRL">&loarr;</button>
        <button v-if="btRight50Above" @click="offset50AbovePlus" :class="btRL">&roarr;</button>
        <button v-if="btLeft50Above" @click="offset50AboveMinus" :class="btRL">&loarr;</button>
        <button v-if="btRightBrand" @click="offsetBrandPlus" :class="btRL">&roarr;</button>
        <button v-if="btLeftBrand" @click="offsetBrandMinus" :class="btRL">&loarr;</button>        
      </div>
   <Transition mode="in-out">
   <div v-if='brandShow'>      
      <div v-if="brandMobiles && brandMobiles.mobiles" class="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 p-2">
      <template v-for="mob in brandMobiles.mobiles" :key="mob.id">
        <div class="grid grid-cols-2 gap-2 p-2 rounded-sm box">
          <button @click="toMobileDetails(mob.id)">
          <img :src="mob.image" class="w-36 md:w-24">
          </button>
          <div class="flex flex-col gap-2">
            <div class="text-2xl">{{mob.name}}</div>
            <div>{{mob.ram}} GB / {{mob.rom}} GB</div>
            <div class="text-green-600 text-xl">Rs. {{mob.price}}</div>
            <div>{{mob.color}}</div>
            <div>{{mob.size}}</div>
            <div><span v-if="mob.quantity">available</span><span v-else>unavailable</span></div>
          </div>
        </div>
      </template>
      </div>
   </div>   
   </Transition>
        </div> <!-- right div -->
      </div> <!-- main div -->  

 </div></template>

 <style scoped>
 html {
  scroll-behavior: smooth;
}
 .box{ box-shadow: 2px 2px 2px gray; }
 .v-enter-from { opacity: 0; } 
 .v-enter-active { transition: all 0.3s ease-out; }

 .v-leave-to { opacity: 0; } 
 .v-leave-active { transition: all 0.3s ease-out; }

 .center-me{
  left: 11%;
transform: translateX(-11%);
 }
 </style>

