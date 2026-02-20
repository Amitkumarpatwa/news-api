// const API_KEY = '773ffa2e74c7443ebb94f7a0ca25d2cc';
// const BASE_URL = 'https://newsapi.org/v2';

// async function getNews(endpoint = '/top-headlines?country=us&category=general') {

//     const loader = document.getElementById('loader');
//     loader.classList.remove('hidden');

//     try {
//         const response = await fetch(`${BASE_URL}${endpoint}&apiKey=${API_KEY}`);
//         const data = await response.json();
//         displayNews(data.articles);
//     } catch (error) {
//         console.error('Error fetching news:', error);
//     }

//     loader.classList.add('hidden');
// }

// function displayNews(articles) {
//     const container = document.getElementById('newsContainer');

//     container.innerHTML = articles.map(article => `
//         <div class="news-card">
//             <img src="${article.urlToImage || 'https://via.placeholder.com/400x200'}" alt="News image">
//             <div class="news-content">
//                 <h3>${article.title}</h3>
//                 <p>${article.description || 'No description available.'}</p>
//                 <a href="${article.url}" target="_blank">Read More →</a>
//                 <span>By ${article.author || 'Unknown'} | ${new Date(article.publishedAt).toLocaleDateString()}</span>
//             </div>
//         </div>
//     `).join('');
// }

// getNews();

// function searchNews() {
//     const query = document.getElementById('searchInput').value;
//     if (query) {
//         getNews(`/everything?q=${query}&sortBy=publishedAt`);
//     }
// }


const API_KEY = '773ffa2e74c7443ebb94f7a0ca25d2cc';
const BASE_URL = 'https://newsapi.org/v2';
const PROXY = "https://api.allorigins.win/raw?url=";

async function getNews(endpoint = '/top-headlines?country=us&category=general') {

    const loader = document.getElementById('loader');
    const container = document.getElementById('newsContainer');

    loader.classList.remove('hidden');
    container.innerHTML = "";

    try {
        const url = `${BASE_URL}${endpoint}&apiKey=${API_KEY}`;
        const response = await fetch(PROXY + encodeURIComponent(url));

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data.status !== "ok") {
            throw new Error(data.message || "API error occurred");
        }

        displayNews(data.articles);

    } catch (error) {
        console.error('Error fetching news:', error);
        container.innerHTML = `
            <div style="text-align:center; padding:20px;">
                <h2>⚠ Failed to load news</h2>
                <p>${error.message}</p>
            </div>
        `;
    }

    loader.classList.add('hidden');
}

function displayNews(articles) {

    const container = document.getElementById('newsContainer');

    if (!articles || articles.length === 0) {
        container.innerHTML = "<h2 style='text-align:center;'>No news found.</h2>";
        return;
    }

    container.innerHTML = articles.map(article => `
        <div class="news-card">
            <img src="${article.urlToImage || 'https://via.placeholder.com/400x200'}" alt="News image">
            <div class="news-content">
                <h3>${article.title}</h3>
                <p>${article.description || 'No description available.'}</p>
                <a href="${article.url}" target="_blank">Read More →</a>
                <span>
                    By ${article.author || 'Unknown'} |
                    ${article.publishedAt ? 
                        new Date(article.publishedAt).toLocaleDateString() 
                        : 'Date not available'}
                </span>
            </div>
        </div>
    `).join('');
}

function searchNews() {
    const query = document.getElementById('searchInput').value.trim();

    if (!query) return;

    getNews(`/everything?q=${query}&sortBy=publishedAt`);
}

getNews();