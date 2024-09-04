const fs = require('fs');
const path = require('path');

//controller for viewing a movie by ID
exports.viewMovie = async(req, res) => {
     fs.readFile(__dirname + "/" + "../movies.json", "utf8", function(err, data) {
          let id = req.params.id;
          var data = JSON.parse(data);

          for(var i = 0; i < data.movie.length; i++) {
               if(data.movie[i].id == id) {
                    console.log('hellor');
                    res.render(
                         "view-movie",
                         {
                              title: data.movie[i].title,
                              director: data.movie[i].director,
                              dateReleased: data.movie[i].dateReleased,
                              actors: data.movie[i].actors,
                              plot: data.movie[i].plot,
                              genre: data.movie[i].genre,
                              image: data.movie[i].image
                         }
                    );
               }
          }
     });
}


//controller for adding a new movie
exports.addMovie = async(req, res) => {
     var title = req.body.movie_title;
     var director = req.body.movie_director;
     var dateReleased = req.body.movie_date;
     var actors = req.body.movie_actor;
     var plot = req.body.movie_plot;
     var genre = req.body.movie_genre;
     var image = req.file.filename;
     const finished =(error) =>{
          if (error){
            console.error(error);
            return;
          }
     }

     fs.readFile(__dirname + "/" + "../movies.json", "utf8", function(err, data) {
          var data = JSON.parse(data);
          var index = data.movie.length;
          var id = index + 1;

          data["movie"].push({
               "id": id,
               "title": title,
               "director": director,
               "dateReleased": dateReleased,
               "actors": actors,
               "plot": plot,
               "genre": genre,
               "image": image
          });

          jsonStr = JSON.stringify(data, null, 2);
          fs.writeFile('movies.json', jsonStr, finished)
          res.redirect('/');
     });
}

exports.displayEdit = async(req, res) => {
     fs.readFile( __dirname + "/" + "../movies.json", 'utf8', function (err, data) {
          let id = req.params.id;
          var data =JSON.parse(data);

          for (var i = 0 ; i < data.movie.length ;i++)
          {
            if(data.movie[i].id == id){
              res.render(
                    "edit-movie",
                    {
                         id: id,
                         title: data.movie[i].title, 
                         director: data.movie[i].director, 
                         dateReleased: data.movie[i].dateReleased,
                         actors: data.movie[i].actors,
                         plot: data.movie[i].plot, 
                         genre: data.movie[i].genre
                    });
            }
          }
      });
}

exports.editMovie = async(req, res) => {
     fs.readFile( __dirname + "/" + "../movies.json", 'utf8', function (err, data) {
          var id = req.params.id;
          var title = req.body.movie_title;
          var director = req.body.movie_director;
          var dateReleased = req.body.movie_date;
          var actors = req.body.movie_actor;
          var plot = req.body.movie_plot;
          var genre = req.body.movie_genre;
          var image = req.file.filename;
          var data =JSON.parse(data);

          for (var i = 0 ; i < data.movie.length; i++)
          {
            if(data.movie[i].id == id){
              data.movie[i].title = title;
              data.movie[i].director = director;
              data.movie[i].dateReleased = dateReleased;
              data.movie[i].actors = actors;
              data.movie[i].plot = plot;
              data.movie[i].genre = genre;
              data.movie[i].image = image;

              jsonStr = JSON.stringify(data, null, 2);
              fs.writeFile('movies.json', jsonStr, function writeJSON(err) {
                  if (err) return console.log(err);
              });
            }
          }
      });
      res.redirect("/");
}


//controller for deleting movie
exports.deleteMovie = async(req, res) => {
     fs.readFile( __dirname + "/" + "../movies.json", 'utf8', function (err, data) {
          let id = req.params.id;
          var data =JSON.parse(data);

          for (var i = 0 ; i < data.movie.length ;i++)
          {
               if(data.movie[i].id == id) {
                    data.movie.splice(i, 1);
                    jsonStr = JSON.stringify(data, null, 2);
                    fs.writeFile('movies.json', jsonStr, function writeJSON(err) {
                         if (err) return console.log(err);
                    });

                    res.redirect("/"); 
                    return false;
               }
              
          }    
     });
}