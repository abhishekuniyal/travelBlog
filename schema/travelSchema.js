
const graphql= require('graphql')
const mongoose = require('mongoose')
const TravelDetails = require('../model/travelDetails')
const User = require('../model/user')
//const userSchema = require('./userSchema')

const {GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList} = graphql

//Type
const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        userId: {type:GraphQLString},
        firstName:{type:GraphQLString},
        lastName:{type:GraphQLString},
        age:{type:GraphQLInt},
        city:{type:GraphQLString},
        travelledPlaces:{
            type:new GraphQLList(TravelDetailsType),
            resolve(parentVal, args){
                return TravelDetails.find({travelUserId:parentVal.userId})
            }
        }
    })
})

const TravelDetailsType = new GraphQLObjectType({
    name:'travelDetails',
    fields: () => ({
        travelId: {type:GraphQLString},
        summary: {type:GraphQLString},
        description: {type:GraphQLString},
        monthOfTravel: {type:GraphQLString},
        location: {type:GraphQLString},
        modeOfTransport: {type:GraphQLString},
        placesToVisit: {type:GraphQLString},
        rating: {type:GraphQLInt},
        hotelName: {type:GraphQLString},
        travelUserId:{type:GraphQLString},
        visitedUser:{
            type: new GraphQLList(UserType),
            resolve(parentVal, args){
                return User.find({userId: parentVal.travelUserId})
            }
        }
    })
})

//RootQuery
const TravelRootQuery =  new GraphQLObjectType({
    name: 'rootQuery',
    fields:{
        user:{
            type:UserType,
            args:{id:{type:GraphQLID}},
            resolve(parentVal, args){
                return User.findById(args.id);
            }
        },
        findUserByUserId:{
            type:new GraphQLList(UserType),
            args:{userId:{type:GraphQLString}},
            resolve(parentVal, args){
                console.log(args.userId)
                return User.find({userId:args.userId});
                //return User.find({})
            }
        },
        users:{
            type:new GraphQLList(UserType),
            resolve(parentVal, args){
                return User.find({})
            }
        },
/**********************************Travel Details queries****************************************************** */
        travelDetail:{
            type:TravelDetailsType,
            args:{id:{type:GraphQLID}},
            resolve(parentVal, args){
                return TravelDetails.findById(args.id)
            }
        },
        findTravelDetailsByTravelId:{
            type:new GraphQLList(TravelDetailsType),
            args:{travelId:{type:GraphQLString}},
            resolve(parentVal, args){
                return TravelDetails.find({travelId:args.travelId})
            }
        },
        findTravelDetailsByUserId:{
            type:new GraphQLList(TravelDetailsType),
            args:{travelUserId:{type:GraphQLString}},
            resolve(parentVal, args){
                return TravelDetails.find({travelUserId:args.travelUserId})
            }
        },
        findTravelDetailsByLocation:{
            type:new GraphQLList(TravelDetailsType),
            args:{location:{type:GraphQLString}},
            resolve(parentVal, args){
                return TravelDetails.find({location:args.location})
            }
        },
        travelDetails:{
            type:new GraphQLList(TravelDetailsType),
            resolve(parentVal,args){
                return TravelDetails.find({})
            }
        }

    }
});

//Muttaion
const TravelMutation =  new GraphQLObjectType({
    name : 'mutation',
    fields:{
        addUser:{
            type:UserType,
            args:{
                userId: {type:GraphQLString},
                firstName:{type:GraphQLString},
                lastName:{type:GraphQLString},
                age:{type:GraphQLInt},
                city:{type:GraphQLString}
            },
            resolve(parentVal, args){
                let user = new User({
                    userId : args.userId,
                    firstName : args.firstName,
                    lastName : args.lastName,
                    age : args.age,
                    city : args.city
                });
                return user.save();
            }
        },
        addTravelDetails:{
            type:TravelDetailsType,
            args:{
                travelId: {type:GraphQLString},
                summary: {type:GraphQLString},
                description: {type:GraphQLString},
                monthOfTravel: {type:GraphQLString},
                location: {type:GraphQLString},
                modeOfTransport: {type:GraphQLString},
                placesToVisit: {type:GraphQLString},
                rating: {type:GraphQLInt},
                hotelName: {type:GraphQLString},
                travelUserId: {type:GraphQLString}
            },
            resolve(parentVal, args){
                let travelDetails = new TravelDetails({
                    travelId:args.travelId,
                    summary:args.summary,
                    description:args.description,
                    monthOfTravel:args.monthOfTravel,
                    location:args.location,
                    modeOfTransport:args.modeOfTransport,
                    placesToVisit:args.placesToVisit,
                    rating:args.rating,
                    hotelName:args.hotelName,
                    travelUserId:args.travelUserId
                });
                return travelDetails.save();
            }
        }
    }
})

//RootQuery
module.exports = new GraphQLSchema({
    query: TravelRootQuery,
    mutation:TravelMutation
})