import { gql } from "apollo-server-express"
export const typeDefs = gql`
    type Query {
        admin(id: ID!): Admin!
        admins: [Admin!]!
        cat(id: ID!): Cat
        cats: [Cat!]!
        mobile(id: ID!): Mobile
        mobiles(filter: mobilesFilter, offset: Int, take: Int): [Mobile!]!
        mobilesFor20: Int!
        mobilesFor30: Int!
        mobilesFor50: Int!
        mobilesFor50Above: Int!
        mobilesForBrand(filter: mobilesFilter): Int!
    }        
    type Mutation {
        addMobile(input: InputMobile!): Mobile
        updateMobile(id: ID!, input: updateMobile): Mobile!
        deleteMobile(id: ID!): Boolean!
    }
    type Admin {
        id: ID!
        username: String!
        password: String!
    }
    input mobilesFilter {
        price: Float
        take: Int
        offset: Int
        brands: [String]
    }   
    
    type Cat {
        id: ID!
        name: String!
        website: String!
    }
    type Mobile {
        id:ID!
        name: String!
        color: String!
        sim: String!
        ram: Int!
        rom: Int!
        price: Float!
        size: String!
        quantity: Int!        
        image: String!
        weight: String
        resolution: String
        platform: String
        camera: String
        bluetooth: String
        battery: String   
        brandID: String!   
        brand: Cat!
    }    

    input InputMobile {
        id:ID!
        name: String!
        color: String!
        sim: String!
        ram: Int!
        rom: Int!
        price: Float!
        size: String!
        quantity: Int!        
        image: String!
        weight: String
        resolution: String
        platform: String
        camera: String
        bluetooth: String
        battery: String      
        brandID: String!
    }
    input updateMobile {
        id:ID
        name: String
        color: String
        sim: String
        ram: Int
        rom: Int
        price: Float
        size: String
        quantity: Int        
        image: String
        weight: String
        resolution: String
        platform: String
        camera: String
        bluetooth: String
        battery: String      
        brandID: String     
    }    

`
