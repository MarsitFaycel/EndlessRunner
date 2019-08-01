define( ["three", "scene","variable"], function ( THREE, scene, variable ) {

    var score= {
        playerScoreText: document.getElementById("distValue"),
        score: function () {

            if (score.playerScoreText == null) {
                //console.log(score.playerScoreText.color)
            } else {
                score.playerScoreText.innerHTML = "SCORE:" + variable.playerScore;

            }

        }
    };




    return score;
} );