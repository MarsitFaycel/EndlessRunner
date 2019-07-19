define( ["three", "scene","variable"], function ( THREE, scene, variable ) {

    var score= {
        playerScoreText: null,
        score: function () {

            if (score.playerScoreText == null) {
                score.playerScoreText = document.createElement('div');
                score.playerScoreText.style.position = 'absolute';
                //score.playerScoreText.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
                score.playerScoreText.style.width = 100;
                score.playerScoreText.style.height = 100;
                score.playerScoreText.style.opacity = 0.6;
                score.playerScoreText.style.fontSize = "xx-large";
                score.playerScoreText.style.fontFamily = "Impact,Charcoal,sans-serif";
                score.playerScoreText.innerHTML = "SCORE:" + variable.playerScore;
                //score.playerScoreText.style.top = window.innerWidth/2 + 'px';
                //score.playerScoreText.style.left = window.innerHeight/2 + 'px';

                score.playerScoreText.style.top = 50 + 'px';
                score.playerScoreText.style.left = window.innerWidth - 160 + 'px';
                document.body.appendChild(score.playerScoreText);
            } else {
                score.playerScoreText.innerHTML = "SCORE:" + variable.playerScore;
            }

        }
    };




    return score;
} );