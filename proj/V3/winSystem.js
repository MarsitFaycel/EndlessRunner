
function checkBlockHit(){
    var hit = 0;
    if(mesh.position.x < 20 && mesh.position.z < 20){
        hit =1;
    }
    for(var i=0; i<300 ; i++){
        if(mesh.position.x <= stack[i].position.x+5.7 && mesh.position.x >= stack[i].position.x-5.7){
            if(mesh.position.z <= stack[i].position.z+5.7 && mesh.position.z >= stack[i].position.z-5.7){
                if(stack[i].hit == 0){
                    playerScore++
                    stack[i].hit = 1;
                }
                hit = 1;
            }
        }
    }

    if(hit == 0){
        if(lastPosition == null){
            mesh.remove(camera);
            lastPosition = new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z);
        }
        alive = 1;
    }

}