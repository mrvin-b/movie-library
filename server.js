const express = require('express');
const app = express();
const path = require('path');
const port = process.env.port || 5000;

//Listen to port
app.listen(port, () => {
     console.log("App is listening on port " + port);
});

//Setting the templating engine
app.set('views', './views');
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routing
const movieRouter = require("./routes/movieRouter");
app.use('/', movieRouter);

//Access static files in public folder
app.use((express.static(path.join(__dirname, "public"))));