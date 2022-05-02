const express=require('express');
const cors=require('cors');
const app=express();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port=process.env.PORT ||5000;

// use middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.j1mjs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

    try{
await client.connect()
const vegetableCollection=client.db("groceryShop").collection("vegetable");

// Create (POST)
app.post("/vegetable",async(req, res) => {
    const veg=req.body;
    const result=await vegetableCollection.insertOne(veg);
    res.json(result);

    // if (!veg.name || veg.price) {
//     return res.send({success: false, error: 'Please provide all desired info!!'});   
// }
    // res.send({success: true, message:`Successfully inserted ${veg.name}`});
})

// Read (GET)
app.get("/vegetable",async(req,res)=>{
    const query={}
    const cursor=vegetableCollection.find(query)
    const vegetables=await cursor.toArray()
    res.send(vegetables)
})
    }
    finally{
// await client.close()
    }


}

run().catch(console.dir)





app.get('/',(req, res) => {
    res.send("Running my grocery shop")
})

app.listen(port,()=>{
console.log("Listening on port",port);
})
