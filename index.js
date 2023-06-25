// http://www.omdbapi.com/?i=tt3896198&apikey=2c13b038
// http://www.omdbapi.com/?i=tt3896198&apikey=2c13b038&s=Blade Runner
// https://www.omdbapi.com/?i=tt3896198&apikey=2c13b038&t=Blade+Runner&plot=full
// http://www.omdbapi.com/?i=tt3896198&apikey=232da52c

const baseUrl = 'https://www.omdbapi.com/'
const apikey = '232da52c'
const imdbIdArray = []
const clickedToAddToWatchlistArray = []
const movieArray = []
let movieAddedToWatchlist = false
let movie = {}

localStorage.clear()
const movieListDiv = document.getElementById('movie-list')
const watchlistLnk = document.getElementById('watchlist')


document.getElementById('myForm').addEventListener('submit', async (event) => {

    event.preventDefault();
    movieListDiv.innerHTML = ''
    movieListDiv.classList.remove('movie-list-margin')

    let html = ''
    const myFormData = new FormData(event.target)
    const searchParameter = myFormData.get('search')
    console.log(`${baseUrl}?apikey=${apikey}&s=${searchParameter}`)
    const response = await fetch(`${baseUrl}?apikey=${apikey}&s=${searchParameter}`)
    const data = await response.json()
    if (data.Response === 'False') {
        movieListDiv.classList.add('movie-list-margin')
        movieListDiv.innerHTML = `
                                // <div class="error-div">
                                <p style="margin:0 1em;" >Unable to find what you’re looking for. Please try another search.</p>
                                // </div> 
                                
                                `


    } else {
        data.Search.forEach(movie => {
            imdbIdArray.push(movie.imdbID)
        })
        console.log(imdbIdArray)
        localStorage.setItem("imdbIdArray", JSON.stringify(imdbIdArray));
        imdbIdArray.forEach(async id => {
            const res = await fetch(`${baseUrl}?i=${id}&apikey=${apikey}`)
            const data = await res.json()
            let poster = data.Poster
            console.log(poster)
            let title = data.Title
            let genre = data.Genre
            let imdbRating = data.imdbRating
            let plot = data.Plot
            let runtime = data.Runtime

            if(poster === 'N/A')
                poster = 'images/image-na.jpeg'

            movie = {
                'id'        :   id,
                'title'     :   data.Title,
                'poster'    :   poster,
                'genre'     :   genre,
                'imdbRating':   imdbRating,
                'plot'      :   plot,
                'runtime'   :   runtime
            }

            movieArray.push(movie)
            // let imdbId = d.imdbId
            console.log(movieArray)
            localStorage.setItem("movieArray", JSON.stringify(movieArray));

            html += `<div class="movie-card" >
                <div class="poster-div" >
                            <img src="${poster}" class="poster" data-poster="${poster}"  />
                </div>
                <div class="description" >
                    <div class="title" >
                            <p class="movie-title" data-title="${title}" >${title}</p>
                            <span class="fa fa-star checked"></span>
                            <span class="rating" data-imdbRating="${imdbRating}" >${imdbRating}</span>
                    </div>
                    <div class="genre" >
                            <span data-runtime="${runtime}" >${runtime}</span>
                            <span data-genre="${genre}" >${genre}</span>
                            <span><i class="fa-solid fa-circle-plus btn" data-watchlist="${id}"></i>Watchlist</span>
                    </div>
                    <div class="plot-content" >
                            <p class="plot" data-plot="${plot}" >${plot}</p>
                    </div>
                </div>   
            </div>`
            movieListDiv.innerHTML = html
        })
    }



})


document.body.onclick = event => {

    if(event.target.dataset.watchlist){
        console.log(`event.target.dataset.watchlist : ${event.target.dataset.watchlist}`)
    }

    if(event.target.dataset.watchlist && !clickedToAddToWatchlistArray.includes(event.target.dataset.watchlist)){
        // console.log(`clicked ${event.target.dataset.watchlist}`)

        clickedToAddToWatchlistArray.push(event.target.dataset.watchlist)

        localStorage.setItem("clickedToAddToWatchlistArray", JSON.stringify(clickedToAddToWatchlistArray));
        
        movieAddedToWatchlist = true

    }


}
