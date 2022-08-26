import {admins, cats, mobiles} from '../mongo/schema.js'
export const resolvers = {
    Query: {
        async admins(){ return await admins.find({}) },
        async admin(_, {id}){ return await admins.findOne({ _id: id }) },
        async cat(_, {id}){ return await cats.findOne({ _id: id }) },
        async cats(){ return await cats.find({}) },
        async mobile(_, {id}){ return await mobiles.findOne({ _id: id }) },
        async mobilesFor20(){ return await mobiles.find({ price: { $lte: 20000 } }).count() },
        async mobilesFor30(){ return await mobiles.find({ price: { $lte: 30000 } }).count() },
        async mobilesFor50(){ return await mobiles.find({ price: { $lte: 50000 } }).count() },
        async mobilesFor50Above(){ return await mobiles.find({ price: { $lte: 50001 } }).count() },
        async mobilesForBrand(_, {filter}){ 
            let c1 = ""; let c2 = ""; let c3 = ""; let c4 = ""; 
                    let c5 = ""; let c6 = ""; let c7 = ""; let c8 = ""; 
                    for(let x of filter.brands){
                        if(x === 'samsung') c1 = 'cat1'
                        if(x === 'realme') c2 = 'cat2'
                        if(x === 'oppo') c3 = 'cat3'
                        if(x === 'apple') c4 = 'cat4'
                        if(x === 'infinix') c5 = 'cat5'
                        if(x === 'itel') c6 = 'cat6'
                        if(x === 'vivo') c7 = 'cat7'
                        if(x === 'nokia') c8 = 'cat8'
                    }
                    return await mobiles.find({
                        brandID: { $in: [c1, c2, c3, c4, c5, c6, c7, c8] }
                    }).count()
         },       

        async mobiles(_, {filter, take, offset}){            
            if(take){
                return await mobiles.find({}).limit(take+offset)
            }            
            if(filter){
                if(filter.price){
                    if(filter.price === 20000) return await mobiles.find({ price: { $lte: 20000 } }).skip(filter.offset).limit(filter.take)
                    else if(filter.price === 30000) return await mobiles.find({ price: { $lte: 30000 } }).skip(filter.offset).limit(filter.take)
                    else if(filter.price === 50000) return await mobiles.find({ price: { $lte: 50000 } }).skip(filter.offset).limit(filter.take)
                    else return await mobiles.find({ price: { $gt: 50000 } }).skip(filter.offset).limit(filter.take)
                }
                if(filter.brands){     
                    if(filter.brands.length === 0) return await mobiles.find({  })               
                    let c1 = ""; let c2 = ""; let c3 = ""; let c4 = ""; 
                    let c5 = ""; let c6 = ""; let c7 = ""; let c8 = ""; 
                    for(let x of filter.brands){
                        if(x === 'samsung') c1 = 'cat1'
                        if(x === 'realme') c2 = 'cat2'
                        if(x === 'oppo') c3 = 'cat3'
                        if(x === 'apple') c4 = 'cat4'
                        if(x === 'infinix') c5 = 'cat5'
                        if(x === 'itel') c6 = 'cat6'
                        if(x === 'vivo') c7 = 'cat7'
                        if(x === 'nokia') c8 = 'cat8'
                    }
                    return await mobiles.find({
                        brandID: { $in: [c1, c2, c3, c4, c5, c6, c7, c8] }
                    }).limit(filter.offset + filter.take)
                }
            }            
            return await mobiles.find({})
        },
    },      
    Mutation: {
        async addMobile(_, {input}){
            const {id, name, color, sim, ram, rom, price, size, image, quantity, brandID, brand, weight, resolution, platform, camera, bluetooth, battery } = input            
            let newMobile = await mobiles.create({
                _id: id, 
                name: name, 
                color: color, 
                sim: sim, 
                ram: ram, 
                rom: rom, 
                price: price, 
                size: size, 
                image: image, 
                quantity: quantity, 
                brandID: brandID,
                brand: brand, 
                weight: weight,
                resolution: resolution,
                platform: platform,
                camera: camera,
                bluetooth: bluetooth,
                battery: battery
            })
            return newMobile
        },
        async deleteMobile(_, {id}){            
            return (await mobiles.deleteOne({ _id:id })).deletedCount            
        },
    
        async updateMobile(_, {id, input}){
            const mob = await mobiles.findOne({_id:id})
            const { name, color, sim, ram, rom, price, size, image, quantity, brandID, weight, resolution, platform, camera, bluetooth, battery } = input
            let exName = ""; let exColor = ""; let exSim = ""; let exRam = 0; let exRom = 0; 
            let exPrice = 0; let exSize = ""; let exImage = ""; let exQuantity = 0; let exBrandID = ""; 
            let exWeight = ""; let exResolution = ""; let exPlatform = ""; let exCamera = ""; let exBattery = ""; 
            let exBluetooth = ""; 
            if(name != "") exName = name;                 else exName = mob.name;
            if(color != "") exColor = color;                else exColor = mob.color;
            if(sim != "") exSim = sim;                else exSim = mob.sim;
            if(ram != 0) exRam = ram;                else exRam = mob.ram;
            if(rom != 0) exRom = rom;                else exRom = mob.rom;
            if(price != 0) exPrice = price;                else exPrice = mob.price;
            if(size != "") exSize = size;                else exSize = mob.size;
            if(image != "") exImage = image;                else exImage = mob.image;
            if(quantity != 0) exQuantity = quantity;                else exQuantity = mob.quantity;
            if(brandID != "") exBrandID = brandID;                else exBrandID = mob.brandID;
            if(weight != "") exWeight = weight;                else exWeight = mob.weight;
            if(resolution != "") exResolution = resolution;                else exResolution = mob.resolution;
            if(platform != "") exPlatform = platform;                else exPlatform = mob.platform;
            if(camera != "") exCamera = camera;                else exCamera = mob.camera;
            if(bluetooth != "") exBluetooth = bluetooth;                else exBluetooth = mob.bluetooth;
            if(battery != "") exBattery = battery;                else exBattery = mob.battery;    

            
            let isMod = (await mobiles.updateOne({_id:id}, {
                name: exName,
                color: exColor,                
                sim: exSim,
                ram: exRam,
                rom: exRom,
                price: exPrice,
                size: exSize,
                image: exImage,
                quantity: exQuantity,
                brandID: exBrandID,
                weight: exWeight,
                resolution: exResolution,
                platform: exPlatform,
                camera: exCamera,
                bluetooth: exBluetooth,
                battery: exBattery,
            })).modifiedCount
            return await mobiles.findOne({ _id: id })
        }
    },
  
    Mobile: {
        async brand({id}){
            const mob = await mobiles.findOne({ _id:id })
            let b = await cats.findOne({ _id: mob.brandID })
            console.log(b);
            return b
        }
    },
 
  }