# ⌨️ Typing Speed & Accuracy Tester

A **web-based typing speed and accuracy tester** built using **HTML, Tailwind CSS, and JavaScript**.  
Practice typing with real-time feedback on speed, accuracy, and mistakes. Each test dynamically loads a new paragraph for realistic practice.  


## 🔹 Demo

Live demo: https://bharathbanti.github.io/Typing-Speed-and-Accuracy-Tester/


## 🔹 Features

- ✅ **Real-Time Character Feedback**: Correct characters turn green, mistakes turn red.  
- ⏱️ **Timer & WPM Calculation**: Countdown timer with dynamic **Words Per Minute (WPM)** calculation.  
- 🎯 **Accuracy Percentage**: Shows typing accuracy in real-time.  
- ❌ **Mistakes Counter**: Tracks total mistakes during the session.  
- 🔄 **Dynamic Paragraphs**: New paragraph loads on each reset.  
- ⌨️ **Custom Backspace Handling**: Keeps display and input in sync.  
- 🔘 **Start/Restart Buttons**:  
  - **Start**: Begins the test and focuses on input  
  - **Restart**: Resets stats and loads a new paragraph  
- 📱 **Responsive Design**: Works on both desktop and mobile screens.


## 🔹 Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML       | Structure of the page |
| Tailwind CSS | Styling and responsive layout |
| JavaScript | Core logic: timers, WPM/accuracy calculations, event handling |


## 🔹 How It Works

1. **Render Paragraph**: Each character is wrapped in a `<span>` for dynamic updates.  
2. **Start Typing**: Click **Start** → input enabled → timer starts.  
3. **Character Comparison**:  
   - ✅ Correct → Green  
   - ❌ Incorrect → Red  
4. **WPM & Accuracy**:  
   - WPM = `(Correct Characters / 5) / Minutes Elapsed`  
   - Accuracy = `(Correct Characters / Total Typed Characters) * 100%`  
5. **Backspace Handling**: Controlled manually to keep display and input synced.  
6. **Reset Test**: Clears stats, stops timer, and loads a new paragraph.


## 🔹 Future Enhancements

- Difficulty levels: easy / medium / hard

- Adjustable test duration (30s, 60s, 120s)

- Leaderboard using localStorage

- Dark/Light mode toggle

- Real-world paragraph sources (news/blogs)


## 🔹 License

MIT License — free to use and modify for personal or educational purposes.


## 🔹 Author

Bharath Dasari

🔗GitHub: https://github.com/BharathBanti

Inspired by professional typing platforms like Keybr & MonkeyType
