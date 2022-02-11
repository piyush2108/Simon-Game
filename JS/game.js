var lensColors = ["red", "yellow", "green", "blue"];
var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function(){

    if(!started){

        $("#notify").text("Level "+"level");
        nextSequence();
        started = true;
    }

})

$(".btn").click(function(){
    
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
                nextSequence();
              }, 900);
        }
    }

    else{

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

        
        $("#notify").text("oops!!, Press Any Key to Restart");

        startOver();

    }

}

function nextSequence(){

    userClickedPattern = [];

    level++;

    $("#notify").text("Level "+level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = lensColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}

function animatePress(currentColor){

    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);

}

function playSound(name){

    if(name === "wrong")
    {
        var sound = new Audio("sounds/"+name+".mp3");
        sound.play();
        sound.volume = 0.5;
    }
    else{
        var sound = new Audio("sounds/"+name+".mp3");
        sound.play();
    }
}

function startOver() {

    level = 0;
    gamePattern = [];
    started = false;
}
