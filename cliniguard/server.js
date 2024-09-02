import mongoose from 'mongoose'
const uri = 'mongodb+srv://daschayan8837:svd74food@shopper.zvng5.mongodb.net/'; // for local MongoDB
// const uri = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority'; // for MongoDB Atlas

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
