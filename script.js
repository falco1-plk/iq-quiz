let questions = [
    { q: "What comes next: 2, 4, 8, 16, ?", o: ["18", "24", "32", "30"], a: 2 },
    { q: "Who was the first Prime Minister of India?", o: ["Gandhi", "Nehru", "Patel", "Bose"], a: 1 },
    { q: "If today is Monday, what day will it be after 9 days?", o: ["Tuesday", "Wednesday", "Thursday", "Friday"], a: 1 },
    { q: "Which movie has the dialogue 'Kitne aadmi the'?", o: ["Sholay", "DDLJ", "Lagaan", "Don"], a: 0 },
    { q: "√144 = ?", o: ["10", "11", "12", "13"], a: 2 },
    { q: "Which gas do plants absorb?", o: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], a: 1 },
    { q: "If a shirt costs ₹800 after 20% discount, original price?", o: ["1000", "960", "1200", "850"], a: 0 },
    { q: "Who is known as King Khan?", o: ["Salman", "Aamir", "SRK", "Akshay"], a: 2 },
    { q: "What has keys but can't open locks?", o: ["Piano", "Map", "Clock", "Phone"], a: 0 },
    { q: "Area of square with side 5 cm?", o: ["10", "20", "25", "30"], a: 2 },
    { q: "What should you do first in a fire emergency?", o: ["Run", "Hide", "Call fire brigade", "Panic"], a: 2 },
    { q: "Who directed '3 Idiots'?", o: ["Karan Johar", "Rajkumar Hirani", "Sanjay Leela", "Rohit Shetty"], a: 1 },
    { q: "LCM of 4 and 6?", o: ["10", "12", "24", "6"], a: 1 },
    { q: "Which is heavier?", o: ["1kg iron", "1kg cotton", "Both same", "Depends"], a: 2 },
    { q: "Best habit for success?", o: ["Consistency", "Luck", "Sleep all day", "Shortcuts"], a: 0 }
];

let index = 0;
let score = 0;
let userAnswers = [];
let username = "";

function startQuiz() {
    username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Please enter your name!");
        return;
    }
    document.getElementById("nameBox").classList.add("hide");
    document.getElementById("quizBox").classList.remove("hide");
    loadQuestion();
}

function loadQuestion() {
    let q = questions[index];
    document.getElementById("question").innerText = q.q;
    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.o.forEach((opt, i) => {
        let div = document.createElement("div");
        div.className = "option";
        div.innerText = opt;
        div.onclick = () => userAnswers[index] = i;
        optionsDiv.appendChild(div);
    });
}

function nextQuestion() {
    if (userAnswers[index] === undefined) {
        alert("Please select an option");
        return;
    }
    if (userAnswers[index] === questions[index].a) score++;
    index++;

    if (index < questions.length) loadQuestion();
    else showResult();
}

function showResult() {
    document.getElementById("quizBox").classList.add("hide");
    document.getElementById("resultBox").classList.remove("hide");

    document.getElementById("finalScore").innerText =
        `${username}, your score is ${score}/15`;

    let level = "";
    if (score === 0) level = "🤯 Living in Parallel Universe";
    else if (score <= 3) level = "🧐 Very Suspicious Human";
    else if (score <= 5) level = "😅 Lucky Guess Expert";
    else if (score <= 8) level = "🙂 Brain Still Loading…";
    else if (score <= 10) level = "😐 Average Life Survivor";
    else if (score <= 12) level = "😎 Street Smart Thinker";
    else if (score <= 14) level = "🧠 Overthinking Pro Max";
    else level = "👑 Legendary Life Master";

    document.getElementById("level").innerText = level;

    let roast = "";
    if (score === 0) roast = "💀 Answered from another universe.";
    else if (score <= 3) roast = "👀 Google bhi help nahi kar paaya?";
    else if (score <= 5) roast = "🎲 Pure luck. Admit it.";
    else if (score <= 8) roast = "🧠 Brain buffering…";
    else if (score <= 10) roast = "😐 NPC energy detected.";
    else if (score <= 12) roast = "😎 Respectable.";
    else if (score <= 14) roast = "🧠 Almost dangerous IQ.";
    else roast = "👑 Are you human or ChatGPT?";

    document.getElementById("roast").innerText = roast;

    if (score === 15) {
        confetti({ particleCount: 250, spread: 100, origin: { y: 0.6 } });
    }

    let review = "";
    questions.forEach((q, i) => {
        review += `<p class="${userAnswers[i] === q.a ? 'correct' : 'wrong'}">
        Q${i + 1}: ${q.q}<br>
        Your answer: ${q.o[userAnswers[i]]} | Correct: ${q.o[q.a]}
        </p>`;
    });
    document.getElementById("answerReview").innerHTML = review;

    saveScore(username, score);
    showLeaderboard();
}

function saveScore(name, score) {
    let board = JSON.parse(localStorage.getItem("leaderboard")) || [];
    board.push({ name, score });
    board.sort((a, b) => b.score - a.score);
    board = board.slice(0, 5);
    localStorage.setItem("leaderboard", JSON.stringify(board));
}

function showLeaderboard() {
    let board = JSON.parse(localStorage.getItem("leaderboard")) || [];
    let list = document.getElementById("leaderboard");
    list.innerHTML = "";
    board.forEach((e, i) => {
        let li = document.createElement("li");
        li.innerText = `${i + 1}. ${e.name} — ${e.score}/15`;
        list.appendChild(li);
    });
}