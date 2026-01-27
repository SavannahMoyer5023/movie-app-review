const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

getMovies(API_URL)

async function getMovies(url){
    const res= await fetch(url)
    const data=await res.json(url)

    showMovies(data.results)
}

function showMovies(movies){
    main.innerHTML=' '

    movies.forEach((movie)=>{
    const { title, poster_path, vote_average, overview } = movie
    const MoviesEl=document.createElement('div')
    MoviesEl.classList.add('movie')

    MoviesEl.innerHTML= `
    <img class="movie-img" src="${IMG_PATH + poster_path}" alt="${title}">
    <div class="movie-info">
    <h3>${title}</h3>
    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
    <h3>Overview</h3>
    ${overview}
    </div>
     `
     main.appendChild(MoviesEl)
})
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const search_text=search.value
    if(search_text && search_text!==''){
    getMovies(SEARCH_API+search_text)
    search.value=''
    }
    else{
        window.location.reload()
    }
})

