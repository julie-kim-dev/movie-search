const apiKey = '677469743fc0a44ffff6d04b1af8f636'; // 내가 요청해서 받아온 고유 API
const urlImg = 'https://image.tmdb.org/t/p/w500'; // 이미지 주소의 베이스가 되는 앞부분
const urlSearch = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';
// const form = document.querySelector(form);
const search = document.getElementById('searchInput');


const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Nzc0Njk3NDNmYzBhNDRmZmZmNmQwNGIxYWY4ZjYzNiIsInN1YiI6IjY1OTY1NzZkZWY5ZDcyNWQ4NjEyYjE3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dCG600P45zUZy_qx6T5EBS7UrzmRzhtwU6YCitZeYmk'
    }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json()) // 호출된 url에서 json 데이터를 검색하고 메서드를 사용하여 json으로 구문 분석
    .then(data => {
        console.log(data) // 키값 확인
        const movies = data.results;
        const movieContainer = document.querySelector('.movieContainer'); // DOM 요소 접근 시작

        movies.forEach(movie => { // forEach로 한번씩 호출하여 순회를 반복하면 영화 카드를 하나씩 가져오는 리스트(새로운 배열로 반환)가 된다 근데 여기서부터 코드가 반복되는 패턴같은게 있는것같아서 일단제출하고 백틱 사용해서 리팩토링 시도

            // 영화 카드 한 개의 단위를 감싸는 div
            const movieCard = document.createElement('div'); // 자바스크립트에서 html 요소 생성(요소의 태그이름을 매개변수로 받음)
            movieCard.classList.add('movieCard'); // 요소마다 클래스 붙여서 구분

            // 영화 포스터 이미지
            const movieImg = document.createElement('img');
            movieImg.classList.add('movieImg');
            movieImg.src = `${urlImg}${movie.poster_path}`;
            movieImg.alt = movie.title; 

            // 영화 제목
            const movieTitle = document.createElement('div');
            movieTitle.classList.add('movieTitle');
            movieTitle.innerText = movie.title; // DOM 요소로 접근하여 자바스크립트 내에서 html 텍스트 삽입

            // 영화 줄거리 요약
            const movieOverview = document.createElement('div');
            movieOverview.classList.add('movieOverview');
            movieOverview.innerText = movie.overview; // 10점만점 단위 보여주기

            // 영화 평점
            const movieVoteAverage = document.createElement('div');
            movieVoteAverage.classList.add('movieVoteAverage');
            movieVoteAverage.innerText = `${movie.vote_average} / 10`; // 10점만점 단위 보여주기

            // div 닫아줌
            movieCard.appendChild(movieImg); 
            movieCard.appendChild(movieTitle); 
            movieCard.appendChild(movieOverview);
            movieCard.appendChild(movieVoteAverage); 
            movieContainer.appendChild(movieCard);
        })
        // ~인기영화 데이터 연결

        for (let i = 0; i < response.results.length; i++) {
            document.querySelectorAll('.movieTitle')[i].innerText =
                response.results[i].title;
            }
            
            function searchFilter(data, search) {
                return data.filter((d) => d.title.includes(search));
            }
            
            function search() {
                let text = document.getElementById('input').value;
                let res = searchFilter(response.results, text);
            
                document.getElementById('movies').innerHTML = '';
            
                res.forEach((movie) => {
                let template = `<div class="movie">
                                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
                                    <h2 class="movieName">${movie.title}</h2>
                                    <p class="movieSum">${movie.overview}</p>
                                    <p class="movieRate">평점 ${movie.vote_average}</p>
                                    
                                </div>`;
            
                document.querySelector('#movies').insertAdjacentHTML('beforeend', template);
                });
            }
            
            document.getElementById('btn').addEventListener('click', search);
        

        
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');

        const searchMovie = () => {
            const searchTerm = searchInput.value.toLowerCase();
            const searchTitle = movies.filter(search => search.movieTitle.toLowerCase().includes(searchTerm)) // filter : 배열의 모든요소에 콜백함수실행하고 결과가 true인 것만 새로운 배열로 반환
        }
        searchBtn.addEventListener('click', searchMovie)
        // ~영화 검색
    })
    .catch(err => console.error(err)); // 가져오는 동안 오류가 발생하면 해당 catch() 메서드가 오류 메시지를 콘솔에 기록

