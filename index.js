const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('welcome to Doctors Portal backend part')
})



const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true });


app.get('/cart', (req, res) => {
    client.connect(err => {
        const collection = client.db("doctorPortal").collection("patientInfo");
        collection.find().toArray((err, documents) => {

            if (err) {
                console.log(err);
                res.status(500).send({ message: err });
            }
            else {
                res.send(documents);
            }


        });

        // client.close();
    });

})

//get patient data
app.get('/data', (req, res) => {
    client.connect(err => {
        const collection = client.db("doctorPortal").collection("patientData");
        collection.find().toArray((err, documents) => {

            if (err) {
                console.log(err);
                res.status(500).send({ message: err });
            }
            else {
                res.send(documents);
            }


        });

        // client.close();
    });

})


//patientData

app.post('/patientData', (req, res) => {

    const data = req.body;
    let client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect(err => {
        const collection = client.db("doctorPortal").collection("patientData");
        collection.insert(data, (err, result) => {

            if (err) {
                console.log(err);
                res.status(500).send({ message: err });
            }
            else {
                res.send(result.ops[0]);
            }


        });

        client.close();
    });


})



//dummy post data for onr time

// app.post('/addCart', (req,res) => {

//     const appointment = req.body; 
//     let client = new MongoClient(uri, { useNewUrlParser: true});

//     client.connect(err => {
//         const collection = client.db("doctorPortal").collection("patientInfo");
//         collection.insert( appointment,(err,result)=>{

//             if(err){
//                 console.log(err);
//                 res.status(500).send({message:err});
//             }
//             else{
//                 res.send(result.ops[0]);
//             }


//         });

//         client.close();
//       });


// })


const port = process.env.PORT || 5000;
app.listen(port, err => err ? console.log("Filed to Listen on Port", port) : console.log("Listing for Port", port));
