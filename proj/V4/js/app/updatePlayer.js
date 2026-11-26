define( ["variable","meshPlayer","light"], function ( variable, meshPlayer, light ) {
    var updatePlayer = {

        // step : temps écoulé en "images à 60 FPS" (voir app.frameStep).
        updatePlayer: function (step) {
            var distance = variable.player.speed * 0.5 * step;
            if (variable.player.direction == 0)
                meshPlayer.position.x += distance;
            else
                meshPlayer.position.z += distance;

            if (variable.alive == 0) {
                light.position.x = meshPlayer.position.x - 20;
                light.position.z = meshPlayer.position.z + 20;
            }

            // Accélération progressive au fil de la partie.
            variable.player.speed = Math.min(variable.player.speed + 0.0001 * step, variable.MAX_SPEED);
        }
    };

    return updatePlayer;
} );
