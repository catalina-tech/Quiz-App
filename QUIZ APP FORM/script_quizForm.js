document.addEventListener("DOMContentLoaded", init);

function init() {
  const addButton = document.getElementById("addButton");
  const submitQuizButton = document.getElementById("submitQuiz");
  let score = 0;
  const questions = [];

  addButton.addEventListener("click", addQuestion);

  function addQuestion() {
    const question = document.getElementById("question").value;
    const answer1 = document.getElementById("one").value;
    const answer2 = document.getElementById("two").value;
    const answer3 = document.getElementById("three").value;
    const answer4 = document.getElementById("four").value;
    const questionContainer = document.getElementById("questionContainer");
    const answerOneRadio = document.getElementById("answerOneRadio");
    const answerTwoRadio = document.getElementById("answerTwoRadio");
    const answerThreeRadio = document.getElementById("answerThreeRadio");
    const answerFourRadio = document.getElementById("answerFourRadio");
    const explanation = document.getElementById("explanation").value;

    let correctAnswer;

    if (answerOneRadio.checked) {
      correctAnswer = answer1;
    } else if (answerTwoRadio.checked) {
      correctAnswer = answer2;
    } else if (answerThreeRadio.checked) {
      correctAnswer = answer3;
    } else if (answerFourRadio.checked) {
      correctAnswer = answer4;
    } else {
      alert("Please select a correct answer");
      return;
    }

    const questionObj = {
      question,
      answers: [answer1, answer2, answer3, answer4],
      correctAnswer,
      explanation,
    };

    questions.push(questionObj);

    const questionBlock = document.createElement("div");
    questionBlock.classList.add("question-block");

    let answersHTML = "";

    questionObj.answers.forEach((answer, index) => {
      answersHTML += `
                  <label for="question">
                      <input id="question" type="radio" name="answer${
                        questions.length
                      }" value="${answer}" data-is-correct="${
        answer === questionObj.correctAnswer
      }">
                      ${answer}
                  </label><br>
              `;
    });
    questionBlock.innerHTML = `
          <h2>${questionObj.question}</h2>
          <form class="question">${answersHTML}</form>
          <p class="explanation hidden">ANSWER: ${questionObj.explanation}</p>
      `;

    // Clear input fields after adding the question
    document.getElementById("question").value = "";
    document.getElementById("one").value = "";
    document.getElementById("two").value = "";
    document.getElementById("three").value = "";
    document.getElementById("four").value = "";
    document.getElementById("explanation").value = "";
    document.getElementById("answerOneRadio").checked = false;
    document.getElementById("answerTwoRadio").checked = false;
    document.getElementById("answerThreeRadio").checked = false;
    document.getElementById("answerFourRadio").checked = false;

    submitQuizButton.classList.remove("hidden");

    const form = questionBlock.querySelector("form");
    form.addEventListener("change", selectAnswer);

    function selectAnswer(e) {
      const selectButton = e.target;
      const isCorrect = selectButton.dataset.isCorrect === "true";
      const questionElement = selectButton.closest(".question");
      const explanationElement = questionElement.nextElementSibling;

      if (isCorrect) {
        selectButton.classList.add("isCorrect");
        score++;
      } else {
        selectButton.classList.add("isFalse");
      }

      // Disable all buttons in the current question

      const allButtons = questionElement.querySelectorAll("input[type=radio]");
      allButtons.forEach((button) => {
        button.disabled = true;
        if (button.dataset.isCorrect === "true") {
          button.classList.add("isCorrect");
        }
      });

      // Show explanation for the current question

      explanationElement.style.display = "block";
    }

    questionContainer.appendChild(questionBlock);
  }

  submitQuizButton.addEventListener("click", showScore);

  function showScore() {
    
    // Show explanation for the current question

    const scoreElement = document.createElement("p");
    scoreElement.classList.add("score");
    scoreElement.innerHTML =
      "The score is: " + score + " out of " + questions.length;
    questionContainer.appendChild(scoreElement);
    submitQuizButton.classList.add("hidden");
  }

  submitQuizButton.classList.remove("hidden");
}
