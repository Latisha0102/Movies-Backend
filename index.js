const {initailizeDatabase} = require("./db/db.connect")
const express = require("express")
const app = express()

const Movie = require("./models/movies.models")

app.use(express.json())

initailizeDatabase();

async function readMovieByTitle(movieTitle){
   try{
    const movie = await Movie.findOne({title: movieTitle})
    return movie
   }
   catch(error){
      throw error
   }
   }
   

   
app.get("/movies/:title", async(req,res)=>{
   try{
    const movie = await readMovieByTitle(req.params.title)
    if(movie){
      res.json(movie)
    }else{
      res.status(404).json({message: "Movie not found"})
    }
   }catch(error){
     res.status(500).json({error: "Failed to fetch"})
   }
})

async function readAllMovies(){
   try{
      const allMovies = await Movie.find()
      return allMovies
   }catch(error){
      throw error
   }
}



app.get("/movies",async(req,res)=>{
   try{
      const movies = await readAllMovies()
      if(movies.length != 0){
         res.json(movies)
      }else{
         res.status(404).json({message: "No movies found"})
      }
   }catch(error){
      res.status(500).json({error: "Failed to fetch movies."})
   }
})

async function readMovieByDirector(directorName){
   try{
     const movieByDirector = await Movie.findOne({director: directorName})
     return movieByDirector
   }catch(error){
     throw error
   }
  }

  app.get("/movies/director/:directorName",async (req,res)=>{
   try{
      const movies = await readMovieByDirector(req.params.directorName)
      if(movies.length != 0){
         res.json(movies)
      }else{
         res.status(404).json({message: "No movies found for this director."})
      }
   }catch(error){
      res.status(500).json({error: "Failed to fetch movie by director."})
   }
  })

  async function readMovieByGenre(genreName){
   try{
      const movieByGenre = await Movie.find({genre: genreName})
      return movieByGenre
   }catch(error){
      console.log(error)
   }
  }

  app.get("/movies/genre/:genreName", async(req,res)=>{
   try{
 const movies = await readMovieByGenre(req.params.genreName)
 if(movies.length != 0){
   res.json(movies)
   }else{
      res.status(404).json({error: "No movies found for this genre."})
   }
}catch(error){
   res.status(500).json({error: "Failed to fetch movie by genre."})
}
  })

  
// const newMovie = {
//    title: "New Movie",
//       releaseYear: 2023,
//       genre: [ "Drama"],
//       director: "Aditya Roy Chopra",
//       actors: ["Actor1", "Actor2"],
//       language: "Hindi",
//       country: "India",
//       rating: 6.1,
//       plot: "A young man and woman fall in love on a Australia trip.",
//       awards: "IFA Filmfare Awards",
//       posterUrl: "https://example.com/new-poster1.jpg",
//       trailerUrl: "https://example.com/new-trailer1.mp4"
// }

async function createMovie(newMovie){
   try{
      const movie = new Movie(newMovie);
      const saveMovie =await movie.save()
      return saveMovie
   }
   catch(error){
      console.log("Error creating the movie", error)
   }
   
}

app.post("/movies", async(req,res) =>{
   try{
const savedMovie = await createMovie(req.body)
res.status(201).json({message: "Movie added successfully", movie: savedMovie})
   }catch(error){
      res.status(500).json({error: "Failed to add movie"})
   }
})
/*
const fs = require("fs")


const Profile = require('./models/twitterProfile.models');
 //for movie json data
//const jsonData = fs.readFileSync('movies.json','utf-8')
//const moviesData = JSON.parse(jsonData)

function seedData() {
    try{
 for(const movieData of moviesData){
    const newMovie = new Movie({
        title: movieData.title,
        releaseYear: movieData.releaseYear,
        genre: movieData.genre,
        director: movieData.director,
        actors: movieData.actors,
        language: movieData.language,
        country: movieData.country,
        rating: movieData.rating,
        plot: movieData.plot,
        awards: movieData.awards,
        posterUrl : movieData.posterUrl,
        trailerUrl:movieData.trailerUrl
       

    })
   newMovie.save()
 }
    }catch(error){
 console.log("Error seeding the data", error)
    }

}

seedData()
/*


//find a movie with a particular title

//to get all the movies in the database 


/*
//get movie by director name

readMovieByDirector()
//createMovie(newMovie)
/*
//for profile data
const profileJsonData = fs.readFileSync('profilesData.json', 'utf-8')
const profileData = JSON.parse(profileJsonData)

function seedProfileData () {
 try{
    for( profileD of profileData){
        const newProfile = new Profile({
           fullName: profileD.fullName,
      username: profileD.username,
      bio:profileD.bio,
      profilePicUrl: profileD.profilePicUrl,
      followingCount: profileD.followingCount ,
      followerCount: profileD.followerCount,
      companyName:profileD.companyName,
      location: profileD.location,
      portfolioUrl: profileD.portfolioUrl

        })
        newProfile.save()
    }

    
 }catch(error){
    console.log("Error occured while saving the data" ,error)
 }
}



seedProfileData()




readMovieByDirector("Zoya Akhtar")
async function updateMovieDetail(movieTitle , dataToUpdate){
   try{
const updatedMovie = await Movie.findOneAndUpdate({title: movieTitle},dataToUpdate ,{new:true})
console.log(updatedMovie)
   }catch(error){
      console.log("Error occured while changing the movie" , error)
   }
}

updateMovieDetail('Kabhi Khushi Kabhie Gham',{releaseYear: 2001})
*/

//find a movie by id and delete it
/*

async function deleteMovie(movieId){
   try{
const deleteMovie = await Movie.findByIdAndDelete(movieId)
//console.log(deleteMovie)
   }catch(error){
      throw error
   }
}

deleteMovie("67869fdda349c290e25b3686")

async function deleteMovieFromDb(movieTitle){
   try{
const deletedMovie = await Movie.findOneAndDelete({title: movieTitle})
console.log("This movie was ",deletedMovie)
   }catch(error){
      console.log("Error occured while deleting the movie" , error)
   }
}

deleteMovieFromDb("3 Idiots")

*/


async function deleteMovie(movieId){
   try{
      const deletedMovie = await Movie.findByIdAndDelete(movieId)
return deletedMovie
   }catch(error){
      console.log("Error occured while deleting the movie" , error)
   }
}

app.delete("/movies/:movieId",async(req,res) =>{
   try{
const deletedMovie = await deleteMovie(req.params.movieId)
if(deletedMovie){
   res.status(200).json({message: "Movie deleted successfully"})
}

   }catch(error){
res.status(500).json({error: "Failed to fetch the data"})
   }
})


async function updateMovie(movieId , dataToUpdate){
   try{
   const updatedMovie = await Movie.findByIdAndUpdate(movieId ,dataToUpdate,{new: true})
  return updatedMovie
   }catch(error){
      console.log("Error occured while updating the movie" , error)
   }
   }
   
   updateMovie("67869fdda349c290e25b3686", {releaseYear: 2002})
   
   app.post("/movies/:movieId",async (req,res)=>{
      try{
         const updatedMovie = await updateMovie(req.params.movieId , req.body)
         if(updatedMovie){
            res.status(200).json({message: "Movie updated successfully",movie: updatedMovie})
         }else{
            res.status(404).json({error: "Movie not found"})
         }
      }catch(error){
         res.status(500).json({error: "failed to update movie"})
      }
   })

const PORT = 3000
app.listen(PORT , () => {
   console.log("Server running on port" , PORT)
})