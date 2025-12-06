document.getElementById("newQuoteBtn").addEventListener("click", loadQuote);

function loadQuote() {
    fetch("https://api.adviceslip.com/advice?" + Math.random())
        .then(res => res.json())
        .then(data => {
            document.getElementById("quote").textContent = data.slip.advice;
        })
        .catch(() => {
            document.getElementById("quote").textContent = 
                "Unable to load quote. Please try again.";
        });
}

loadQuote();
