require('dotenv').config();
const express    = require('express');
const logger     = require('morgan');
const path       = require('path');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const keys       = require('./config/keys');
const Property   = require('./api/models/Property');

const app = express();

// --------------  MNOGOOSE  ---------------
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB 🚀');
});
mongoose.connection.on('error', err => {
  console.log('Database error', err);
});
// --------------  END MONGOOSE ---------------



// --------------  MIDDLEWARE  ---------------
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// --------------  END MIDDLEWARE ---------------



// ----------- GLOBAL ERROR HANDLER --------------
app.use((err, req, res, next) => {
  res.status(500).send('Something broke!');
});
// --------------- END ERROR HANDLER -------------


// ------------------ ROUTES --------------------
const propertyRoutes = require('./api/routes/propertyRoutes');
app.use('/api/property', propertyRoutes)
// ------------------ END ROUTES ----------------



//  ----------------   PORT SETUP ---------------
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Alive on port ${PORT} 🚀 🚀 🚀 `);
});
// ---------------- END OF PORT SETUP -------------