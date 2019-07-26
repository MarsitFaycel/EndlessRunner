define(["three","meshPlayer","stack","variable","camera"] , function(THREE, meshPlayer,stack,variable,camera){

     function checkBlockHit() {

        var hit = 0;

        if(meshPlayer.position.x < 20 && meshPlayer.position.z < 20){
            hit =1;
        }
        for(var i=0; i<300 ; i++){
            if(meshPlayer.position.x <= stack[i].position.x+5.7 && meshPlayer.position.x >= stack[i].position.x-5.7){
                if(meshPlayer.position.z <= stack[i].position.z+5.7 && meshPlayer.position.z >= stack[i].position.z-5.7){
                    if(stack[i].hit === 0){
                        variable.playerScore++
                        stack[i].hit = 1;
                    }
                    hit = 1;
                }
            }
        }

        if(hit === 0){
            if(variable.lastPosition == null){
                meshPlayer.remove(camera);
                variable.lastPosition = new THREE.Vector3(meshPlayer.position.x, meshPlayer.position.y, meshPlayer.position.z);
            }
            variable.alive = 1;
        }


    }
    return checkBlockHit;



})