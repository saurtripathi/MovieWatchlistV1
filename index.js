import { getMovieCardHtml, windowScroll } from './utilities.js'

const baseUrl = 'https://www.omdbapi.com/'
const apikey = '232da52c'
const imdbIdArray = []
const clickedToAddToWatchlistArray = []
const movieArray = []
const movieListDiv = document.getElementById('movie-list')
const watchlistLnk = document.getElementById('watchlist')
const formElement = document.getElementById('search-form')
let movie = {}

localStorage.clear()

    formElement.onsubmit = async (event) => {

    event.preventDefault()

    const myFormData = new FormData(event.target)
    const searchParameter = myFormData.get('search')
    //Fetching the result for title entered in search box.
    const response = await fetch(`${baseUrl}?apikey=${apikey}&s=${searchParameter}`)
    const data = await response.json()


    movieListDiv.innerHTML = ''
    if (data.Response === 'False') {
        movieListDiv.classList.add('movie-list-margin')
        movieListDiv.innerHTML = `
                                <p style="margin:0 1em;" >
                                Unable to find what you’re looking for. Please try another search.
                                </p>  
                                `
    } else {
        //Storing the imdbId of each movie from result into imdbIdArray
        movieListDiv.classList.remove('movie-list-margin')
        data.Search.forEach(movie => {
            imdbIdArray.push(movie.imdbID)
        })
        // Persisting the imdbIdArray into localstorage
        localStorage.setItem("imdbIdArray", JSON.stringify(imdbIdArray));

        // For each imdbId, fetching the movie assigned to it 
        imdbIdArray.forEach(async id => {
            const res = await fetch(`${baseUrl}?i=${id}&apikey=${apikey}`)
            const data = await res.json()
            let poster = data.Poster
            let title = data.Title
            let genre = data.Genre
            let imdbRating = data.imdbRating
            let plot = data.Plot
            let runtime = data.Runtime

            if (poster === 'N/A')
                poster = 'images/image-na.jpeg'

            //Creating movie object

            movie = {
                'id': id,
                'title': data.Title,
                'poster': poster,
                'genre': genre,
                'imdbRating': imdbRating,
                'plot': plot,
                'runtime': runtime
            }
            // Pushing movie object to movieArray
            movieArray.push(movie)
            //Persisting the movieArray into localstorage
            localStorage.setItem("movieArray", JSON.stringify(movieArray));
            movieListDiv.innerHTML += getMovieCardHtml(poster,title,imdbRating,runtime,genre,id,plot,"fa-solid fa-circle-plus btn")
        })
    }
}

document.body.onclick = event => {

    if (event.target.dataset.watchlist && !clickedToAddToWatchlistArray.includes(event.target.dataset.watchlist)) {
        clickedToAddToWatchlistArray.push(event.target.dataset.watchlist)
        localStorage.setItem("clickedToAddToWatchlistArray", JSON.stringify(clickedToAddToWatchlistArray));
        // movieAddedToWatchlist = true
    }

    if (event.target.id === 'scroll-btn') {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

}

windowScroll()




