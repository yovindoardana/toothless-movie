// import '../component/movie-list.js'
// import '../component/search-bar.js'
// import DataSource from '../data/dfdata-source.js'

// const main = () => {
//   const searchElement = document.querySelector('search-bar')
//   const movieListElement = document.querySelector('movie-list')

//   const onButtonSearchClicked = async () => {
//     try {
//       const result = await DataSource.searchMovie(searchElement.value)
//       renderResult(result)
//     } catch (message) {
//       fallbackResult(message)
//     }
//   }

//   const renderResult = (results) => {
//     movieListElement.movies = results
//   }

//   const fallbackResult = (message) => {
//     movieListElement.renderError(message)
//   }

//   searchElement.clickEvent = onButtonSearchClicked
// }

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
        // console.log(responseJson.results)
      }
    } catch (error) {
      showResponseMessage(error)
    }
  }

  const renderAllMovies = (movies) => {
    const listMovieElement = document.querySelector('movie-list')
    listMovieElement.innerHTML = ''
    $(selector).html(htmlString)

    movies.forEach((movie) => {
      listMovieElement.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
          <div class="card">
            <div class="card-body">
              <h5>(${movie.id}) ${movie.title}</h5>
              <p>${movie.author}</p>
              <button type="button" class="btn btn-danger button-delete" id="${movie.id}">Hapus</button>
            </div>
          </div>
        </div>
      `
    })
  }

  const showResponseMessage = (message = 'Check your internet connection') => {
    alert(message)
  }

  document.addEventListener('DOMContentLoaded', () => {
    getAllMovies()
  })
}

export default main
