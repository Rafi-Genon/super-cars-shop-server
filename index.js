const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
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
    const OrderedCarsCollection = client.db("superCarsShop").collection("orders");

    app.post('/addCar', (req, res) => {
        const newCar = (req.body);
        CarsCollection.insertOne(newCar)
            .then(result => {
                console.log("respon rafififif", result.insertedCount);
                res.send(result.insertedCount > 0)
            })

    })

    app.get('/cars', (req, res) => {
        CarsCollection.find()
            .toArray((err, cars) => {
                res.send(cars)
            })
    })

    app.delete('/remove/:id', (req, res) => {

        const id = req.params.id
        CarsCollection.deleteOne({ _id: ObjectID(id) })
            .then(documents => res.send(!!documents.value))
    })

    app.post('/placeOrder', (req, res) => {
        const orderedCarInfo = (req.body);
        OrderedCarsCollection.insertOne(orderedCarInfo)
            .then(result => {
                console.log("respon rafififif", result.insertedCount);
                res.send(result.insertedCount > 0)
            })

    })

    app.get('/showOrders', (req, res) => {
        const userEmail = req.query.email
        // console.log(userEmail);
        OrderedCarsCollection.find({ email: userEmail })
            .toArray((err, orderedCars) => {
                res.send(orderedCars)
            })
    })
});

app.get('/', (req, res) => {
    res.send('Hello Worlddddddddddd! from herokuuuuuuu')
})

app.listen(port)