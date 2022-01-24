const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();


// Database
mongoose.connect(process.env.APP_DATABASE_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology:  true,
})

const db = mongoose.connection;

db.once('open', () => {
    console.log("Connected to Mongodb");
})
// Midlewares
app.use(bodyParser.json());

// ROUTES
app.get('/', (req, res) => {
    res.send("We are home");
});

const VideosRoute = require('./routes/Videos.js');
const GenresRoute = require('./routes/Genres.js');
const TypeRoute = require('./routes/Types.js');
const DirectorRoute = require('./routes/Directors.js');
const ActorRoute = require('./routes/Actors.js');
const PlatformRoute = require('./routes/Platforms.js');

app.use('/type', TypeRoute);
app.use('/videos', VideosRoute);
app.use('/genres', GenresRoute);
app.use('/directors', DirectorRoute);
app.use('/actors', ActorRoute);
app.use('/platforms', PlatformRoute);

app.listen(process.env.APP_DATABASE_PORT);
