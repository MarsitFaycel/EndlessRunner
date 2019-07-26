// Start the app
require( [ 'app','variable','diff','stat'], function (  app, variable, diff,stat ) {

    // Initialize our app and start the animation loop (animate is expected to call itself)

    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
    window.addEventListener('click', diff.facile);

    //stat.showPanel( 1); // 0: fps, 1: ms, 2: mb, 3+: custom

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




} );
