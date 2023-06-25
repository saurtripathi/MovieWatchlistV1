

    const addBtn = document.getElementById('add-to-watchlist')

    let clickedToAddToWatchlistArray = []

    let movieArray = []

    const movieListDiv = document.getElementById('movie-list')
    if(document.querySelector('.fa-circle-plus')){

        document.querySelector('.fa-circle-plus').addEventListener('click',function (){
            document.location.href = 'index.html'
        })
    console.log('initially watchlist empty')
    }else {
        movieListDiv.innerHTML = ''
        movieListDiv.classList.remove('movie-list-margin')
        console.log('initially watchlist not empty')
    }
    let html = ''
    movieArray = JSON.parse(localStorage.getItem("movieArray"))
    clickedToAddToWatchlistArray = JSON.parse(localStorage.getItem('clickedToAddToWatchlistArray'))
    if(clickedToAddToWatchlistArray.length !== 0){
        movieListDiv.innerHTML = ''
        movieListDiv.classList.remove('movie-list-margin')
        for(let i = 0 ; i < clickedToAddToWatchlistArray.length; i++ ) {
                for(let j = 0 ; j < movieArray.length; j++ ){
                    if(clickedToAddToWatchlistArray[i] === movieArray[j].id ){
                    console.log('index : '+j)
                    let index = j
                    const imdbId = movieArray[index].id
                    const poster = movieArray[index].poster
                    const imdbRating = movieArray[index].imdbRating
                    const plot = movieArray[index].plot
                    const runtime = movieArray[index].runtime
                    const genre = movieArray[index].genre
                    const title = movieArray[index].title
                    console.log(`imdbid : ${imdbId} \n poster : ${poster} \n title : ${title} \n duration : ${runtime} \n rating : ${imdbRating} \n genre : ${genre} \n plot : ${plot}`)
                
                
                       html += `<div class="movie-card" id="${imdbId}" >
                        <div class="poster-div" >
                                    <img src="${poster}" class="poster"/>
                        </div>
                        <div class="description" >
                            <div class="title" >
                                    <p class="movie-title" >${title}</p>
                                    <span class="fa fa-star checked"></span>
                                    <span class="rating" >${imdbRating}</span>
                            </div>
                            <div class="genre" >
                                    <span>${runtime}</span>
                                    <span>${genre}</span>
                                    <span><i class="fa-solid fa-circle-minus btn" data-watchlist="${imdbId}"></i>Watchlist</span>
                            </div>
                            <div class="plot-content" >
                                    <p class="plot">${plot}</p>
                            </div>
                        </div>   
                    </div>`
                    document.getElementById('movie-list').innerHTML = html
                }
            }
        }
    }else{
        console.log('clickedToAddToWatchlistArray is empty')
    }
    



document.body.onclick = event => {

    if(event.target.dataset.watchlist){
        const index = movieArray.findIndex((movie) => movie.id === event.target.dataset.watchlist )
        movieArray.splice(index,1)
        clickedToAddToWatchlistArray.splice( clickedToAddToWatchlistArray.indexOf(event.target.dataset.watchlist),1)
        document.getElementById(event.target.dataset.watchlist).innerHTML = ''
        if(clickedToAddToWatchlistArray.length === 0){
            movieListDiv.classList.add('movie-list-margin')
            movieListDiv.innerHTML = `
                                       <div>
                                       <p>
                                       Your watchlist is looking a little empty...
                                       </p>
                                       <div>
                                       <p>
                                       <i class="fa-solid fa-circle-plus btn" id="add-to-watchlist" ></i>Let’s add some movies!
                                       </p>
                                       </div>
                                       </div> 
                                    `
        }


        localStorage.setItem("movieArray", JSON.stringify(movieArray));
        localStorage.setItem("clickedToAddToWatchlistArray", JSON.stringify(clickedToAddToWatchlistArray))
    }else if (event.target.id === 'add-to-watchlist'){
        document.location.href = 'index.html'
    }
}
