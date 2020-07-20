const STORE = [
    {question: "What is the largest organ of the human body?",
    answers: ["Skin", "Brain", "Large intestine", "Liver"],
    correctAnswer: "Skin"},

    {question: "What is the name of the biggest part of the human brain?",
    answers: ["Brainstem", "Cerebrum", "Cerebellum", "Corpus callosum"],
    correctAnswer: "Cerebrum"},

    {question: "Which blood type is universal?",
    answers: ["A+", "B-", "AB+", "O-"],
    correctAnswer: "O-"},

    {question: "Which organ stores bile?",
    answers: ["Stomach", "Gallbladder", "Kidney", "Liver"],
    correctAnswer: "Gallbladder"},

    {question: "What is the length of the human digestive system when stretched out from end to end?",
    answers: ["Around 20 feet", "Around 60 feet", "Around 30 feet", "Around 100 feet", ],
    correctAnswer: "Around 30 feet"},

    {question: "What is the black dot in the middle of the eye called?",
    answers: ["Pupil", "Retina", "Cornea", "Iris"],
    correctAnswer: "Pupil"},

    {question: "What is the longest bone in the body?",
    answers: ["Tibia", "Femur", "Fibula", "Humerus"],
    correctAnswer: "Femur"},

    {question: "What substance primarily makes up the nose?",
    answers: ["Bone", "Muscle", "Cartilage", "Cilia"],
    correctAnswer: "Cartilage"},

    {question: "How many bones does an adult human have?",
    answers: ["190", "206", "305", "412"],
    correctAnswer: "206"},

    {question: "Roughly how many taste buds are on the tongue?",
    answers: [ "1,000", "5,000", "10,000", "100,000"],
    correctAnswer: "10,000"},

    {question: "Approximately, how much of the body is composed of water?",
    answers: [ "30%", "70%", "80%", "60%"],
    correctAnswer: "60%"},

    {question: "What is the average thickness of human skin?",
    answers: ["2mm", "0.2mm", "6mm", "12mm"],
    correctAnswer: "2mm"}];  

    var questionNumber = 0;
    var score = 0;
    var index = 0;

    function updateQuestionNumber() {
        questionNumber++;
    }

    function updateScore() {
        score++;
    }

    function updateIndex() {
        index++;
    }

    function quizIntro() {
        $(".js-score-info").hide();
        $(".js-quiz-question-box").hide();
        $(".js-correct-answer").hide();
        $(".js-wrong-answer").hide();
    }

    function generateQuizString(arr, index) {
        var quizString = `
        <form>
          <fieldset>
            <legend>${arr[index].question}</legend>
              <input type="radio" id="choice-1" name="choice" value="${arr[index].answers[0]}" required>
              <label for="choice-1">${arr[index].answers[0]}</label>
              <br>
              <input type="radio" id="choice-2" name="choice" value="${arr[index].answers[1]}">
              <label for="choice-2">${arr[index].answers[1]}</label>
              <br>
              <input type="radio" id="choice-3" name="choice" value="${arr[index].answers[2]}">
              <label for="choice-3">${arr[index].answers[2]}</label>
              <br>
              <input type="radio" id="choice-4" name="choice" value="${arr[index].answers[3]}">
              <label for="choice-4">${arr[index].answers[3]}</label>
              <br>
              <div class="button">
                <input type="submit" class="js-submit-answer">
                <br>
                <button class="js-reset">Reset Quiz</button>
             </div>
        </fieldset>
        </form>`

        return quizString;
    }

    function generateQuestion(arr, index) {
            $(".js-quiz-question-box").html(generateQuizString(arr, index));
            $(".js-score").html(score);
            $(".js-question-number").html(questionNumber);
            $(".js-quiz-intro").hide();
            $(".js-score-info").show();
            $(".js-quiz-question-box").show();
            $(".js-correct-answer").hide();
            $(".js-wrong-answer").hide();
    }

    function startQuiz() {
        $(".js-quiz-intro").on('click', '.js-start-quiz', function(event) {
            updateQuestionNumber();
            $(".js-score").html(score);
            $(".js-question-number").html(questionNumber);
            $(".js-quiz-intro").hide();
            $(".js-score-info").show();
            $(".js-quiz-question-box").show();
            generateQuestion(STORE, index);
        })
    }

    function finishQuiz() {
        $(".js-quiz-intro").show();
        $(".js-quiz-intro").html(`<p>Your final score is: ${score}</p><button class="js-reset">Take The Quiz Again</button>`);
        $(".js-score-info").hide();
        $(".js-quiz-question-box").hide();
        $(".js-correct-answer").hide();
        $(".js-wrong-answer").hide();
    }

    function continueQuiz() {
        updateQuestionNumber();
        if (questionNumber <= STORE.length) {
        generateQuestion(STORE, index);
        } else {
            finishQuiz();
        }
    }

    function resetQuiz() {
        $(".js-quiz-question-box, .js-quiz-intro, .js-correct-answer, .js-wrong-answer").on("click", ".js-reset", function(event){
            event.preventDefault();
            score = 0;
            questionNumber = 1;
            index = 0;
            generateQuestion(STORE, index);
        })
    }

    function correctAnswer() {

        var correctAnswerString;
        if (questionNumber < STORE.length) {
            correctAnswerString = `<p>Your answer is right!!!</p><br><div class="button"><button class="js-next-question">Next Question</button><button class="js-reset">Reset Quiz</button></div>`;
        } else {
            correctAnswerString = `<p>Your answer is right!!!</p><br><div class="button"><button class="js-next-question">See Final Score</button></div>`;
        }
        return correctAnswerString;
    }

    function wrongAnswer(arr, index) {

        var wrongAnswerString; 
        if (questionNumber < STORE.length) {
            wrongAnswerString = `<p>Oops! Your answer is wrong!!!</p><p>Correct answer is: ${arr[index].correctAnswer}</p><br><div class="button"><button class="js-next-question">Next Question</button><button class="js-reset">Reset Quiz</button></div>`;
        } else {
            wrongAnswerString = `<p>Oops! Your answer is wrong.</p><p>Correct answer is: ${arr[index].correctAnswer}</p><br><div class="button"><button class="js-next-question">See Final Score</button></div>`;
        }
        
        return wrongAnswerString;
    }

    function checkAnswer(arr, index) {

        var radioValue = $('input[name="choice"]:checked').val();

        if(!radioValue)
        {
          alert("Please select an aswer to continue");
          return false;
        }
        
        if (radioValue === arr[index].correctAnswer) {
            updateScore();
            $(".js-score").html(score);
            $(".js-quiz-intro").hide();
            $(".js-quiz-question-box").hide();
            $(".js-wrong-answer").hide();
            $(".js-correct-answer").show();
            $(".js-correct-answer").html(correctAnswer());
        } else {
            $(".js-quiz-intro").hide();
            $(".js-quiz-question-box").hide();
            $(".js-correct-answer").hide();
            $(".js-wrong-answer").show();
            $(".js-wrong-answer").html(wrongAnswer(arr, index));
                
        }
    }

    function submitAnswer() {
        $(".js-quiz-question-box").on("click", ".js-submit-answer", function(event){
        event.preventDefault();
        checkAnswer(STORE, index);
        })
    }

    function nextQuestion() {
        $(".js-correct-answer, .js-wrong-answer").on("click",".js-next-question", function(event) {
            updateIndex();
            continueQuiz();
          })
    }

    function handleQuizApp() {
        quizIntro();
        startQuiz();
        resetQuiz();
        submitAnswer();
        nextQuestion();
    }

    $(handleQuizApp);