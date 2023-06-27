 export function getMovieCardHtml(poster,title,imdbRating,runtime,genre,id,plot,addRemoveFaClass){
    let html = ''
    return html += `<div class="movie-card" id="${id}">
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
                <span><i class="${addRemoveFaClass}" data-watchlist="${id}"></i>Watchlist</span>
        </div>
        <div class="plot-content" >
                <p class="plot" data-plot="${plot}" >${plot}</p>
        </div>
    </div>   
</div>`
}

export function windowScroll(){

    window.onscroll = function () {

        (document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20)
            ? document.getElementById('scroll-btn').style.display = "block"
            : document.getElementById('scroll-btn').style.display = "none"
    }
}
