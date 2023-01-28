const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient("mongodb://localhost");
const db = mongo.db("todo");
const express = require("express")
const app = express();
const cors = require('cors')
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// db.collection("tasks")
//   .find()
//   .withReadPreference((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// (async () => {
//   const result = await db.collection("tasks").find();
//   const tasks = await result.toArray();
//   console.log(tasks);

//   process.exit();
// })();

app.get("/tasks", async (req, res) => {
  const tasks = await db.collection("tasks").find().toArray();
  res.status(200).json(tasks);
})

app.get("/tasks/:id", async(req, res) => {
  const { id } = req.params;
  const task = await db.collection("tasks").find({_id: ObjectId(id)}).toArray();
  res.status(200).json(task[0]);
})

app.post("/tasks", async(req, res) => {
  const { subject } = req.body;

  if(!subject) 
    return res.status(400).json({msg: "subject required"});

  const result = await db.collection('tasks').insertOne({ subject, done: false});
  const task = await db.collection('tasks').findOne({ _id: ObjectId(result.insertedId)});
  res.status(201).json(task)
})

app.put("/tasks/:id", async(req, res) => {
  const { id } = req.params;
  const { subject } = req.body;

  const result = await db.collection("tasks").updateOne({_id: ObjectId(id)}, {
    $set: { subject }
  })

  const data = await db.collection("tasks").findOne({_id: ObjectId(id)});

  res.status(200).json(data); 
})

app.delete("/tasks", async (req, res) => {
  const result = await db.collection('tasks').deleteMany({'done': true});
  res.status(204).json(result);
});

app.delete("/tasks/:id", async(req, res) => {
  const { id } = req.params;
  const result = await db.collection("tasks").deleteOne({ _id: ObjectId(id)});

  res.status(204).json(result);
})

app.put("/tasks/:id/toggle", async(req, res) => {
  const {id} = req.params;
  const task = await db.collection("tasks").find({ _id: ObjectId(id)}).toArray();

  const done = task[0].done;
  const result = await db.collection('tasks').updateOne({_id: ObjectId(id)}, {$set: { done: !done}})
  res.status(200).json(result);
})



app.listen(8000, () => {
  console.log("API running on port 8000")
})