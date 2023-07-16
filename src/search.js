function searchMovies(keyword) {
  const apiKey = 'dfcf520b';
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(keyword)}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const resultsContainer = document.getElementById('results');

      if (data.Response === 'True') {
        const movies = data.Search;

        resultsContainer.innerHTML = '';

        movies.forEach(movie => {
          const imdbId = movie.imdbID;
          const movieUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbId}`;

          fetch(movieUrl)
            .then(response => response.json())
            .then(movieData => {
              const movieCard = document.createElement('div');
              movieCard.classList.add('movie-card');

              movieCard.innerHTML = `
                <img class="poster" src="${movieData.Poster}" alt="Movie Poster">
                <h3>${movieData.Title} (${movieData.Year})</h3>
                <p><strong>Release Date:</strong> ${movieData.Released} (ID: ${imdbId})</p>
                <ul>
                <div class="watchlistButtons">
                  <button onclick="addToWatchlist('${imdbId}')">Add to Watchlist</button>
                  <button onclick="viewDetails('${imdbId}')">View Details</button>
                </div>
              `;

              resultsContainer.appendChild(movieCard);
            })
            .catch(error => {
              console.error(error);
            });
        });
      } else {
        resultsContainer.innerHTML = 'No movies found.';
      }
    })
    .catch(error => {
      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = 'Error occurred during search.';
      console.error(error);
    });
}

//add to watchlist
function addToWatchlist(imdbID) {
  const apiKey = 'dfcf520b';
  const movieUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

  fetch(movieUrl)
    .then(response => response.json())
    .then(movieData => {
      let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
      watchlist.push(movieData);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      console.log('Movie added to watchlist:', movieData.Title);
      showNotification('Movie added to watchlist!');
    })
    .catch(error => {
      console.error('Error adding movie to watchlist:', error);
    });
}

function viewDetails(imdbID) {
  window.location.href = `details.html?id=${imdbID}`;
}

function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

//go back button
function goBack() {
  window.history.back();
}
