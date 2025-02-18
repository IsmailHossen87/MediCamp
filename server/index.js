require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const app = express()
const port = process.env.PORT || 5000

app.use(cors({
  origin:['http://localhost:5173'],
  credentials:true
  }
))
app.use(cookieParser())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hg2ad.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )

    const userCollection = client.db('MediCamp').collection('users');
    const CampCollecion = client.db('MediCamp').collection('allCamping');


  app.post('/user',async(req,res)=>{
    const user = req.body 
    const filter ={email: user.email}
    const exisEmail = await userCollection.findOne(filter)
    if(exisEmail){
      return res.send(exisEmail)
    }
    const result = await userCollection.insertOne(user)
    res.send(result)
  })
  app.get('/user/role/:email',async(req,res)=>{
    const email = req.params.email
    const filter = {email:email}
    const user = await userCollection.findOne(filter)
    if(!user){
      return res.status(404).send({message:'user not found'})
    }
    res.send({role:user.role || 'user'})
  })
  app.post('/addCamp',async(req,res)=>{
    const data = req.body 
    const result = await CampCollecion.insertOne(data)
    res.send(result)
  })
  app.get('/manageCamp/:email',async(req,res)=>{
    const email = req.params.email 
    const filter ={AdminEmail : email}
    const result = await CampCollecion.find(filter).toArray()
    res.send(result)
  })
  // delete item
  app.delete('/deleteItem/:id',async(req,res)=>{
    const id = req.params.id 
    const filter = {_id:new ObjectId(id)}
    const result = await CampCollecion.deleteOne(filter)
    res.send(result)
  })
  app.get('/details/:id',async(req,res)=>{
    const id = req.params.id 
    const filter = {_id:new ObjectId(id)}
    const result = await CampCollecion.findOne(filter)
    res.send(result)
  })
  // UPDATE ONE DATA
  app.patch("/updateData/:id", async (req, res) => {
    const item = req.body;
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const update = {
      $set: {
        name: item.name,
        campFees: item.campFees,
        dateTime: item.datetime,
        location: item.location,
        Healthcare: item.Healthcare,
        description: item.message,
        image: item.image
      },
    };
    const result = await CampCollecion.updateOne(filter, update);
    res.send(result);
  });
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
 res.send("server is runing")
})

app.listen(port, () => console.log(`Server running on port ${port}`))
