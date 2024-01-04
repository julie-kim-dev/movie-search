const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Nzc0Njk3NDNmYzBhNDRmZmZmNmQwNGIxYWY4ZjYzNiIsInN1YiI6IjY1OTY1NzZkZWY5ZDcyNWQ4NjEyYjE3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dCG600P45zUZy_qx6T5EBS7UrzmRzhtwU6YCitZeYmk'
    }
};

fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));