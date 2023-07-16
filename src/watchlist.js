window.addEventListener('DOMContentLoaded', () => {
    displayWatchlist();
  });
  
  function displayWatchlist() {
    const watchlistContainer = document.getElementById('watchlist');
  
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  
    // Filter out undefined or null movies from the watchlist
    watchlist = watchlist.filter(movie => movie);
  
    if (watchlist.length === 0) {
      watchlistContainer.innerHTML = 'Watchlist is empty.';
      return;
    }
  
    watchlistContainer.innerHTML = '';
  
    watchlist.forEach(movie => {
      const movieItem = document.createElement('div');
      movieItem.classList.add('watchlistItem');
  
      const ratings = movie.Ratings || [];
  
      movieItem.innerHTML = `
        <h3>${movie.Title} (${movie.Year})</h3>
        <p>${movie.Plot}</p>
        <p><strong>Director:</strong> ${movie.Director || 'N/A'}</p>
        <p><strong>Cast:</strong> ${movie.Actors || 'N/A'}</p>
        <p><strong>Release Date:</strong> ${movie.Released || 'N/A'} (ID: ${movie.imdbID})</p>
        <p><strong>Ratings:</strong></p>
        <ul>
          ${ratings.map(rating => `<li>${rating.Source}: ${rating.Value}</li>`).join('')}
        </ul>
        <div class="watchlistButtons">
          <button onclick="removeFromWatchlist('${movie.imdbID}')">Remove from Watchlist</button>
          <button onclick="viewDetails('${movie.imdbID}')">View Details</button>
        </div>
      `;
  
      watchlistContainer.appendChild(movieItem);
    });
  }
  
  function removeFromWatchlist(imdbID) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  
    // Filter out the movie with the specified imdbID
    watchlist = watchlist.filter(movie => movie && movie.imdbID !== imdbID);
  
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    console.log('Movie removed from watchlist:', imdbID);
    displayWatchlist();
  }
  
  function viewDetails(imdbID) {
    window.location.href = `details.html?id=${imdbID}`;
  }
  
  function goBack() {
    window.history.back();
  }