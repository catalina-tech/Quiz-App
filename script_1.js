console.log("hello world");

document.addEventListener("DOMContentLoaded", init);

function init() {
  let data;

  fetch(
    "https://raw.githubusercontent.com/catalina-tech/catalina-tech.github.oi/main/data/apiData.json"
  )
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      data = jsonData;
      updatedDOM(data);
      const questions = data;
      startQuiz(questions);
    })
    .catch((error) => console.log("there is something wrong", error))
    .finally(() => (loading = false));
}

function updatedDOM(questions) {
  const playerNameElement = document.getElementById("playerName");
  const quizSection = document.getElementById("quizSection");
  const playerNameInput = document.getElementById("playerNameInput");
  const startButton = document.getElementById("startButton");
  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answerButtons");
  const nextButton = document.getElementById("btn-next");
  const shuffleButton = document.getElementById("shuffleButton");
  const explanationElement = document.getElementById("explanation");
  const divApp = document.getElementById("app");

  playerNameElement.textContent = playerNameInput;

  let currentQuestionIndex = 0;
  let score = [0];
  let player = "";
  let currentPlayerIndex = 0;

  startButton.addEventListener("click", startButtonClick);

  function startButtonClick() {
    const playerName = playerNameInput.value.trim();

    if (playerName) {
      localStorage.setItem("playerName", playerName);
      player = playerName;
      divApp.classList.add("hidden");
      quizSection.classList.remove("hidden");
      playerNameElement.textContent = "PLAYER: " + playerName;
      playerNameElement.style.textTransform = "uppercase";
      startQuiz(questions);
    } else {
      alert("Please enter your name.");
    }
  }

  function startQuiz(questions) {
    currentQuestionIndex = 0;
    currentPlayerIndex = 0;
    score = [0];
    nextButton.innerHTML = "Next";
    shuffleButton.innerHTML = "Shuffle Answers";
    shuffleButton.style.display = "block";
    showQuestion(questions);
  }

  function showQuestion(questions) {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML =
      questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);

      if (answer.isCorrect) {
        button.dataset.isCorrect = answer.isCorrect;
      }

      button.addEventListener("click", selectAnswer);
    });
  }

  function resetState() {
    nextButton.style.display = "none";
    explanationElement.innerHTML = "";
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }

  function selectAnswer(e) {
    const selectButton = e.target;
    const isCorrect = selectButton.dataset.isCorrect === "true";

    if (isCorrect) {
      selectButton.classList.add("isCorrect");
      score[currentPlayerIndex]++;
    } else {
      selectButton.classList.add("isFalse");
    }

    explanationElement.innerHTML = questions[currentQuestionIndex].explanation;
    nextButton.style.display = "block";
  }

  function showScore() {
    resetState();
    questionElement.innerHTML =
      "The score for: " +
      player +
      " is : " +
      score[currentPlayerIndex] +
      " of " +
      questions.length;

    nextButton.innerHTML = "Start the quiz again";
    nextButton.style.display = "block";
    shuffleButton.style.display = "none";
  }

  function goToNextButton() {
    if (currentPlayerIndex === 0) {
      currentQuestionIndex++;
    }

    if (currentQuestionIndex < questions.length) {
      showQuestion(questions);
    } else {
      showScore();
    }
  }

  function shuffleAnswers() {
    for (let i = answerButtons.children.length; i >= 0; i--) {
      answerButtons.appendChild(
        answerButtons.children[(Math.random() * i) | 0]
      );
    }
  }

  shuffleButton.addEventListener("click", shuffleAnswers);

  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
      goToNextButton();
    } else {
      startQuiz(questions);
    }
  });

  //build a function to filter the questions by searching the type of each question
  //I include a type of question according to the topic, and the filter function is made using the type properties.

  // function filteredQuestions(questions,filter){

  //     return questions.filter(question => question.type.includes(filter));
  // }

  // function filteredQuestionsGmp(questions,filter){
  //   return questions.filter(question => question.type.includes("GMP") )
  //   startQuiz(questions);
  // }

  // function filteredQuestionsPersonalHygiene(questions,filter){
  //   return questions.filter(question => question.type.includes("Personal Hygiene") )
  //   startQuiz(questions);
  // }

  // const filteredQuestionsListing = filteredQuestions(questions, "GMP");
  // const filteredQuestionsListing1 = filteredQuestions(questions, "Personal Hygiene");

  // console.log(filteredQuestionsListing);
  // console.log(filteredQuestionsListing1);

  // startQuiz(questions);
}
