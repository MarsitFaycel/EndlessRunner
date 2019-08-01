define(["variable","meshPlayer","camera", "resetBlock","diff"], function (variable,meshPlayer,camera,resetBlock,diff) {
    function resetGame(){
        //location.reload();
        if(variable.gameReset == 1){
            variable.gameReset = 0;
            variable.alive = 0;
            meshPlayer.position.x = 0;
            meshPlayer.position.y = 0.65;
            meshPlayer.position.z = 0;
            variable.paused = 0;
            meshPlayer.add(camera);
            camera.position.set(-10, 10, -10);
            //camera.lookAt(new THREE.Vector3(0,player.height,0));
            camera.lookAt(meshPlayer.position);
            variable.lastPosition = null;
            //variable.player.speed=1;
            variable.player.direction=0;
            variable.player.downSpeed=0.0001;
            variable.playerScore =0;
            //diff.playerdiffText= null;
            //stack =[];
           /*
            document.getElementById("Difficulte").innerHTML="";
            document.getElementById("Difficulte").innerHTML="Difficulte";

           variable.Facile = document.createElement('button');
            variable.Facile.innerHTML = "Facile" ;
            variable.Facile.id="Facile";

           console.log(variable.Facile);
            document.body.appendChild(variable.Facile);
*/
            resetBlock();

        }
    }
    return resetGame;

})