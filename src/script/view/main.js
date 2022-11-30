import $ from 'jquery'

const main = () => {
  const apiKey = 'b43b5812e8e8f7c8ed58a47851b7601a'

  const getAllMovies = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`, options)
      const responseJson = await response.json()

      if (responseJson.error) {
        showResponseMessage(responseJson.message)
      } else {
        renderAllMovies(responseJson.results)
      }
    } catch (error) {
      showResponseMessage(error)
    }
  }

  const searchedMovies = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`, options)
      const responseJson = await response.json()

      if (responseJson.error) {
        console.log(responseJson.message)
      } else {
        const movies = []
        const keyword = $('search-bar').val()
        responseJson.results.forEach((movie) => {
          if (movie.title.toLowerCase().includes(keyword)) {
            movies.push(movie)
          }
        })
        renderAllMovies(movies)
      }
    } catch (error) {
      showResponseMessage(error)
    }
  }

  const renderAllMovies = (movies) => {
    $('movie-list').html('')
    let listMovieElement = ''

    if (movies.length !== 0) {
      movies.forEach((movie) => {
        let imgSrc = ''
        if (movie.backdrop_path) {
          imgSrc = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
        } else {
          imgSrc = `https://image.tmdb.org/t/p/original/${movie.poster_path}`
        }
        listMovieElement += `
      <div class="card col-3">
        <img class="movie-image" style="max-height: 200px" src="${imgSrc}" alt="">
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p>${movie.release_date}</p>
        </div>
      </div>
    `
      })
    } else {
      listMovieElement += `
      <div class="card col-6">
        <div class="card-body mx-auto">
          <h5 class="card-title">Movies Not Found!</h5>
        </div>
      </div>
    `
    }

    $('movie-list').html(listMovieElement)
  }

  const showResponseMessage = (message = 'Check your internet connection') => {
    alert(message)
  }

  $('search-bar').on('click', searchedMovies)

  $(function () {
    getAllMovies()
  })
}

export default main
