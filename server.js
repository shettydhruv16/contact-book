const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Contact = require('./models/contact');
const app = express();

app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://1by22cs065:Punna%402004@cluster0.vwy3zfd.mongodb.net/contacts?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB Atlas...', err));

// Get all contacts
app.get('/contacts', async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

// Add a contact
app.post('/contacts', async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.json(contact);
});

// Update a contact
app.put('/contacts/:id', async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(contact);
});

// Delete a contact
app.delete('/contacts/:id', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Contact deleted' });
});

app.listen(3000, () => console.log('Server running on port 3000'));