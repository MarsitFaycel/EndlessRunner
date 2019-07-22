// Start the app
require( [ 'app','variable','diff'], function (  app, variable, diff ) {

    // Initialize our app and start the animation loop (animate is expected to call itself)


    window.onload = app.init();
    app.animate();

    function keyDown(event){
        variable.keyboard[event.keyCode] = true;
        if(event.keyCode == 32 && variable.pressed == 0)
            variable.pressed = 1;
        if(event.keyCode == 27 &&  variable.alive != 1 ){
            variable.paused ==1 ?  variable.paused = 0 :  variable.paused = 1;
            console.log("echec pressed")
        }
        if(event.keyCode == 13){
           variable.gameReset = 1;
        }

    }
    function keyUp(event){
        variable.keyboard[event.keyCode] = false;
        if(event.keyCode == 32 && variable.pressed == 2)
            variable.pressed = 0;
    }
    function facile(event){

        let button = event.target ;


        if(button.innerHTML === "facile"){
            diff.playerdiffText.innerHTML= "difficulté:"
            diff.playerdiffText.innerHTML+= "facile";
            document.body.removeChild(diff.Facile);
            document.body.removeChild(diff.Intermed);
            document.body.removeChild(diff.Diff);

        }else if(button.innerHTML === "Intermediaire"){
            diff.playerdiffText.innerHTML= "difficulté:";
            diff.playerdiffText.innerHTML+= "Intermediaire";
            variable.player.speed = 2;
            document.body.removeChild(diff.Facile);
            document.body.removeChild(diff.Intermed);
            document.body.removeChild(diff.Diff);

            console.log(event.target)
        }else if (button.innerHTML === "Difficile") {

            diff.playerdiffText.innerHTML= "difficulté:";
            diff.playerdiffText.innerHTML+= "Difficile";
            variable.player.speed = 3;
            document.body.removeChild(diff.Facile);
            document.body.removeChild(diff.Intermed);
            document.body.removeChild(diff.Diff);
            console.log(event.target)
        }else{
            event.stopPropagation();
        }
        //console.log(event.target)




    }

    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
    window.addEventListener('click', facile);


} );
