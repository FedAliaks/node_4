const express = require("express");
const { getMoviesArr } = require("./getMovies");
const { filmRoutes } = require("./routes/apiFilms");
const { authRoutes } = require("./routes/authRoutes");
const { checkRoutes } = require("./routes/checkRoutes");

const app = express();

app.get("/", (req, res) => {
  res.send("hello world. I am express");
});

app.listen(3000, () => {
  console.log("server has already started on port 3000");
  /*       getMoviesArr(); */
});

app.use(express.json());

app.use("/api/films", checkRoutes, filmRoutes);
app.use("/api/auth", authRoutes);
