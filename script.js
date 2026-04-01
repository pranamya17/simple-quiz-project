const questions = [
{
    question: "Why is the sky blue but sunsets appear red?",
    answers: [
        { text: "reflection of light", correct: false },
        { text: "Rayleigh scattering", correct: true },
        { text: "ozone layer absorption", correct: false },
        { text: "clouds blocking light", correct: false },
    ]
},
{
    question: "What would happen if a human goes to space without a spacesuit?",
    answers: [
        { text: "Body immediately freezes solid", correct: false },
        { text: "Body explodes instantly", correct: false },
        { text: "Loss of consciousness due to lack of oxygen", correct: true },
        { text: "Nothing happens", correct: false },
    ]
},
{
    question: "Why do we see lightning before we hear thunder?",
    answers: [
        { text: "Sound travels faster than light", correct: false },
        { text: "Light and sound travel at same speed", correct: false },
        { text: "Light travels faster than sound", correct: true },
        { text: "Thunder happens before lightning", correct: false },
    ]
},
{
    question: "Can humans travel faster than light?",
    answers: [
        { text: "Yes, easily possible", correct: false },
        { text: "Only in space", correct: false },
        { text: "No, according to Theory of Relativity", correct: true },
        { text: "Only at night", correct: false },
    ]
},
{
    question: "How do vaccines help the body?",
    answers: [
        { text: "Kill all bacteria instantly", correct: false },
        { text: "Increase body temperature", correct: false },
        { text: "Train the immune system to recognize pathogens", correct: true },
        { text: "Replace blood cells", correct: false },
    ]
}
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("a");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.style.backgroundColor = "green";
        score++;
    } else {
        selectedBtn.style.backgroundColor = "red";
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.style.backgroundColor = "green";
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();