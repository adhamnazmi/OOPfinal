window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const imdbID = urlParams.get('id');
  
    if (imdbID) {
      fetchMovieDetails(imdbID)
        .then(movie => {
          if (movie) {
            displayMovieDetails(movie);
            fetchRecommendedMovies(movie.Year);
          } else {
            console.error('Error fetching movie details: Movie not found');
          }
        })
        .catch(error => {
          console.error('Error fetching movie details:', error);
        });
    }
  });
  
  function fetchMovieDetails(imdbID) {
    const apiKey = 'dfcf520b';
    const movieUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;
  
    return fetch(movieUrl)
      .then(response => response.json())
      .then(movieData => {
        if (movieData.Response === 'True') {
          return movieData;
        } else {
          return null;
        }
      });
  }
  
  function displayMovieDetails(movie) {
    const movieDetailsContainer = document.getElementById('movieDetails');
  
    movieDetailsContainer.innerHTML = `
      <h3>${movie.Title} (${movie.Year})</h3>
      <p>${movie.Plot}</p>
      <p><strong>Director:</strong> ${movie.Director || 'N/A'}</p>
      <p><strong>Cast:</strong> ${movie.Actors || 'N/A'}</p>
      <p><strong>Release Date:</strong> ${movie.Released || 'N/A'}</p>
      <p><strong>Ratings:</strong></p>
      <ul>
        ${movie.Ratings.map(rating => `<li>${rating.Source}: ${rating.Value}</li>`).join('')}
      </ul>
    `;
  }
  
  
  function addToWatchlist(imdbID) {
    fetchMovieDetails(imdbID)
      .then(movie => {
        if (movie) {
          let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
          watchlist.push(movie);
          localStorage.setItem('watchlist', JSON.stringify(watchlist));
          console.log('Movie added to watchlist:', movie.Title);
          showNotification('Movie added to watchlist!');
        } else {
          console.error('Error adding movie to watchlist: Movie not found');
        }
      })
      .catch(error => {
        console.error('Error adding movie to watchlist:', error);
      });
  }
  
  function removeFromWatchlist(imdbID) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  
    const updatedWatchlist = watchlist.filter(movie => movie && movie.imdbID !== imdbID && movie.Title !== undefined && movie.Title !== null);
  
    if (updatedWatchlist.length !== watchlist.length) {
      watchlist = updatedWatchlist;
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      console.log('Movie removed from watchlist:', imdbID);
      showNotification('Movie removed from watchlist!');
    }
  }
  
  function goBack() {
    window.history.back();
  }
  
  function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
  
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }
