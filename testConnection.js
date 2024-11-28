import mongoose from 'mongoose';

const uri = 'mongodb+srv://lisuhaidi:135790@cluster0.qun4zz0.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB!');
    mongoose.disconnect();
  })
  .catch(err => console.error('Connection error:', err));
