document.addEventListener("DOMContentLoaded", function() {
    
    const questions = [
        { 
            id : 1,
            type: "GMP",
            question: "What do the initials GMP stand for?",
            answers: [
                    { text: "Good Manufacturing Practice", correct: true },
                    { text: "Good Manufacturing Procedure", correct: false },
                    { text: "Good Morning, Pal!", correct: false},
                    { text: "Great Manufacturing Procedure", correct: false },
            ],
            explanation: "ANSWER: Good Manufacturing Practice is the correct answer",
          },
      { 
        id : 2,
        type: "GMP",
        question: "Which of the following is a primary component of Good Manufacturing Practice (GMP) regulations?",
        answers: [
                { text: "Maintaining personal hygiene in the workplace", correct: true },
                { text: "Reducing production costs to increase profit margins", correct: false },
                { text: "Increasing the number of employees to speed up production", correct: false},
                { text: "Using the cheapest available raw materials", correct: false },
        ],
        explanation: "ANSWER: Maintaining personal hygiene in the workplace is the correct answer",
      },
    
      { 
        id: 3,
        type: "GMP",
        question: "What is the primary goal of Good Manufacturing Practice (GMP) regulations?",
        answers: [
                { text: "To maximize production output", correct: false },
                { text: "To ensure products are safe and of high quality", correct: true },
                { text: "To minimize the cost of production", correct: false },
                { text: "To increase market share", correct: false },
        ],
        explanation: "ANSWER: To ensure products are safe and of high quality is the correct answer",
      },
      { 
        id: 4,
        type: "Personal Hygiene",
        question: "Knowing the correct way to handle the products hygienically is the responsibility of:",
        answers: [
                { text: "Only from health authorities", correct: false },
                { text: "All the personal staff of the company", correct: true },
                { text: "Only from consumers", correct: false },
                { text: "Only the owners of the company", correct: false },
        ],
        explanation: "ANSWER: All the personal staff of the company is the correct answer",
      },
      { 
        id: 5,
        type: "GMP",
        question: "Why GMP are so important in the company",
        answers: [
                { text: "To increase company profits", correct: false },
                { text: "Reduce risks and avoid contamination", correct: true },
                { text: "To minimize the cost of production", correct: false },
                { text: "Improve product quality", correct: true },
        ],
        explanation: "ANSWER: Reduce risks and avoid contamination and Improve product quality are the correct answer",
      },
    ];

    const playerName = localStorage.getItem("playerName");
    const playerNameElement = document.getElementById("playerName");
    const quizSection = document.getElementById("quizSection");

    playerNameElement.textContent = playerName; // Muestra el nombre del jugador en la página

    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answerButtons");
    const nextButton = document.getElementById("btn-next");
    const shuffleButton = document.getElementById("shuffleButton");
    const explanationElement = document.getElementById("explanation");
    
    playerNameElement.textContent = playerName;
    
    let currentQuestionIndex = 0;
    let score = [0];
    let player = "";
    let currentPlayerIndex = 0;
    
    
    
    
    
    
    // startButton.addEventListener("click", startButtonClick);
    
    //     function startButtonClick() {
    //         const playerOneName = playerOne.value.trim();
            
    //         if (playerOneName) {
    //             player = playerOneName;
    //             startSection.style.display = "none";
    //             quizSection.style.display = "block";
    //             startQuiz();
    //         } else {
    //             alert("Please enter a name for the player.");
    //         }
    //     }
    
    
    function startQuiz(){
        currentQuestionIndex = 0;
        currentPlayerIndex = 0;
        score = [0];
        nextButton.innerHTML = "Next";
        shuffleButton.innerHTML = "Shuffle Answers";
        shuffleButton.style.display = "block";
        showQuestion();
    }
    
    function showQuestion(){
        resetState();
        let currentQuestion = questions[currentQuestionIndex];
        let questionNumber = currentQuestionIndex + 1;
        questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;
       
        
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML =  answer.text;
            button.classList.add("btn");
            answerButtons.appendChild(button);
    
            if(answer.correct){
                button.dataset.correct = answer.correct;
           }
            button.addEventListener("click", selectAnswer);
        });
    };
    
    function resetState(){
        nextButton.style.display = "none";
        explanationElement.innerHTML = "";
        while(answerButtons.firstChild){
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }
    
    function selectAnswer(e){
        const selectButton = e.target;
        const isCorrect = selectButton.dataset.correct === "true";
    
        if(isCorrect){
            selectButton.classList.add("correct");
            score[currentPlayerIndex]++;
        } else {
            selectButton.classList.add("incorrect");
        }
    
        Array.from(answerButtons.children).forEach(button => {
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled = true;
        });
    
        explanationElement.innerHTML = questions[currentQuestionIndex].explanation;
        nextButton.style.display = "block";
    
    }
    
    function showScore(){
        resetState();
        // questionElement.innerHTML = "The score for " + players[0] +" is:" + score[0]  + "and for player " + players[1] + "is: " + score[1] + " of " + questions.length;
        questionElement.innerHTML = "The score for: " + playerName + " is :" + score + " of " + questions.length;
        nextButton.innerHTML = "Start the quiz again";
        nextButton.style.display = "block";
        shuffleButton.style.display = "none";
    
    }
    
    function goToNextButton(){
        currentPlayerIndex = (currentPlayerIndex + 1) % 2;
    
        if (currentPlayerIndex === 0){
            currentQuestionIndex++;
        }
    
            if(currentQuestionIndex < questions.length){
            showQuestion();
        } else {
            showScore();
        }
    }
    
    function shuffleAnswers(){
        for (let i = answerButtons.children.length; i >= 0; i--) {
            answerButtons.appendChild(answerButtons.children[Math.random() * i | 0]);
        }
    }
    
    shuffleButton.addEventListener("click", shuffleAnswers);
    
    nextButton.addEventListener("click", ()=> {
        if(currentQuestionIndex < questions.length){
            goToNextButton();
        } else {
            startQuiz();
        }
    });
    
    //build a function to filter the questions by searching the type of each question
    //I include a type of question according to the topic, and the filter function is made using the type properties.
    
    // function filteredQuestions(questions,filter){
      
    //     return questions.filter(question => question.type.includes(filter));
    // }
    
    // const filteredQuestionsListing = filteredQuestions(questions, "GMP");
    // const filteredQuestionsListing1 = filteredQuestions(questions, "Personal Hygiene");
    
    // console.log(filteredQuestionsListing);   
    // console.log(filteredQuestionsListing1); 
    
    startQuiz();
    
     
    
    
    
});
