const apiKey = '677469743fc0a44ffff6d04b1af8f636';

fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    const movies = data.results;
    const movieContainer = document.querySelector('.movieContainer');

    movies.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.classList.add('movieCard');

      const moviePoster = document.createElement('img');
      moviePoster.classList.add('moviePoster');
      moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      moviePoster.alt = movie.title;

      const movieTitle = document.createElement('div');
      movieTitle.classList.add('movieTitle');
      movieTitle.innerText = movie.title;

      const rating = document.createElement('div');
      rating.classList.add('rating');

      const rate = document.createElement('span');
      rate.classList.add('rate');
      rate.innerText = `${movie.vote_average}/10`;

      const year = document.createElement('span');
      year.classList.add('year');
      year.innerText = movie.release_date.split('-')[0];

      rating.appendChild(rate);
      rating.appendChild(year);

      movieCard.appendChild(moviePoster);
      movieCard.appendChild(movieTitle);
      movieCard.appendChild(rating);

      movieContainer.appendChild(movieCard);
    });
  })
  .catch(error => {
    console.error('Error fetching movies:', error);
  });






Resources