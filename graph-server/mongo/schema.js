import mongoose from 'mongoose';
const { Schema } = mongoose;

const adminSchema = new Schema({
    _id: String,
    username: String,
    password: String
})
const catSchema = new Schema({
    _id: String,
    name: String,
    website: String
})
export const mobileSchema = new Schema({
    _id:String,
    name: String,
    color: String,
    sim: String,
    ram: Number,
    rom: Number,
    price: mongoose.Mixed,
    size: String,
    quantity: Number,        
    image: String,
    weight: String,
    resolution: String,
    platform: String,
    camera: String,
    bluetooth: String,
    battery: String,   
    brandID: String,   
    brand: {
        id:String,
        name:String,
        website:String    
    }
})    

export const admins = mongoose.model("admins", adminSchema)
export const cats = mongoose.model("cats", catSchema)
export const mobiles = mongoose.model("mobiles", mobileSchema)