const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const port = process.env.PORT || 3300

app.use(cors())
app.use(bodyParser.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y23oh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const CarsCollection = client.db("superCarsShop").collection("cars");

    app.post('/addCar', (req, res) => {
        const newCar = (req.body);
        CarsCollection.insertOne(newCar)
            .then(result => {
                console.log("respon rafififif", result.insertedCount);
                res.send(result.insertedCount > 0)
            })

    })

    app.get('/cars',(req,res)=>{
        CarsCollection.find()
        .toArray((err, cars)=>{
            res.send(cars)
        })
    })
});

app.get('/', (req, res) => {
    res.send('Hello Worlddddddddddd!')
})

app.listen(port)