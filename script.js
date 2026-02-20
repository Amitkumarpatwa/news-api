const API_KEY = "pub_765a93e66e8544c7abf025c14d809b43";  // 🔴 Put your real key here
const BASE_URL = "https://newsdata.io/api/1/news";

// Load default news on page load
window.addEventListener("DOMContentLoaded", () => {
    getNews("india");
});

async function getNews(query = "india") {

    const container = document.getElementById("newsContainer");
    const loader = document.getElementById("loader");

    loader.classList.remove("hidden");
    container.innerHTML = "";

    try {

        const url = `${BASE_URL}?apikey=${API_KEY}&q=${encodeURIComponent(query)}&language=en`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Network response failed");
        }

        const data = await response.json();
        console.log("NewsData Response:", data);

        if (!data.results || data.results.length === 0) {
            container.innerHTML =
                "<h2 style='text-align:center;'>No news found.</h2>";
        } else {
            displayNews(data.results);
        }

    } catch (error) {
        console.error("Error:", error);
        container.innerHTML = `
            <div style="text-align:center; padding:20px;">
                <h2>⚠ Failed to load news</h2>
                <p>Check API key or request limit.</p>
            </div>
        `;
    }

    loader.classList.add("hidden");
}

function displayNews(articles) {

    const container = document.getElementById("newsContainer");

    container.innerHTML = articles.map(article => `
        <div class="news-card">
            <img src="${article.image_url || 'https://via.placeholder.com/400x200'}" alt="News Image">
            <div class="news-content">
                <h3>${article.title}</h3>
                <p>${article.description || "No description available."}</p>
                <a href="${article.link}" target="_blank">Read More →</a>
                <span>
                    ${article.pubDate ? new Date(article.pubDate).toLocaleDateString() : ""}
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

// Search on Enter key
document.getElementById("searchInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        searchNews();
    }
});