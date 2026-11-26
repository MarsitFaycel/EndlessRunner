// Relance une partie après un Game Over (touche Entrée).
define( ["variable", "meshPlayer", "camera", "spawnBlock", "world"], function ( variable, meshPlayer, camera, spawnBlock, world ) {

    function resetGame() {
        if (variable.gameReset != 1) return;

        variable.gameReset = 0;
        variable.alive = 0;
        variable.paused = 0;
        variable.lastPosition = null;
        variable.playerScore = 0;
        variable.player.speed = variable.INITIAL_SPEED;
        variable.player.direction = 0;
        variable.player.downSpeed = 0.0001;

        meshPlayer.position.set(0, 0.65, 0);
        meshPlayer.add(camera);
        camera.position.set(-10, 10, -10);
        camera.lookAt(meshPlayer.position);

        world.reset();
        spawnBlock.resetAll();   // réutilise les blocs existants
    }

    return resetGame;
});
