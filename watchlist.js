import { getMovieCardHtml, windowScroll } from "./utilities.js"

const addBtn = document.getElementById('add-to-watchlist')
const movieListDiv = document.getElementById('movie-list')

// let clickedToAddToWatchlistArray = []
let movieArray = []


if (document.querySelector('.fa-circle-plus')) {
    document.querySelector('.fa-circle-plus')
        .addEventListener(
            'click',
            function () {
                document.location.href = 'index.html'
            }
        )
} else {
    movieListDiv.innerHTML = ''
    movieListDiv.classList.remove('movie-list-margin')
}

movieArray = JSON.parse(localStorage.getItem("movieArray"))
const clickedToAddToWatchlistArray = JSON.parse(localStorage.getItem('clickedToAddToWatchlistArray'))




if (clickedToAddToWatchlistArray === null) {
    console.log('empty')
} else if (clickedToAddToWatchlistArray.length !== 0) {
    movieListDiv.innerHTML = ''
    movieListDiv.classList.remove('movie-list-margin')
    for (let i = 0; i < clickedToAddToWatchlistArray.length; i++) {
        for (let j = 0; j < movieArray.length; j++) {
            if (clickedToAddToWatchlistArray[i] === movieArray[j].id) {
                let index = j
                const id = movieArray[index].id
                const poster = movieArray[index].poster
                const imdbRating = movieArray[index].imdbRating
                const plot = movieArray[index].plot
                const runtime = movieArray[index].runtime
                const genre = movieArray[index].genre
                const title = movieArray[index].title
                document.getElementById('movie-list').innerHTML += getMovieCardHtml(poster, title, imdbRating, runtime, genre, id, plot, "fa-solid fa-circle-minus btn")
            }
        }
    }

}




document.body.onclick = event => {

    if (event.target.dataset.watchlist) {
        const index = movieArray.findIndex((movie) => movie.id === event.target.dataset.watchlist)
        movieArray.splice(index, 1)
        clickedToAddToWatchlistArray.splice(clickedToAddToWatchlistArray.indexOf(event.target.dataset.watchlist), 1)
        document.getElementById(event.target.dataset.watchlist).remove()
        if (clickedToAddToWatchlistArray.length === 0) {
            movieListDiv.classList.add('movie-list-margin')
            movieListDiv.classList.add('white')
            movieListDiv.innerHTML = `
                                    <div>
                                       <p class="m0" >
                                       Your watchlist is looking a little empty...
                                       </p>
                                       <p class="m0" >
                                       <i class="fa-solid fa-circle-plus btn" id="add-to-watchlist" ></i>Let’s add some movies!
                                       </p>
                                    </div>
                                    `
        }

        localStorage.setItem("movieArray", JSON.stringify(movieArray));
        localStorage.setItem("clickedToAddToWatchlistArray", JSON.stringify(clickedToAddToWatchlistArray))
    } else if (event.target.id === 'add-to-watchlist') {
        document.location.href = 'index.html'
    }
}

windowScroll()