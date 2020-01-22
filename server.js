const express = require('express');
const morgan = require('morgan');
const movies = require('./movies');
require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(validateBearerToken);

const validGenres = ['Animation', 'Drama', 'Romantic', 'Comedy', 'Spy', 'Crime', 'Thriller', 'Adventure', 'Documentary', 'Horror', 'Action', 'Western', 'History', 'Biography', 'Musical', 'Fantasy', 'War', 'Grotesque'];
const API_TOKEN = process.env.API_TOKEN;

function validateBearerToken(req, res, next) {
    const authVal = req.get('Authorization') || '';
    if(!authVal.startsWith('Bearer ')) {
        return res.status(400).json({error: 'Missing or malformed authorization header'})
    }

    const token = authVal.split(' ')[1];
    if(token !== API_TOKEN) {
        return res.status(401).json({error: 'Invalid Token'})
    }

    next();
}

app.get('/movie', (req, res) => {
    const { genre, country, avg_vote } = req.query;
    let response = movies;
    
    if (genre) {
        response = response.filter(movie => movie.genre.toLowerCase().includes(genre.toLowerCase()));
    }

    if(country) {
        response = response.filter(movie=>movie.country.toLowerCase().includes(country.toLowerCase()))
    }

    if(avg_vote) {
        response = response.filter(movie => {
            if (movie.avg_vote >= avg_vote) {
                return movie
            }
            return null;
            }
            )
        
    }

    res.json(response)
})

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
  });