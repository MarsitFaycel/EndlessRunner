// État partagé du jeu.
define( [], function () {

    return {
        USE_WIREFRAME: false,
        IS_MOBILE: window.innerWidth < 745,   // matériaux plus légers sur petit écran

        INITIAL_SPEED: 1,
        MAX_SPEED: 2.5,          // au-delà, la bille pourrait sauter par-dessus un bloc

        paused: 1,               // 1 = en pause (le jeu démarre en pause)
        alive: 0,                // 0 = en vie, 1 = mort (Game Over)
        gameReset: 0,            // 1 = relancer la partie à la prochaine image
        pressed: 0,              // 1 = virage demandé, 2 = virage déjà appliqué
        lastPosition: null,      // position du joueur au moment de sa chute
        playerScore: 0,
        player: { speed: 1, direction: 0, downSpeed: 0.0001 },   // direction : 0 = +x, 1 = +z

        instructions: document.getElementById('instructions')
    };
} );
