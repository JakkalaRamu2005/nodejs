const express = require("express");  // ❌ was "required"
const app = express();

app.use(express.json());

let movies = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    genre: "Sci-Fi",
    releaseYear: 2010,
    rating: 8.8
  },
  {
    id: 2,
    title: "The Dark Knight",
    director: "Christopher Nolan",
    genre: "Action",
    releaseYear: 2008,
    rating: 9.0
  },
  {
    id: 3,
    title: "Interstellar",
    director: "Christopher Nolan",
    genre: "Adventure",
    releaseYear: 2014,
    rating: 8.6
  },
  {
    id: 4,
    title: "Parasite",
    director: "Bong Joon-ho",
    genre: "Thriller",
    releaseYear: 2019,
    rating: 8.5
  },
  {
    id: 5,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    genre: "Crime",
    releaseYear: 1972,
    rating: 9.2
  },
  {
    id: 6,
    title: "Avengers: Endgame",
    director: "Anthony and Joe Russo",
    genre: "Superhero",
    releaseYear: 2019,
    rating: 8.4
  },
  {
    id: 7,
    title: "Titanic",
    director: "James Cameron",
    genre: "Romance",
    releaseYear: 1997,
    rating: 7.8
  },
  {
    id: 8,
    title: "Gladiator",
    director: "Ridley Scott",
    genre: "Historical Drama",
    releaseYear: 2000,
    rating: 8.5
  },
  {
    id: 9,
    title: "Forrest Gump",
    director: "Robert Zemeckis",
    genre: "Drama",
    releaseYear: 1994,
    rating: 8.8
  },
  {
    id: 10,
    title: "The Matrix",
    director: "The Wachowskis",
    genre: "Sci-Fi",
    releaseYear: 1999,
    rating: 8.7
  }
];

// GET all movies
app.get("/movies", (request, response) => {
  response.json(movies);
});

let nextId = 11;

// GET single movie by ID
app.get("/movies/:id", (request, response) => {
  const movieId = parseInt(request.params.id); // ❌ was "paraseInt"

  const movie = movies.find((m) => m.id === movieId); // ❌ used "movie.find"

  if (!movie) {
    response.status(404).json({ error: "Movie not found" });
  } else {
    response.json(movie);
  }
});

// POST new movie
app.post("/movies", (request, response) => {
  const { title, director, genre, releaseYear, rating } = request.body;

  const newMovie = {
    id: nextId++,
    title,
    director,
    genre,
    releaseYear,
    rating
  };

  movies.push(newMovie);
  response.status(201).json(newMovie); // ❌ was "resposne"
});

// UPDATE movie by ID
app.put("/movies/:id", (request, response) => {
  const movieId = parseInt(request.params.id);

  const { title, director, genre, releaseYear, rating } = request.body;

  const movieIndex = movies.findIndex((m) => m.id === movieId);

  if (movieIndex === -1) {
    response.status(404).json({ error: "Not found" });
  } else {
    movies[movieIndex] = {
      id: movieId, // ❌ fixed this
      title,
      director,
      genre,
      releaseYear,
      rating
    };
    response.json(movies[movieIndex]);
  }
});

// DELETE movie by ID
app.delete("/movies/:id", (request, response) => {
  const movieId = parseInt(request.params.id);

  const movieIndex = movies.findIndex((m) => m.id === movieId);

  if (movieIndex === -1) {
    response.status(404).json({ error: "Not found" });
  } else {
    movies.splice(movieIndex, 1);
    response.status(204).send(); // ❌ better than .json()
  }
});

// Start server
app.listen(3000, (err) => {
  err
    ? console.log("Error starting server:", err)
    : console.log("Server running on port 3000");
});
