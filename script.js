/* Logic Flow
    Page Load
      ↓
    Fetch paragraph
      ↓
    Render spans
      ↓
    User clicks Start
      ↓
    Timer starts on first key
      ↓
    Each key → validate → color → stats
      ↓
    Time over OR text finished
      ↓
    Reset → new paragraph 
*/


// ============================
// DOM Elements
// ============================
const textDisplay = document.getElementById("text-display");
const typingInput = document.getElementById("typing-input");
const timer = document.getElementById("timer");
const wpm = document.getElementById("wpm");
const accuracy = document.getElementById("accuracy");
const mistakes = document.getElementById("mistakes");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const totalCharacters = document.getElementById("total-chars");
const loader = document.getElementById("loader");

// ============================
// Core State Variables
// ============================
let currentIndex = 0;
let originalText = "";
let timeLeft = 60;
let timeStarted = false;
let correctChars = 0;
let wrongChars = 0;
let totalTyped = 0;
let intervalId = null;


// Function to check if the viewport is too small
function checkViewport() {
    const minWidth = 1200; // minimum width in pixels
    const minHeight = 600; // minimum height in pixels

    if (window.innerWidth < minWidth || window.innerHeight < minHeight) {
        alert("Please adjust your browser zoom or window size to see the Start button, timer, WPM, and accuracy without scrolling.");
    }
}

// Run check on page load
window.addEventListener("load", checkViewport);


// ============================
// Fetch Paragraph (API)
// ============================
async function fetchNewParagraph() {
  try {
    // show loader
    loader.classList.remove("hidden", "opacity-0", "pointer-events-none");
    loader.classList.add("flex");

    const res = await fetch("https://random-word-api.herokuapp.com/word?number=90");
    const words = await res.json();
    originalText = words.join(" ");
  } catch (error) {
    originalText =
      "Typing improves speed and accuracy with regular practice.";
  } finally {
    // hide loader
    loader.classList.remove("flex");
    loader.classList.add("hidden", "opacity-0", "pointer-events-none");
  }
}



// ============================
// Render Text (Character Level)
// ============================
function renderText() {
  textDisplay.innerHTML = "";
  const chars = originalText.split("");

  chars.forEach((char, index) => {
    const span = document.createElement("span");
    span.innerText = char;
    span.classList.add("text-gray-400");

    if (index === 0) {
      span.classList.add("border-2", "border-solid", "border-yellow-900");
    }
    textDisplay.appendChild(span);
  });
}

// ============================
// Initial Load
// ============================
(async function init() {
  typingInput.disabled = true;
  await fetchNewParagraph();
  renderText();
})();

// ============================
// Start Test
// ============================
startBtn.addEventListener("click", startTest);

function startTest() {
  typingInput.disabled = false;
  typingInput.focus();

  typingInput.addEventListener("input", handleTyping);

  startBtn.removeEventListener("click", startTest);
}

// ============================
// Typing Logic
// ============================
function handleTyping() {
  if (!timeStarted) {
    startTimer();
    timeStarted = true;
  }

  if (currentIndex >= originalText.length) {
    typingInput.value = "";
    typingInput.disabled = true;

    const spans = textDisplay.querySelectorAll("span");
    spans[spans.length - 1].classList.remove(
      "border-2",
      "border-solid",
      "border-yellow-900"
    );
    return;
  }

  if (!typingInput.value) return;

  const typedChar = typingInput.value.slice(-1);
  const expectedChar = originalText[currentIndex];
  const spans = textDisplay.querySelectorAll("span");
  const currentSpan = spans[currentIndex];

  currentSpan.classList.remove("border-2", "border-solid", "border-yellow-900");

  if (typedChar === expectedChar) {
    currentSpan.classList.add("text-green-500");
    correctChars++;
  } else {
    currentSpan.classList.add("text-red-500");
    wrongChars++;
  }

  totalTyped++;
  currentIndex++;

  if (currentIndex < spans.length) {
    spans[currentIndex].classList.add(
      "border-2",
      "border-solid",
      "border-yellow-900"
    );
  }

  updateWPM();
  updateAccuracy();
  mistakes.textContent = wrongChars;
  totalCharacters.textContent = totalTyped;
}

// ============================
// Backspace Handling
// ============================
typingInput.addEventListener("keydown", (e) => {
  if (!timeStarted) return;

  if (e.key === "Backspace") {
    e.preventDefault();
    handleBackspace();
  }
});

function handleBackspace() {
  if (currentIndex === 0) return;

  // Fix input value manually
  typingInput.value = typingInput.value.slice(0, -1);

  const spans = textDisplay.querySelectorAll("span");

  if (currentIndex < spans.length) {
    spans[currentIndex].classList.remove(
      "border-2",
      "border-solid",
      "border-yellow-900"
    );
  }

  currentIndex--;
  const span = spans[currentIndex];

  if (span.classList.contains("text-green-500")) correctChars--;
  if (span.classList.contains("text-red-500")) wrongChars--;

  totalTyped--;

  span.classList.remove("text-green-500", "text-red-500");
  span.classList.add("text-gray-400");
  span.classList.add("border-2", "border-solid", "border-yellow-900");

  updateWPM();
  updateAccuracy();
  mistakes.textContent = wrongChars;
  totalCharacters.textContent = totalTyped;
}

// ============================
// WPM & Accuracy
// ============================
function updateWPM() {
  let minutesElapsed = (60 - timeLeft) / 60;
  minutesElapsed = minutesElapsed === 0 ? 1 / 60 : minutesElapsed;

  const value =
    correctChars === 0 ? 0 : Math.round(correctChars / 5 / minutesElapsed);
  wpm.textContent = value;
}

function updateAccuracy() {
  const value =
    totalTyped === 0 ? 100 : ((correctChars / totalTyped) * 100).toFixed(2);
  accuracy.textContent = value + "%";
}

// ============================
// Timer
// ============================
function startTimer() {
  intervalId = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timer.textContent = timeLeft + "s";
      updateWPM();
    } else {
      clearInterval(intervalId);
      typingInput.disabled = true;

      const spans = textDisplay.querySelectorAll("span");
      if (currentIndex < spans.length) {
        spans[currentIndex].classList.remove(
          "border-2",
          "border-solid",
          "border-yellow-900"
        );
      }
    }
  }, 1000);
}

// ============================
// Reset Test
// ============================
async function resetTest() {
  clearInterval(intervalId);

  currentIndex = 0;
  correctChars = 0;
  wrongChars = 0;
  totalTyped = 0;
  timeLeft = 60;
  timeStarted = false;

  timer.textContent = "60s";
  wpm.textContent = "0";
  accuracy.textContent = "100%";
  mistakes.textContent = "0";
  totalCharacters.textContent = "0";

  typingInput.value = "";
  typingInput.disabled = true;
  typingInput.removeEventListener("input", handleTyping);

  startBtn.addEventListener("click", startTest);

  await fetchNewParagraph();
  renderText();
}

restartBtn.addEventListener("click", resetTest);
