// Start the app
require( [ 'app','variable','diff','stat'], function (  app, variable, diff,stat ) {

    // Initialize our app and start the animation loop (animate is expected to call itself)


   //window.addEventListener('click', diff.facile);
   /*document.getElementById("Facile").addEventListener('click',function () {
       document.getElementById("Difficulte").innerHTML+= ": Easy";
       variable.player.speed = 1;

       var element = document.getElementById("but");
       document.body.removeChild(element)

   })
    document.getElementById("Intermediaire").addEventListener('click',function () {
        variable.player.speed = 1.4;
        document.getElementById("Difficulte").innerHTML+= ": Normal";

        var element = document.getElementById("but");
        document.body.removeChild(element)

    })
    document.getElementById("Difficile").addEventListener('click',function () {
        variable.player.speed = 1.3;
        document.getElementById("Difficulte").innerHTML+= ": Hard";

        var element = document.getElementById("but");
        document.body.removeChild(element)

    })


    */

    stat.showPanel( 1); // 0: fps, 1: ms, 2: mb, 3+: custom

    window.onload = app.init();
    app.animate();


    function turn(){
        // Ignoré en pause / après la mort, sinon le virage s'appliquerait à la reprise.
        if(variable.paused == 0 && variable.alive == 0)
            variable.pressed = 1;   // lu par controls.js à la prochaine image
    }

    function keyDown(event){
        variable.keyboard[event.keyCode] = true;

        if(event.keyCode == 32){ // Espace = changer de direction
            event.preventDefault();          // évite le défilement de la page
            if(!event.repeat) turn();        // touche maintenue : un seul virage
        }

        if(event.keyCode == 27 && variable.alive == 0){ // Echap = pause / reprendre
            variable.paused = variable.paused == 1 ? 0 : 1;
        }

        // Entrée = rejouer, seulement après un Game Over
        // (avant : appuyer pendant la partie relançait le jeu dès la mort suivante).
        if(event.keyCode == 13 && variable.alive == 1){
            variable.gameReset = 1;
        }
    }

    function keyUp(event){
        variable.keyboard[event.keyCode] = false;
    }

    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
    // pointerdown couvre souris ET tactile en un seul événement
    // (avant : touchstart + mousedown -> un tap pouvait faire deux virages).
    window.addEventListener('pointerdown', turn);

} );
