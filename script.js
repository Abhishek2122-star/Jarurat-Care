// Load quotes from public API
function loadQuote() {
    fetch("https://api.quotable.io/random")
        .then(response => response.json())
        .then(data => {
            document.getElementById("quote").textContent = data.content;
        })
        .catch(() => {
            document.getElementById("quote").textContent = "Failed to load quote.";
        });
}

loadQuote();
