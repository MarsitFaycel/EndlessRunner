// Affiche le score (nombre de blocs touchés) en haut de l'écran.
define( ["variable"], function ( variable ) {

    var scoreText = document.getElementById("distValue");
    var shownScore = -1;

    return {
        score: function () {
            if (scoreText && shownScore !== variable.playerScore) {   // on ne touche au DOM que si le score change
                shownScore = variable.playerScore;
                scoreText.textContent = "SCORE:" + shownScore;
            }
        }
    };
} );
