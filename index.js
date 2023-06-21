// http://www.omdbapi.com/?i=tt3896198&apikey=2c13b038

// http://www.omdbapi.com/?i=tt3896198&apikey=2c13b038&s=Blade Runner

// https://www.omdbapi.com/?i=tt3896198&apikey=2c13b038&t=Blade+Runner&plot=full

const baseUrl = 'http://www.omdbapi.com/'
const i = 'tt3896198'
const apikey = '2c13b038'
const titleArray = []
const genreArray = []
const plotArray = []
const durationArray = []
const ratingArray = []
const posterImageArray = []

const movieListDiv = document.getElementById('movie-list')



document.getElementById('myForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    movieListDiv.innerHTML = ''
    movieListDiv.classList.remove('mt')
    
    let html = ''
    const myFormData = new FormData(event.target)
    const searchParameter = myFormData.get('search')
    console.log(`${baseUrl}?i=${i}&apikey=${apikey}&t=${searchParameter}`)
    const response = await fetch(`${baseUrl}?i=${i}&apikey=${apikey}&s=${searchParameter}`)
    const data = await response.json()
    data.Search.forEach(movie => titleArray.push(movie.Title))
    // let html =''
    console.log(titleArray)

    titleArray.forEach(async title => {
        const res = await fetch(`${baseUrl}?i=${i}&apikey=${apikey}&t=${title}`)
        const d = await res.json()
        let poster = d.Poster
        let genre = d.Genre
        let imdbRating = d.imdbRating
        let plot = d.Plot
        let runtime = d.Runtime

        html += `<div class="movie-card" >
            <div><img src="${poster}" class="poster"/></div>
                <div class="description" >
                    <div class="title" >
                    <p class="movie-title" >${title}</p>
                    <span class="fa fa-star checked"></span><span class="rating" >${imdbRating}</span>
                    </div>
                    <div class="genre" >
                            <span>${runtime}</span>
                            <span>${genre}</span>
                            <span><i class="fa-solid fa-circle-plus"></i>Watchlist</span>
                            
                           
                    </div>
                    <div class="plot-content" ><p class="plot">${plot}</p></div>
                </div>
            </div>`
        movieListDiv.innerHTML = html
    })

})




