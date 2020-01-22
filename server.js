const express = require('express');
const morgan = require('morgan');
const movies = require('./movies');

const app = express();

app.use(morgan('dev'));

const validGenres = ['Animation', 'Drama', 'Romantic', 'Comedy', 'Spy', 'Crime', 'Thriller', 'Adventure', 'Documentary', 'Horror', 'Action', 'Western', 'History', 'Biography', 'Musical', 'Fantasy', 'War', 'Grotesque'];

app.get('/movie', (req, res) => {
    const { genre, country, avg_vote } = req.query;
    let response = movies;
    
    if (genre) {
        response = response.filter(movie => movie.genre.toLocaleLowerCase().includes(genre.toLowerCase()));
    }

    if(country) {
        response = response.filter(movie=>movie.country.toLowerCase().includes(country.toLowerCase()))
    }


    res.json(response)
})

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
  });