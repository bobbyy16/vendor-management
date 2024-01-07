const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./Routes/vendorRoutes');
const errorMiddleware = require('./MiddleWare/errorMiddleware');
// const userdb = require("./Models/userModel")
require('dotenv').config();

const app = express();

const port = process.env.PORT || 8080;
const db = process.env.MONGODB_URL;
// const secret = process.env.SESSION_SECRET;
// const clientid = process.env.GOOGLE_CLIENT_ID
// const clientsecret = process.env.GOOGLE_CLIENT_SECRET

// Enable CORS

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Connect to MongoDB
async function main() {
  await mongoose.connect(db);
}

main()
  .then(() => console.log('Successfully connected to the database'))
  .catch((err) => console.error('Error connecting to the database:', err));



app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/vendors', router);
app.use('/', errorMiddleware);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
