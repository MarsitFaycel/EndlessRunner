define( ["three", "scene","variable","camera"], function ( THREE, scene ,variable ,camera ) {
    var controls =function(){


    if (variable.pressed == 1 && variable.alive == 0){
        if(variable.player.direction == 0)
            variable.player.direction = 1;
        else
            variable.player.direction = 0;
        //keyboard[32] = false;
        variable.pressed =2;
        //camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
        //camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
    }
    if(variable.keyboard[30]) { // Z key up
        camera.position.x -= Math.sin(camera.rotation.y) * variable.player.speed;
        camera.position.z -= -Math.cos(camera.rotation.y) * variable.player.speed;
        meshPlayer.position.z += variable.player.speed * 0.5;
    }
    if(variable.keyboard[83]){ // S key
        camera.position.x += Math.sin(camera.rotation.y) * variable.player.speed;
        camera.position.z += -Math.cos(camera.rotation.y) * variable.player.speed;
    }
    if(variable.keyboard[81]){ // Q key
        camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * variable.player.speed;
        camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * variable.player.speed;
    }
    if(variable.keyboard[68]){ // D key
        camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * variable.player.speed;
        camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * variable.player.speed;
    }

    if(variable.keyboard[37]){ // left arrow key
        camera.rotation.y -= variable.player.turnSpeed;
    }
    if(variable.keyboard[39]) { // right arrow key
        camera.rotation.y += variable.player.turnSpeed;

    }};
    return controls;
});