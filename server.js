const express = require('express')
const app = express()
const mongoose = require('mongoose');
const graphqlExpress = require("express-graphql");

const travelSchema = require('./schema/travelSchema');


mongoose.connect('mongodb+srv://admin:admin@travelblog-yjoob.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log('Successfully connected with Monngo');
})

app.set('port', (process.env.port|| 4000))
app.listen(app.get('port'), ()=>{
    console.log('node app running on port:'+app.get('port'))
})

app.use('/graphql', graphqlExpress({
    schema: travelSchema,
    rootValue: global,
    graphiql: true
}));


app.get('/',(req, res, next) =>{
    res.send('App running');
})