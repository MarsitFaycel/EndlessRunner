// Start the app
require( [ 'app','variable'], function (  app, variable ) {

    // Initialize our app and start the animation loop (animate is expected to call itself)


    window.onload = app.init();
    app.animate();

    function keyDown(event){
        variable.keyboard[event.keyCode] = true;
        if(event.keyCode == 32 && variable.pressed == 0)
            variable.pressed = 1;
        if(event.keyCode == 27 ){
            variable.paused ==1 ?  variable.paused = 0 :  variable.paused = 1;
            console.log("echec pressed")
        }
        if(event.keyCode == 13){
           variable.gameReset = 1;
        }

    }
    window.addEventListener('keydown', keyDown);

} );
