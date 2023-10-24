import express from 'express'
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/benchmark_suite')

const PersonSchema = new mongoose.Schema({
  name: {
    type: String
  },
  hobby: {
    type: String,
    enum: [
      'soccer',
      'swimming',
      'running'
    ]
  }
})

const Person = mongoose.model('person', PersonSchema, 'mongoose-person')

const app = express()
app.use(express.json())

app.post('/person', async (req, res) => {
  try {
    const person = await Person.create(req.body)
    return res.status(200).json(person)
  } catch( err ) {
    res.status(500).json({
      error: true
    })
  }
})

app.get('/person', async (_, res) => {
  const people = await Person.find()
  return res.status(200).json(people)
})

app.listen(3001, () => {
  console.log('started')
})
