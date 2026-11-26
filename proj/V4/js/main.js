// Point d'entrée : initialise le jeu, lance la boucle et branche les contrôles.
require( ['app', 'variable'], function ( app, variable ) {

    var KEY_ENTER = 13;
    var KEY_ESCAPE = 27;
    var KEY_SPACE = 32;

    app.init();
    app.animate();

    function turn() {
        // Ignoré en pause / après la mort, sinon le virage s'appliquerait à la reprise.
        if (variable.paused == 0 && variable.alive == 0)
            variable.pressed = 1;   // lu par controls.js à la prochaine image
    }

    function keyDown(event) {
        if (event.keyCode == KEY_SPACE) {         // changer de direction
            event.preventDefault();               // évite le défilement de la page
            if (!event.repeat) turn();            // touche maintenue : un seul virage
        }

        if (event.keyCode == KEY_ESCAPE && variable.alive == 0) {   // pause / reprendre
            variable.paused = variable.paused == 1 ? 0 : 1;
        }

        if (event.keyCode == KEY_ENTER && variable.alive == 1) {    // rejouer après un Game Over
            variable.gameReset = 1;
        }
    }

    window.addEventListener('keydown', keyDown);
    // pointerdown couvre souris ET tactile en un seul événement.
    window.addEventListener('pointerdown', turn);
} );
