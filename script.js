// ========== QUOTE FETCH + SKELETON ==========
const quoteBox = document.getElementById("quoteBox");
const quoteText = document.getElementById("quote");
const newQuoteBtn = document.getElementById("newQuoteBtn");

function setQuoteLoading(isLoading) {
  if (isLoading) {
    quoteBox.classList.add("loading");
    quoteText.textContent = "Loading inspiring quote...";
  } else {
    quoteBox.classList.remove("loading");
  }
}

function loadQuote() {
  setQuoteLoading(true);
  fetch("https://api.adviceslip.com/advice?" + Math.random())
    .then((res) => res.json())
    .then((data) => {
      setQuoteLoading(false);
      quoteText.textContent = data.slip.advice;
    })
    .catch(() => {
      setQuoteLoading(false);
      quoteText.textContent =
        "Unable to load quote at the moment. Please try again.";
    });
}

newQuoteBtn.addEventListener("click", loadQuote);
loadQuote();

// ========== STATS COUNTER ANIMATION ==========
const statNumbers = document.querySelectorAll(".stat-number");
let statsAnimated = false;

function animateStats() {
  statNumbers.forEach((num) => {
    const target = +num.dataset.target;
    let current = 0;
    const increment = Math.max(1, Math.floor(target / 120));

    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      num.textContent = current.toLocaleString();
    }, 16);
  });
}

// Observe stats section
const statsSection = document.getElementById("stats");
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        animateStats();
      }
    });
  },
  { threshold: 0.3 }
);
statsObserver.observe(statsSection);

// ========== SCROLL REVEAL ==========
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ========== TESTIMONIAL CAROUSEL ==========
const slides = document.querySelectorAll(".testimonial-slide");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Auto change every 6 seconds
if (slides.length > 0) {
  setInterval(nextSlide, 6000);
}

// ========== CHAT BUBBLE TOGGLE ==========
const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");

chatToggle.addEventListener("click", () => {
  chatWindow.classList.toggle("open");
});
