const express = require("express");
const router = express.Router();
const controller = require("../controller/movieController");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
     destination: (req, file, cb) => {
          cb(null, __dirname + "/" + "../public/images")
     },

     filename: (req, file, cb) => {
          cb(null, Date.now().toString() + path.extname(file.originalname));
     }
});

const upload = multer({storage: storage});


//view a movie
router.get('/view-movie/:id', controller.viewMovie);

//display edit movie
router.get('/edit-movie/:id', controller.displayEdit);

// edit movie
router.post('/edit-movie/:id', upload.single('movie_image'), controller.editMovie);

//delete a movie
router.get('/delete-movie/:id', controller.deleteMovie);

//displaying movies
router.get('/', async(req, res) => {
     fs.readFile(__dirname + "/" + "../movies.json", "utf8", function(err, data) {
          res.render("index", {data: data});
     });
})

//displaying the adding of movie form
router.get('/add-movie', async(req,res) => {
     res.render("add-movie");
});

//adding a new movie
router.post('/add-movie', upload.single('movie_image'), controller.addMovie);

module.exports = router;