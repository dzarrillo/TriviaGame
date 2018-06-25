

$(document).ready(function () {
    var value1;
    var value2;
    var correctAnswer;
    var totalCorrectAnswers;
    var totalWrongAnwers;
    var totalNotAnswered;
    var numOfSeconds;
    var count;
    var timer;
    var timeCount;
    // Keep track of number of questions: when questionCounter = totalQuestions game ends
    var totalQuestions;
    var questionCounter;

    // Hide the game elements
    $(".gameElements").hide();
    $("#stats").hide();
    $("#showriddle").hide();

    $("#buttonstart").on("click", function () {
        // hide the button
        $(".begingame").hide();

        startGame();
    });

    function startGame() {
        totalCorrectAnswers = 0;
        totalWrongAnwers = 0;
        totalNotAnswered = 0;
        totalQuestions = 2;
        questionCounter = 0;
        initializeValues();
    }

    $("button").on("click", function () {
        // $(this).text()
        console.log("Button click " + this.id);
        if (this.id != "buttonstart") {
            if ($(this).text() == correctAnswer) {
                totalCorrectAnswers += 1;
                console.log("You win!!");
                $("#stats").hide();

                $(".gameElements").hide();

                $("#imgriddle").attr("src", "http://www.reactiongifs.com/r/tumblr_n35fr14IxQ1tw1vhco1_250.gif")
                $("#showriddle").show();
                $("#correctanswer").html(correctAnswer);
                $("#riddleanswer").html("To be or not to be");
            } else {
                console.log("You Lose!!!!!");
                totalWrongAnwers += 1;

                $("#stats").hide();

                $(".gameElements").hide();
                // https://media0.giphy.com/media/eomy8S00ljwjK/giphy.webp
                $("#imgriddle").attr("src", "https://media1.giphy.com/media/SqmkZ5IdwzTP2/giphy.gif")
                $("#showriddle").show();
                $("#correctanswer").html(correctAnswer);
                $("#riddleanswer").html("");
            }
            delayNextQuestion();
        }
    });


    function initializeValues() {
        value1 = 0;
        value2 = 0;
        correctAnswer = 0;
        numOfSeconds = 10;
        count = 0;
        timer;
        timeCount = 10;
        // Keep track of number of questions: when questionCounter = totalQuestions game ends
        // totalQuestions = 2;
        // questionCounter = 0;

        console.log("Im in  initializeValues: questionCounter " + questionCounter);
        console.log("Im in  initializeValues: totalQuestions " + totalQuestions);
        $("#showriddle").hide();
        $("#stats").hide();

        if (questionCounter < totalQuestions) {
            questionCounter += 1;
            value1 = getRandomNum();
            value2 = getRandomNum();
            count = 0;
            numOfSeconds = timeCount;
            $(".gameElements").show();
            $(".answer").prop("disabled", false);

            $("#num1").html(value1);
            $("#num2").html(value2);

            populateAnswers();

            // start timer
            timer = setInterval(function () {
                if (count < timeCount) {
                    count++;
                    // console.log("Seconds " + numOfSeconds);
                    numOfSeconds -= 1;
                    $("#sec").html(numOfSeconds);

                } else {
                    clearInterval(timer);
                    // $(".answer").prop("disabled", true);
                    totalNotAnswered += 1;

                    $("#stats").hide();

                    $(".gameElements").hide();
                    $("#imgriddle").attr("src", "https://media2.giphy.com/media/lGFQHKtkq6Wkg/giphy.gif")
                    $("#showriddle").show();
                    $("#correctanswer").html(correctAnswer);
                    $("#riddleanswer").html("");

                    delayNextQuestion();
                    // console.log("Time ran out!");
                    // initializeValues();
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
            $("#stats").show();
            // populate stats
            $("#tcorrect").html(totalCorrectAnswers);
            $("#twrong").html(totalWrongAnwers);
            $("#nanswered").html(totalNotAnswered);
        }
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

    function getRandomNum() {
        return Math.floor(Math.random() * (20 - 1 + 1)) + 1;
    }

    function shuffle(array) {
        var currentIndex = array.length
            , temporaryValue
            , randomIndex;

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


    function getRandomAnswer() {
        return Math.floor(Math.random() * (400 - 1 + 1)) + 1;
    }

    function delayNextQuestion() {
        // we want to disable the buttons
        // $(".answer").prop("disabled", true);

        $("#wronganswer").show();
        clearInterval(timer);
        // we start over
        $("#sec").html(timeCount);
        // We need to delay so user has time to read the riddle
        var delayQ = setTimeout(initializeValues, 5000);
        console.log("dalayq " + delayQ);
    }


});



