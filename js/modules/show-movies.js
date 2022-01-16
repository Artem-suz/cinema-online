const API_KEY = "f0312cfa-6c00-4b71-84b6-534ea2e1bdff";



export async function getMovies(url, page) {
    const startApiUrl = url + page;
    const response = await fetch(startApiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': `${API_KEY}`
        },
    });
    const data = await response.json();
    
    showMovies(data, "movies");
};

function showMovies(data, insertDirrect) {
    const moviesElement = document.querySelector(`.${insertDirrect}`);

    document.querySelector(`.${insertDirrect}`).innerHTML = "";


    data.films.forEach(movie => {
        const movieElement = document.createElement("div")
        movieElement.classList.add("movie")
        movieElement.innerHTML = `
        <a href = "view.html?id=${movie.filmId}">
            <div class="movie__cover-inner">
                <img class="movie__cover" src="${ movie.posterUrlPreview }" alt ="${ movie.nameRu }">
                <div class="movie__cover--darkened"></div> 
            </div>
        </a>
            <div class="movie__info">
                <div class="movie__title">${ movie.nameRu }</div>
                <div class="movie__category">${ movie.genres.map( (genre) => ` ${genre.genre}`) }</div>
                <div class="movie__rating movie__rating--${ drawRatingColor(movie.rating) }">${ showRating(movie.rating) }</div>
            </div>
    `;

        moviesElement.append(movieElement)

    });


};

function showRating(rating) {
    
    if (rating.indexOf("%") != -1) {
        return (parseInt(rating) / 10).toFixed(1);
    } else if (rating == "null") {
        return ""
    } else return rating
};

function drawRatingColor(rating) {
    const mountRating = +showRating(rating);
   
    if (mountRating >= 7) {
        return "green"
    } else if (mountRating > 4) {
        return "orange"
    } else if (!mountRating) {
        return "white"
    } else return "red"
};

const idFilm = document.location.search.slice(4) 


if ((document.location.pathname).indexOf("view") != -1) { 
    getDescripMovie(idFilm)
    
}




async function getDescripMovie(id) {
    const startApiUrl = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`
    const response = await fetch(startApiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': `${API_KEY}`
        },
    });
    const data = await response.json();
    
    showDescripMovie(data, "movie-content-inner");
    getRecMovies(id)
};

function showDescripMovie(data, insertDirrect) {
    const descripWrapper = document.querySelector(`.${insertDirrect}`);

    document.querySelector(`.${insertDirrect}`).innerHTML = "";

        const description = document.createElement("div")
        description.classList.add("movie-description")
        description.innerHTML = `
        <h1 class="movie-description__title">${data.nameRu}</h1>
        <h2 class="movie-description__title en">${data.nameOriginal || ""}</h2>
        <div class="video-info">
            <span class="video-info__year">${data.year},</span>
            <span class="video-info__genres">${data.genres.map((genre) => ` ${genre.genre}`)},</span>
            <span class="video-info__country">${data.countries[0].country}</span>
         </div>
        <div class="movie-description__time">Время: ${data.filmLength || "110"} минут</div>
        <div class="movie-description__rating">Ожидаемый рейтинг:<span class="movie-description__rating--${drawDescRatingColor(data.ratingAwait)}"> ${showDescRating(data.ratingAwait) || ""}</span></div> 
        <div class="movie-description__rating">Рейтинг:<span class="movie-description__rating--${drawDescRatingColor(data.ratingKinopoisk)}"> ${data.ratingKinopoisk || ""}</span></div>
        <div class="movie-description__description"> ${data.description}
        </div>
    `;

        descripWrapper.append(description)

        
};

function showDescRating(rating) {
    
    let drawRating = rating
    drawRating = (drawRating > 10) ? (drawRating/10).toFixed(2) : drawRating
    
    return +drawRating

}

function drawDescRatingColor(rating) {
    const mountRating = +showDescRating(rating);
    if (mountRating >= 7) {
        return "green"
    } else if (mountRating > 4) {
        return "orange"
    } else if (!mountRating) {
        return "white"
    } else return "red"
}

async function getRecMovies(id) {
    const API_URL_SIMILARS = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/similars`
    
    const response = await fetch(API_URL_SIMILARS, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': `${API_KEY}`
        },
    });
    const data = await response.json();
   
    showRecMovies(data, "movieRecomended__content"); 
};

function showRecMovies(data, insertDirrect) {
    const moviesElement = document.querySelector(`.${insertDirrect}`);

    document.querySelector(`.${insertDirrect}`).innerHTML = "";


    data.items.forEach(movie => {
        const movieElement = document.createElement("div")
        movieElement.classList.add("movie")
        movieElement.innerHTML = `
        <a href = "view.html?id=${movie.filmId}">
            <div class="movie__cover-inner">
                <img class="movie__cover" src="${ movie.posterUrlPreview }" alt ="${ movie.nameRu }">
                <div class="movie__cover--darkened"></div> 
            </div>
        </a>
            <div class="movie__info">
                <div class="movie__title">${ movie.nameRu }</div>
            </div>
    `;

        moviesElement.append(movieElement)

    });
}