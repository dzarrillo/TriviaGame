
$(document).ready(function () {

    // Hide the game elements
    $(".gameElements").hide();
    $(".stats").hide();

    // $(".gameElements").css({
    //     display: "none",
    //     visibility: "hidden"
    // });

    $("#buttonstart").on("click", function () {
        // hide the button
        $(".begingame").hide();
        $(".gameElements").show();
        startGame();
    });

    function startGame() {
        var value1 = 0;
        var value2 = 0;
        var correctAnswer = 0;
        var totalCorrectAnswers = 0;
        var totalWrongAnwers = 0;
        var totalNotAnswered = 0;
        var numOfSeconds = 10;
        var count = 0;
        var timer;
        var timeCount = 10;
        // Keep track of number of questions: when questionCounter = totalQuestions game ends
        var totalQuestions = 3;
        var questionCounter = 0;

        $(".stats").hide();
        initializeValues()


        function initializeValues() {
            if (questionCounter < totalQuestions) {
                questionCounter += 1;
                value1 = getRandomNum();
                value2 = getRandomNum();
                count = 0;
                numOfSeconds = timeCount;

                $(".answer").prop("disabled", false);
                $("#num1").html(value1);
                $("#num2").html(value2);

                populateAnswers();

                // clearInterval(timer);

                // start timer
                timer = setInterval(function () {
                    if (count < timeCount) {
                        count++;
                        console.log("Seconds " + numOfSeconds);
                        numOfSeconds -= 1;
                        $("#sec").html(numOfSeconds);

                    } else {
                        clearInterval(timer);
                        $(".answer").prop("disabled", true);
                        totalNotAnswered += 1;
                        console.log("Time ran out!");
                        initializeValues();
                    }
                }, 1000);

            } else {
                console.log("Game has ended!!!! ");
                console.log("Total correct: " + totalCorrectAnswers);
                console.log("Total worng: " + totalWrongAnwers);
                console.log("Total not answered: " + totalNotAnswered);
                // Hide the game elements
                $(".gameElements").hide();
                //show start button
                $(".begingame").show();
                $(".stats").show();
                // populate stats
                $("#tcorrect").html(totalCorrectAnswers);
                $("#twrong").html(totalWrongAnwers);
                $("#nanswered").html(totalNotAnswered);
            }

        }

        function getRandomNum() {
            return Math.floor(Math.random() * (20 - 1 + 1)) + 1;
        }


        function populateAnswers() {
            correctAnswer = value1 * value2;
            console.log("answer is " + correctAnswer);
            // Make sure we don't get duplicate answers
            var ansArr = [];
            for (var i = 0; i < 3; i++) {
                ansArr[i] = getRandomAnswer();
            }
            ansArr.push(correctAnswer);
            ansArr = shuffle(ansArr);
            $("#button1").html(ansArr[0]);
            $("#button2").html(ansArr[1]);
            $("#button3").html(ansArr[2]);
            $("#button4").html(ansArr[3]);

        }

        // I don't want to make the answer to obvious - 
        function getRandomAnswer() {
            return Math.floor(Math.random() * (400 - 1 + 1)) + 1;
        }

        function shuffle(array) {
            var currentIndex = array.length
                , temporaryValue
                , randomIndex
                ;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        $("button").on("click", function () {
            // $(this).text()
            console.log("Button click " + $(this).text());
            if ($(this).text() == correctAnswer) {
                totalCorrectAnswers += 1;
                console.log("You win!!");
                delayNextQuestion();
            } else {
                console.log("You Lose!!!!!");
                totalWrongAnwers += 1;
                delayNextQuestion();
            }
        });


        function delayNextQuestion() {
            // we want to disable the buttons
            $(".answer").prop("disabled", true);
            clearInterval(timer);
            // we start over
            $("#sec").html(timeCount);
            // We need to delay so user has time to read the riddle
            var delayQ = setTimeout(initializeValues, 5000);
        }
    }

});
