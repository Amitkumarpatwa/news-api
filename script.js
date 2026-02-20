const API_KEY = "507b88f9cac2d52110a926f125703326";   // 🔴 Put your GNews API key here
const BASE_URL = "https://gnews.io/api/v4";

// Load default news when page loads
window.addEventListener("DOMContentLoaded", () => {
    getNews("india");
});

async function getNews(query) {

    const container = document.getElementById("newsContainer");
    const loader = document.getElementById("loader");

    loader.classList.remove("hidden");
    container.innerHTML = "";

    try {
        const response = await fetch(
            `${BASE_URL}/search?q=${query}&lang=en&max=12&apikey=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error("Network response failed");
        }

        const data = await response.json();
        console.log("GNews Response:", data);

        if (!data.articles || data.articles.length === 0) {
            container.innerHTML =
                "<h2 style='text-align:center;'>No news found.</h2>";
        } else {
            displayNews(data.articles);
        }

    } catch (error) {
        console.error("Error:", error);
        container.innerHTML = `
            <div style="text-align:center; padding:20px;">
                <h2>⚠ Failed to load news</h2>
                <p>Please check your API key or internet connection.</p>
            </div>
        `;
    }

    loader.classList.add("hidden");
}

function displayNews(articles) {

    const container = document.getElementById("newsContainer");

    container.innerHTML = articles.map(article => `
        <div class="news-card">
            <img src="${article.image || 'https://via.placeholder.com/400x200'}" alt="News Image">
            <div class="news-content">
                <h3>${article.title}</h3>
                <p>${article.description || "No description available."}</p>
                <a href="${article.url}" target="_blank">Read More →</a>
                <span>
                    ${new Date(article.publishedAt).toLocaleDateString()}
                </span>
            </div>
        </div>
    `).join("");
}

function searchNews() {
    const query = document.getElementById("searchInput").value.trim();
    if (query !== "") {
        getNews(query);
    }
}