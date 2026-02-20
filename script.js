const API_KEY = '773ffa2e74c7443ebb94f7a0ca25d2cc';
const BASE_URL = 'https://newsapi.org/v2';

async function getNews(endpoint = '/top-headlines?country=us&category=general') {

    const loader = document.getElementById('loader');
    loader.classList.remove('hidden');

    try {
        const response = await fetch(`${BASE_URL}${endpoint}&apiKey=${API_KEY}`);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
    }

    loader.classList.add('hidden');
}

function displayNews(articles) {
    const container = document.getElementById('newsContainer');

    container.innerHTML = articles.map(article => `
        <div class="news-card">
            <img src="${article.urlToImage || 'https://via.placeholder.com/400x200'}" alt="News image">
            <div class="news-content">
                <h3>${article.title}</h3>
                <p>${article.description || 'No description available.'}</p>
                <a href="${article.url}" target="_blank">Read More →</a>
                <span>By ${article.author || 'Unknown'} | ${new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>
        </div>
    `).join('');
}

getNews();

function searchNews() {
    const query = document.getElementById('searchInput').value;
    if (query) {
        getNews(`/everything?q=${query}&sortBy=publishedAt`);
    }
}
