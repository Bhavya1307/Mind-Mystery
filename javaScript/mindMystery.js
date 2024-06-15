// onload function
window.onload = function () {
    // An object containing all the questions and answers
    const questions = [
        { question: "What is the output of the following code : " + "\n" + "var x = 10; function foo() " + "\n" + "{ console.log(x); var x = 5; } foo();", answer: "22" },
        { question: "What is the output of the following code: " + "\n" + "console.log(2 + “2”);", answer: "22" },
        { question: "What does the “NaN” value represent in JavaScript?", answer: "Not a number" },
        { question: "What is the output of the following code: " + "\n" + "console.log(“5” == 5);", answer: "True" },
        { question: "What is the output of the following code : " + "\n" + "var x = 5; console.log(x++);", answer: "5" },
        { question: "", answer: "" },
        { question: "What is the output of the following code : " + "\n" + "var x = [1, 2, 3]; console.log(x.length);", answer: "3" },
        { question: "What is the output of the following code: " + "\n" + "var x = 10; var y = 5; " + "\n" + "console.log((x > y) && (y < 6));", answer: "False" },
        { question: "What is the output of the following code : " + "\n" + "console.log(1 + “2” + 3);", answer: "123" },
        { question: "What is the output of the following code : " + "\n" + "console.log( typeof [ ] );", answer: "Object" },
        { question: "Which function of an Array object calls a function for each element in the array?", answer: "ForEach()" },
        { question: "What is the output of the following code: " + "\n" + "console.log(typeof null);", answer: "Object" },
        { question: "What is the output of the following code: " + "\n" + "console.log(“Hello”.charAt(1));", answer: "e" },
        { question: "What is the output of the following code: " + "\n" + "console.log(NaN == NaN);", answer: "False" },
        { question: "What is the output of the following code: " + "\n" + "var x = 10; var y = “5”; console.log(x – y);", answer: "15" },
        { question: "How can you stop the execution of a setInterval method?", answer: "clearInterval()" },
        { question: "What is the output of the following code : " + "\n" + "console.log(typeof NaN);", answer: "Number" },
        { question: "What is the output of the following code : " + "\n" + "var x = [1, 2, 3]; console.log(x[3]);", answer: "Undefined" },
        { question: "What is the output of the following code : " + "\n" + "console.log(2 ** 3);", answer: "8" },
        { question: "What is the output of the following code: console.log(10 < 9 < 8);", answer: "true" },
    ];
    // Variable which holds all the sides of the dice
    var diceArray = ["images/1.png", "images/2.png", "images/3.png", "images/4.png", "images/5.png", "images/6.png"];

    // Extracting values from HTML by element ids
    var questionBox = document.getElementById("questionBox");
    var questionText = document.getElementById("questionText");
    var answerInput = document.getElementById("answerInput");
    var submitButton = document.getElementById("submitAnswer");
    var feedback = document.getElementById("feedback");
    var finalscore = document.getElementById("scorecard");
    var finalScoreText = document.getElementById("score");
    var feedback2 = document.getElementById("feedback2");
    var next = document.getElementById("next");
    var totalScore = 0; // Initialize total score
    var attempts = 0; // Initialize attempts
    var dice = document.getElementById("dice");
    var currentPosition = 6; // Start position of the token, as it starts in box6
    var maxPosition = 20; // Total number of boxes

    //onclick function on dice
    dice.onclick = function () {
        var random = Math.floor(Math.random() * diceArray.length); // Get a random index
        dice.src = diceArray[random]; // Update the src attribute of the dice
        var roll = random + 1; // Adjusting index to match dice face (1-6)

        feedback.style.display = "none"; // hiding the feedback

        // Calculate new position
        var newPosition = currentPosition + roll;
        if (newPosition > maxPosition) {
            newPosition = (newPosition % maxPosition) || maxPosition; // Setting the new position
        }

        // Move the token
        var newBox = document.getElementById("box" + newPosition);
        var token = document.getElementById("token");
        if (newBox) {
            newBox.appendChild(token); // Move token to new position
            currentPosition = newPosition; // Update current position

            if (currentPosition === 6) {
                questionBox.style.display = 'none'; // Hide question box at start position
            } else {
                // Display the question for the new box
                questionBox.style.display = 'block';
                questionText.innerHTML = '<pre>' + questions[currentPosition - 1].question + '</pre>'; // Getting the question from an object
                questionText.innerHTML = questions[currentPosition - 1].question.replace(/\n/g, '<br>'); // For line break
                answerInput.value = '';
                attempts = 0;  // Reset attempts for a new question
            }
        }
    };

    submitButton.onclick = function () {
        attempts++; // Inreasing the attempt number
        var userAnswer = answerInput.value.trim(); // To avoid spaces
        var correctAnswer = questions[currentPosition - 1].answer; // Getting the answer from an object for a particular question

        // For Bonus Questions
        if (currentPosition === 0 || currentPosition === 11 || currentPosition === 16) {
            // 5 possible attempts
            if (attempts <= 5) {
                if (userAnswer.toLowerCase() === correctAnswer.toString().toLowerCase()) {
                    var pointsAwarded = 0;
                    if (attempts === 1) {
                        pointsAwarded = 10;
                    }
                    else if (attempts === 2) {
                        pointsAwarded = 8;
                    }
                    else if (attempts === 3) {
                        pointsAwarded = 6;
                    }
                    else if (attempts === 4) {
                        pointsAwarded = 4;
                    }
                    else {
                        pointsAwarded = 2
                    }
                    totalScore += pointsAwarded; // Update total score
                    feedback.style.display = "block";
                    feedback.innerHTML = "Correct! You earned " + pointsAwarded + " points. Total score: " + totalScore;
                    next.style.display = "block";
                    answerInput.style.display = "none";
                    questionText.style.display = "none";
                    submitButton.style.display = "none";
                    feedback2.style.display = "none";
                } else if (attempts === 5) {
                    finalscore.style.display = "block";
                    questionText.style.display = "none";
                    answerInput.style.display = "none";
                    submitButton.style.display = "none";
                    feedback.style.display = "none";
                    feedback2.style.display = "none";
                    finalScoreText.innerText = "The correct answer of the last question: " + questions[currentPosition - 1].answer + "\n"  + "Final Score: " + totalScore; // Update final score text
                } else {
                    feedback2.style.display = "block";
                    // Shows the attempts left
                    feedback2.innerHTML = "Try again! Attempts remaining: " + (5 - attempts);
                }
            } else {
                next.style.display = "block";
            }
        }
        // For other boxes
        else if (userAnswer === correctAnswer || userAnswer === correctAnswer.toString().toLowerCase() || userAnswer === correctAnswer.toString().toUpperCase()) {
            // 3 possible attempts
            if (attempts === 1) {
                pointsAwarded = 5;
            }
            else if (attempts === 2) {
                pointsAwarded = 3;
            }
            else {
                pointsAwarded = 1;
            }
            totalScore += pointsAwarded; // Update total score
            feedback.style.display = "block";
            feedback.innerHTML = "Correct! You earned " + pointsAwarded + " points. Total score: " + totalScore;
            answerInput.style.display = "none";
            questionText.style.display = "none";
            submitButton.style.display = "none";
            feedback2.style.display = "none";
            next.style.display = "block";
            //questionBox.style.display = 'none'; // Hide question box after answering
        } else if (attempts >= 3) {
            finalscore.style.display = "block";
            questionText.style.display = "none";
            answerInput.style.display = "none";
            submitButton.style.display = "none";
            feedback.style.display = "none";
            feedback2.style.display = "none";
            finalScoreText.innerText = "The correct answer of the last question: " + questions[currentPosition - 1].answer + "\n"  + "Final Score: " + totalScore; // Update final score text
        } else {
            feedback2.style.display = "block";
            // Shows the attempts left
            feedback2.innerHTML = "Try again! Attempts remaining: " + (3 - attempts);
        }
    };

    // onclick event on next button
    next.onclick = function () {
        questionBox.style.display = "none";
        answerInput.style.display = "block";
        questionText.style.display = "block";
        submitButton.style.display = "block";
        next.style.display = "none";
    };
};
