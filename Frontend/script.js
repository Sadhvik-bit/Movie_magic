fetch('http://localhost:5000/api/movies')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('movie-list');
    data.forEach(movie => {
      const div = document.createElement('div');
      div.className = 'movie-card';
      div.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}" />
        <h3>${movie.title}</h3>
        <p>${movie.genre}</p>
        <a href="movie.html?id=${movie._id}">View</a>
      `;
      container.appendChild(div);
    });
  });
