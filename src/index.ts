import { Hono } from 'hono';
import { cors } from 'hono/cors';
import dotenv from 'dotenv';
import messages from './routes/messages';
import users from './routes/users'

import { connect } from 'mongoose';
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'


dotenv.config();

const app = new Hono()

// Middleware CORS untuk mengizinkan permintaan dari frontend di localhost:4321
app.use('*', cors({
  origin: 'http://localhost:4321', // Izinkan frontend localhost:4321
  allowMethods: ['GET', 'POST', 'PATCH', 'PUT', 'OPTIONS'], // Tambahkan PATCH dan OPTIONS
  allowHeaders: ['Content-Type'], // Header yang diizinkan
  credentials: true, // Izinkan cookies atau credentials
}));

// middleware untuk menangani error
app.onError((err, c) => {
  console.error('Error:', err)
  return c.text('Something went wrong!', 500)
})

// middleware log
app.use(logger())

// middleware pretty json
app.use(prettyJSON()) 


// hubungkan ke MongoDB
connect(process.env.MONGODB_URI || '')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// tambhahkan rute pesan
app.route('/messages', messages);

// Tambahkan rute user
app.route('/users', users);

// Jalankan server
const PORT = process.env.PORT || 3000;

export default {
  port: PORT,
  fetch: app.fetch,
}
