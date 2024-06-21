console.log("hello world");

document.addEventListener("DOMContentLoaded", init);

function init() {
  async function getDataQuiz() {
    try {
      const res = await fetch("https://raw.githubusercontent.com/catalina-tech/catalina-tech.github.oi/main/data/apiData.json");
      const questions = await res.json();
      updatedDOM(questions);
    } catch (error) {
      console.log("There is something wrong", error);
    }
  }

  getDataQuiz();

  function updatedDOM(questions) {
    const playerNameElement = document.getElementById("playerName");
    const quizSection = document.getElementById("quizSection");
    const playerNameInput = document.getElementById("playerNameInput");
    const startButton = document.getElementById("startButton");
    const questionsContainer = document.getElementById("questionsContainer");
    const submitQuizButton = document.getElementById("submitQuiz");
    const divApp = document.getElementById("app");
    const alphabeticButton = document.getElementById("alphabeticButton");
    const randomButton = document.getElementById("randomButton");
    const originalButton = document.getElementById("originalButton");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    let score = 0;
    let player = "";
    let orderedQuestions = [...questions];

    startButton.addEventListener("click", startButtonClick);
    alphabeticButton.addEventListener("click", () => sortQuestions('alphabetical'));
    randomButton.addEventListener("click", () => sortQuestions('random'));
    originalButton.addEventListener("click", () => sortQuestions('original'));
    searchButton.addEventListener("click", performSearch);
    
    function startButtonClick() {
      const playerName = playerNameInput.value.trim();

      if (playerName) {
        localStorage.setItem("playerName", playerName);
        player = playerName;
        //divApp.classList.add("hidden");
        //quizSection.classList.remove("hidden");
        playerNameElement.textContent = "PLAYER: " + playerName;
        playerNameElement.style.textTransform = "uppercase";
        displayAllQuestions(orderedQuestions);
      } else {
        alert("Please enter your name.");
      }
    }

    function displayAllQuestions(questions) {
      questionsContainer.innerHTML = "";
      questions.forEach((question, index) => {
        const questionElement = document.createElement("div");
        questionElement.classList.add("question");

        const questionText = document.createElement("p");
        questionText.classList.add("questionText");
        questionText.innerHTML = (index + 1) + ". " + question.question;
        questionElement.appendChild(questionText);

        question.answers.forEach((answer, answerIndex) => {
          
          const answers = document.createElement("div");
          answers.classList.add("answers");
              
          const input = document.createElement("input");
          input.type = "radio";
          input.value = answer.text;
          input.name = 'question-' + index;
          input.classList.add("answers");
          input.dataset.isCorrect = answer.correct;
          input.addEventListener("change", selectAnswer);
          
          const label = document.createElement("label");
          label.innerHTML = answer.text;
          label.classList.add("label");          
                    
          answers.appendChild(input);  
          answers.appendChild(label); 
          questionElement.appendChild(answers);
          
        });

        const explanationElement = document.createElement("p");
        explanationElement.classList.add("explanation");
        explanationElement.style.display = "none"; 
        explanationElement.innerHTML = question.explanation;
        questionElement.appendChild(explanationElement);

        questionsContainer.appendChild(questionElement);
      });

      submitQuizButton.classList.remove("hidden");
      submitQuizButton.addEventListener("click", showScore);
    }

    function selectAnswer(e) {
      const selectButton = e.target;
      const isCorrect = selectButton.dataset.isCorrect === "true";

      if (isCorrect) {
        selectButton.classList.add("isCorrect");
        score++;
      } else {
        selectButton.classList.add("isFalse");
      }

      // Disable all buttons in the current question
      const questionElement = selectButton.closest(".question");
      const allButtons = questionElement.querySelectorAll(".btn");
      allButtons.forEach(button => {
        button.disabled = true;
        if (button.dataset.isCorrect === "true") {
          button.classList.add("isCorrect");
        }
      });

      // Show explanation for the current question
      const explanationElement = questionElement.querySelector(".explanation");
      explanationElement.style.display = "block";
    }

    function showScore() {
      questionsContainer.innerHTML = "";
      const scoreElement = document.createElement("p");
      scoreElement.innerHTML = "The score for " + player + " is: " + score + " out of " + questions.length;
      questionsContainer.appendChild(scoreElement);
      submitQuizButton.classList.add("hidden");
    }

function sortQuestions(orderType) {
      if (orderType === 'alphabetical') {
        orderedQuestions.sort((a, b) => a.question.localeCompare(b.question));
      } else if (orderType === 'random') {
        orderedQuestions.sort(() => Math.random() - 0.5);
      } else {
        orderedQuestions = [...questions]; 
      }
      displayAllQuestions(orderedQuestions); 
    }

    function resetToStart() {
      divApp.classList.remove("hidden");
      //quizSection.classList.add("hidden");
      playerNameInput.value = playerNameInput.value.trim();
      playerNameElement.textContent = "Player:" +playerNameInput.value.trim();;
      score = 0;
    }
    
    function performSearch() {
      const searchText = searchInput.value.trim().toLowerCase();
      if (searchText === "") {
        filteredQuestions = [...orderedQuestions]; // Reset to original order if search input is empty
      } else {
        filteredQuestions = orderedQuestions.filter(question =>
          question.question.toLowerCase().includes(searchText)
        );
      }
      displayAllQuestions(filteredQuestions); 
    }
  }
}
